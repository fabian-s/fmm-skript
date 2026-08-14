#!/usr/bin/env node
/**
 * Regressionstest für das Migrations-Orakel (mdx/inventory.mjs).
 *
 * Pinnt den Council-Runde-2-Fix: Inline-Auszeichnung (em/strong/code/sub/sup)
 * geht als Marker in die Signatur ein. Ein beim Migrieren verlorener Index
 * (`x<sub>1</sub>` → `x1`) oder verlorener Code-Kontext (`<code>fib(5)</code>`
 * → `fib(5)`) muss den Gate scheitern lassen; die treue Übertragung und die
 * Weißraum-Normalisierung an Marker-Grenzen (Code-Fence endet mit
 * Zeilenumbruch) dürfen KEINE Abweichung melden.
 */
import { mkdtempSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { inventoryFromTsx, inventoryFromMdx, diffInventories } from "./inventory.mjs";

const root = process.cwd();
const dir = mkdtempSync(path.join(tmpdir(), "orakel-test-"));

const TSX = `export function Mini() {
  return (
    <>
      <p>Der Wert x<sub>1</sub> ist klein, und <code>fib(5)</code> liefert 5.</p>
    </>
  );
}
`;
const MDX_VERLUST = "Der Wert x1 ist klein, und fib(5) liefert 5.\n";
const MDX_TREU = "Der Wert x<sub>1</sub> ist klein, und `fib(5)` liefert 5.\n";
// Mehrzeiliger Code-Fence: das schließende \n darf keinen Scheinverlust
// gegen den einzeiligen TSX-String erzeugen (Marker-Grenz-Normalisierung).
const TSX_CODE = `export function Mini() {
  return <p>Aufruf: <code>{"fib(5) + 1"}</code></p>;
}
`;
const MDX_CODE = "Aufruf: `fib(5) + 1`\n";

async function gate(tsxSource, mdxSource, name) {
  const mdxPath = path.join(dir, name + ".mdx");
  writeFileSync(mdxPath, mdxSource);
  const tsx = inventoryFromTsx(tsxSource);
  const mdx = await inventoryFromMdx(mdxSource, mdxPath, root);
  return diffInventories(tsx, mdx).length;
}

let failed = 0;
const check = (label, cond) => {
  console.log(`${cond ? "ok" : "FEHLSCHLAG"}  ${label}`);
  if (!cond) failed++;
};

check("Verlust von <sub>/<code> wird erkannt", (await gate(TSX, MDX_VERLUST, "verlust")) > 0);
check("treue Übertragung bleibt gleichwertig", (await gate(TSX, MDX_TREU, "treu")) === 0);
check("Code-Fence-Zeilenumbruch erzeugt keinen Scheinverlust", (await gate(TSX_CODE, MDX_CODE, "fence")) === 0);

rmSync(dir, { recursive: true, force: true });
console.log(failed === 0 ? "Orakel-Regressionstest bestanden" : `${failed} Test(s) fehlgeschlagen`);
process.exit(failed === 0 ? 0 : 1);
