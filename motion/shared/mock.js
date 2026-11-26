// Review overlay: the real tub and the hero copy, positioned as on the site, so a background
// can be judged in context. Only drawn when the page is opened with ?mock=1 (or &mock=tall).
export function mountMock({ dark }) {
  const q = new URLSearchParams(location.search);
  if (!q.get("mock")) return Promise.resolve();
  const tall = q.get("mock") === "tall";
  const ink = dark ? "#f5efe2" : "#0e3b2e";
  const body = dark ? "#d6d6c8" : "#1b1a17";
  const st = document.createElement("style");
  st.textContent = `
  @font-face{font-family:Corm;src:url(../fonts/cormorant-garamond-latin-500-normal.woff2)}
  @font-face{font-family:Hank;src:url(../fonts/hanken-grotesk-latin-wght-normal.woff2);font-weight:100 900}
  .mock{position:absolute;inset:0;pointer-events:none}
  .mock h1{position:absolute;margin:0;font:500 ${tall ? 112 : 124}px/0.98 Corm;letter-spacing:-.015em;color:${ink}}
  .mock p{position:absolute;margin:0;font:400 ${tall ? 38 : 26}px/1.5 Hank;color:${body};max-width:${tall ? 900 : 560}px}
  .mock .btn{position:absolute;font:500 ${tall ? 34 : 19}px Hank;letter-spacing:.02em;padding:${tall ? "30px 48px" : "18px 34px"};border-radius:2px;
     background:${dark ? "#f5efe2" : "#0e3b2e"};color:${dark ? "#0e3b2e" : "#f5efe2"}}
  .mock .note{position:absolute;font:500 ${tall ? 32 : 19}px Hank;color:${dark ? "#e2cc96" : "#0e3b2e"}}
  .mock img{position:absolute}
  .mock .shadow{position:absolute;border-radius:50%;background:radial-gradient(closest-side,rgba(0,0,0,${dark ? 0.45 : 0.22}),rgba(0,0,0,0))}`;
  document.head.appendChild(st);
  const m = document.createElement("div");
  m.className = "mock";
  m.innerHTML = tall
    ? `<h1 style="left:80px;top:170px">Looked<br>after, quietly.</h1>
       <p style="left:80px;top:470px">Pure collagen peptides for the years when your body starts asking for a little more.</p>
       <div class="btn" style="left:80px;top:690px">Shop collagen</div><div class="note" style="left:420px;top:722px">From ₹72 a day</div>
       <div class="shadow" style="left:250px;top:1770px;width:580px;height:80px"></div>
       <img src="../assets/tub.png" style="left:270px;top:1050px;height:760px">`
    : `<h1 style="left:150px;top:270px">Looked<br>after, quietly.</h1>
       <p style="left:150px;top:540px">Pure collagen peptides for the years when your body starts asking for a little more. One unflavoured scoop in your morning chai.</p>
       <div class="btn" style="left:150px;top:720px">Shop collagen</div><div class="note" style="left:380px;top:738px">From ₹72 a day</div>
       <div class="shadow" style="left:1070px;top:910px;width:560px;height:80px"></div>
       <img src="../assets/tub.png" style="left:1100px;top:250px;height:700px">`;
  document.body.appendChild(m);
  return Promise.all([document.fonts.ready, ...[...m.querySelectorAll("img")].map((i) => i.decode())]);
}
