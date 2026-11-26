type Step = { title: string; body: string };

const GREEN = "#0e3b2e";
const BRASS = "#b08d48";

/* Points along a sine strand, used for the helix drawings. */
function strand(x0: number, x1: number, cy: number, amp: number, period: number, phase: number) {
  const pts: string[] = [];
  for (let x = x0; x <= x1; x += 2) {
    pts.push(`${x},${(cy + amp * Math.sin(((x - x0) / period) * Math.PI * 2 + phase)).toFixed(1)}`);
  }
  return pts.join(" ");
}

function Acids() {
  const dots = [
    [36, 46, 7, BRASS], [70, 30, 5, GREEN], [104, 58, 6, GREEN], [138, 36, 8, BRASS], [168, 70, 5, GREEN],
    [52, 88, 5, GREEN], [88, 104, 8, BRASS], [126, 92, 5, GREEN], [158, 112, 6, BRASS], [28, 120, 5, GREEN],
  ] as const;
  return (
    <>
      {dots.map(([x, y, r, c], i) => (
        <circle key={i} cx={x} cy={y} r={r} fill="none" stroke={c} strokeWidth="1.6" />
      ))}
    </>
  );
}

function Chain() {
  const beads = Array.from({ length: 13 }, (_, i) => {
    const x = 18 + i * 13.5;
    return [x, 70 + 22 * Math.sin((i / 12) * Math.PI * 2.2)] as const;
  });
  return (
    <>
      <polyline points={beads.map((b) => b.join(",")).join(" ")} fill="none" stroke={GREEN} strokeWidth="1.2" />
      {beads.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={i % 3 === 0 ? 5.5 : 4} fill="#f5efe2" stroke={i % 3 === 0 ? BRASS : GREEN} strokeWidth="1.6" />
      ))}
    </>
  );
}

function Helix({ cy = 70, amp = 20, width = 1.8, x0 = 14, x1 = 186 }) {
  return (
    <>
      {[0, 1, 2].map((j) => (
        <polyline
          key={j}
          points={strand(x0, x1, cy, amp, 64, (j * Math.PI * 2) / 3)}
          fill="none"
          stroke={j === 1 ? BRASS : GREEN}
          strokeWidth={width}
          strokeLinecap="round"
        />
      ))}
    </>
  );
}

function Fibres() {
  return (
    <>
      {[34, 52, 70, 88, 106].map((cy, i) => (
        <Helix key={cy} cy={cy} amp={6} width={1.1} x0={14 + (i % 2) * 10} x1={186 - ((i + 1) % 2) * 10} />
      ))}
    </>
  );
}

const drawings = [Acids, Chain, Helix, Fibres];

/* The four steps from food protein to collagen fibre, drawn as quiet line studies. */
export function CollagenCycle({
  heading,
  intro,
  steps,
  note,
}: {
  heading: string;
  intro: string;
  steps: Step[];
  note: { title: string; body: string };
}) {
  return (
    <section className="bg-cream">
      <div className="wrap py-20 md:py-28">
        <div className="max-w-[720px]">
          <h2 className="text-[44px] md:text-[64px]">{heading}</h2>
          <p className="mt-5 max-w-[52ch] text-lg text-muted">{intro}</p>
        </div>

        <ol className="mt-14 grid gap-12 sm:grid-cols-2 md:mt-16 lg:grid-cols-4 lg:gap-8">
          {steps.map((s, i) => {
            const Drawing = drawings[i % drawings.length];
            return (
              <li key={s.title}>
                <svg viewBox="0 0 200 140" className="w-full border-y border-brass/40" role="img" aria-hidden="true">
                  <Drawing />
                </svg>
                <p className="display mt-6 text-[40px] leading-none text-brass">{i + 1}</p>
                <h3 className="mt-3 text-[28px] leading-tight">{s.title}</h3>
                <p className="mt-3 text-muted">{s.body}</p>
              </li>
            );
          })}
        </ol>

        <div className="mt-16 grid gap-3 border-l-2 border-brass pl-6 md:max-w-[640px]">
          <p className="display text-[28px] text-green">{note.title}</p>
          <p className="text-lg text-muted">{note.body}</p>
        </div>
      </div>
    </section>
  );
}
