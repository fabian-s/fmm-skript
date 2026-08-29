// Screenshots aller [data-interaktiv]-Kaesten eines Kapitels per CDP (kein Playwright).
// Vorher: `npx vite preview --port 4179` und
// `chromium --headless=new --remote-debugging-port=9333 --user-data-dir=/tmp/cdp about:blank`
// Aufruf: node scripts/dev/shot-widgets.mjs <chapter-id> <outdir> [breite=1300] [port=4179]
// Schreibt <outdir>/<chapter>-w<breite>-<nn>-<label>.png je Kasten (Element-Clip, volle Hoehe).
const [chapter, outdir, widthArg, portArg] = process.argv.slice(2);
const width = Number(widthArg || 1300);
const previewPort = Number(portArg || 4179);
const port = 9333;
const fs = await import("node:fs");
fs.mkdirSync(outdir, { recursive: true });
const list = await (await fetch(`http://127.0.0.1:${port}/json/new?about:blank`, { method: "PUT" })).json();
const ws = new WebSocket(list.webSocketDebuggerUrl);
let id = 0; const pending = new Map();
const send = (method, params = {}) => new Promise((res, rej) => { const i = ++id; pending.set(i, { res, rej }); ws.send(JSON.stringify({ id: i, method, params })); });
ws.onmessage = (m) => { const d = JSON.parse(m.data); if (d.id && pending.has(d.id)) { const p = pending.get(d.id); pending.delete(d.id); d.error ? p.rej(new Error(JSON.stringify(d.error))) : p.res(d.result); } };
await new Promise(r => ws.onopen = r);
await send("Page.enable"); await send("Runtime.enable");
await send("Emulation.setDeviceMetricsOverride", { width, height: 1200, deviceScaleFactor: 1, mobile: width < 500 });
await send("Page.navigate", { url: `http://localhost:${previewPort}/?k=${chapter}` });
const sleep = ms => new Promise(r => setTimeout(r, ms));
const ev = async (expr) => (await send("Runtime.evaluate", { expression: expr, awaitPromise: true, returnByValue: true })).result.value;
let n = 0;
for (let i = 0; i < 60; i++) { await sleep(500); const m = await ev(`document.querySelectorAll('[data-interaktiv]').length`); if (m && m === n) break; n = m; }
// Vertiefungen aufklappen (Widgets darin sind sonst hidden) und nachtypesetzen lassen.
const opened = await ev(`(()=>{const b=[...document.querySelectorAll('[data-deep] button[aria-expanded="false"]')]; b.forEach(x=>x.click()); return b.length})()`);
console.log("vertiefungen geoeffnet:", opened);
if (opened) { await sleep(3000); n = await ev(`document.querySelectorAll('[data-interaktiv]').length`); }
console.log("interaktiv boxes:", n);
const errs = await ev(`document.querySelectorAll('merror, mjx-merror, [data-mml-node="merror"]').length`);
console.log("merror count:", errs);
const labels = await ev(`[...document.querySelectorAll('[data-interaktiv]')].map(w => {
  const lab = (w.querySelector('h4')?.textContent || '').trim().replace(/^Interaktiv\s*/i, '');
  let anchor = ''; for (let el = w; el; el = el.previousElementSibling || el.parentElement) { if (el.id && /^sec-/.test(el.id)) { anchor = el.id; break; } }
  return { lab, anchor };
})`);
for (let i = 0; i < n; i++) {
  await ev(`(()=>{const w=document.querySelectorAll('[data-interaktiv]')[${i}]; w.scrollIntoView({block:'start'}); window.scrollBy(0,-8); return 1})()`);
  await sleep(700);
  const box = await ev(`(()=>{const r=document.querySelectorAll('[data-interaktiv]')[${i}].getBoundingClientRect(); return {x:r.x+window.scrollX, y:r.y+window.scrollY, w:r.width, h:r.height}})()`);
  const clipH = Math.min(box.h + 8, 6000);
  await send("Emulation.setDeviceMetricsOverride", { width, height: Math.ceil(clipH) + 200, deviceScaleFactor: 1, mobile: width < 500 });
  await sleep(300);
  const shot = await send("Page.captureScreenshot", { format: "png", captureBeyondViewport: true, clip: { x: Math.max(0, box.x - 4), y: Math.max(0, box.y - 4), width: Math.min(box.w + 8, width), height: clipH, scale: 1 } });
  const safe = (labels[i].lab || "widget").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 60);
  const name = `${chapter}-w${width}-${String(i + 1).padStart(2, "0")}-${labels[i].anchor || "x"}-${safe}.png`;
  fs.writeFileSync(`${outdir}/${name}`, Buffer.from(shot.data, "base64"));
  console.log("saved", name, `(${Math.round(box.w)}x${Math.round(box.h)})`);
  await send("Emulation.setDeviceMetricsOverride", { width, height: 1200, deviceScaleFactor: 1, mobile: width < 500 });
}
await send("Target.closeTarget", { targetId: list.id }).catch(() => {});
ws.close(); console.log("done", chapter, width);
