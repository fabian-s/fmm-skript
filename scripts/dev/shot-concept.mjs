// Screenshot eines Konzept-Pop-ups per Chrome DevTools Protocol (kein Playwright noetig).
// Vorher: `npx vite preview --port 4179` und
// `google-chrome --headless=new --remote-debugging-port=9333 --user-data-dir=/tmp/x about:blank`
// Aufruf: node scripts/dev/shot-concept.mjs <chapter-id> <concept-id> <out.png> [js-action]
// js-action laeuft im Seitenkontext nach dem Oeffnen des Pop-ups (z.B. Slider setzen).
// Schreibt out.png (Viewport) und out-bottom.png (Pop-up ans Ende gescrollt); Pop-up liegt bei ca. x=8..458, y=508..1398.
// CDP screenshot of concept popups. usage: node shot.mjs <chapter> <conceptId> <out.png>
const [chapter, concept, out, action] = process.argv.slice(2);
const port = 9333;
const list = await (await fetch(`http://127.0.0.1:${port}/json/new?about:blank`, {method:"PUT"})).json();
const ws = new WebSocket(list.webSocketDebuggerUrl);
let id = 0; const pending = new Map();
const send = (method, params={}) => new Promise((res, rej) => { const i = ++id; pending.set(i, {res, rej}); ws.send(JSON.stringify({id:i, method, params})); });
ws.onmessage = (m) => { const d = JSON.parse(m.data); if (d.id && pending.has(d.id)) { const p = pending.get(d.id); pending.delete(d.id); d.error ? p.rej(new Error(JSON.stringify(d.error))) : p.res(d.result); } };
await new Promise(r => ws.onopen = r);
await send("Page.enable"); await send("Runtime.enable");
await send("Emulation.setDeviceMetricsOverride", {width:1280, height:1400, deviceScaleFactor:1, mobile:false});
await send("Page.navigate", {url:`http://localhost:4179/?k=${chapter}`});
const sleep = ms => new Promise(r => setTimeout(r, ms));
const ev = async (expr) => (await send("Runtime.evaluate", {expression: expr, awaitPromise: true, returnByValue: true})).result.value;
for (let i=0;i<40;i++){ await sleep(500); if (await ev(`document.querySelectorAll('[data-concept-link="${concept}"]').length`)) break; }
const n = await ev(`document.querySelectorAll('[data-concept-link="${concept}"]').length`);
console.log("links found:", n);
await ev(`(()=>{const el=document.querySelector('[data-concept-link="${concept}"]'); el.scrollIntoView({block:"center"}); el.click(); return 1})()`);
await sleep(2500);
const info = await ev(`(()=>{const win=[...document.querySelectorAll('[role="dialog"], [data-tooltip-window], .tooltip-window')]; return win.map(w=>{const r=w.getBoundingClientRect(); return [w.className.slice(0,40), Math.round(r.x),Math.round(r.y),Math.round(r.width),Math.round(r.height)]})})()`);
console.log("windows:", JSON.stringify(info));
const errs = await ev(`document.querySelectorAll('merror, mjx-merror, [data-mml-node="merror"]').length`);
console.log("merror count:", errs);
if (action) { console.log("action:", await ev(`(async()=>{${action}})()`)); await sleep(1500); }
const fs = await import("node:fs");
// popup = first dialog; capture its scroll region at top and bottom
const box = await ev(`(()=>{const w=document.querySelector('[role="dialog"]'); const sc=[...w.querySelectorAll('*')].find(e=>e.scrollHeight>e.clientHeight+20&&getComputedStyle(e).overflowY!=='visible')||w; sc.scrollTop=0; const r=w.getBoundingClientRect(); return {x:r.x,y:r.y,w:r.width,h:r.height, sh:sc.scrollHeight, ch:sc.clientHeight}})()`);
console.log("popup:", JSON.stringify(box));

let shot = await send("Page.captureScreenshot", {format:"png"});
fs.writeFileSync(out, Buffer.from(shot.data, "base64"));
if (box.sh > box.ch + 20) {
  await ev(`(()=>{const w=document.querySelector('[role="dialog"]'); const sc=[...w.querySelectorAll('*')].find(e=>e.scrollHeight>e.clientHeight+20&&getComputedStyle(e).overflowY!=='visible'); sc.scrollTop=sc.scrollHeight; return sc.scrollTop})()`);
  await sleep(500);
  shot = await send("Page.captureScreenshot", {format:"png"});
  fs.writeFileSync(out.replace(/\.png$/, "-bottom.png"), Buffer.from(shot.data, "base64"));
}
await send("Target.closeTarget", {targetId: list.id}).catch(()=>{});
ws.close(); console.log("saved", out);
