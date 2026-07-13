const STEPS = ["Rules", "Your Details", "Payment", "Confirmed"];

export default function Stepper({ current }: { current: number }) {
  return (
    <ol className="mb-10 flex items-center justify-between gap-2">
      {STEPS.map((label, i) => {
        const state = i < current ? "done" : i === current ? "active" : "upcoming";
        return (
          <li key={label} className="flex flex-1 items-center last:flex-none">
            <div className="flex flex-col items-center gap-2 text-center">
              <div
                className={
                  "flex h-9 w-9 items-center justify-center rounded-full border-2 font-marquee text-base " +
                  (state === "done"
                    ? "border-marquee-crimson bg-marquee-crimson text-white"
                    : state === "active"
                    ? "border-marquee-crimson bg-white text-marquee-crimson"
                    : "border-marquee-ink2/20 bg-white text-marquee-ink2/40")
                }
              >
                {state === "done" ? "✓" : i + 1}
              </div>
              <span
                className={
                  "hidden text-[11px] font-semibold uppercase tracking-[0.15em] sm:block " +
                  (state === "upcoming" ? "text-marquee-ink2/40" : "text-marquee-ink")
                }
              >
                {label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div
                className={
                  "mx-2 h-px flex-1 " +
                  (state === "done" ? "bg-marquee-crimson" : "bg-marquee-ink2/15")
                }
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}
