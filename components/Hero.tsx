import Countdown from "./Countdown";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-curtain">
      <div
        aria-hidden="true"
        className="absolute -top-16 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-white/10 blur-3xl"
      />
      <div className="mx-auto max-w-6xl px-6 pb-14 pt-14 sm:pt-20">
        <p className="font-marquee text-sm uppercase tracking-[0.4em] text-white/85">
          A <span className="text-marquee-gold2 font-extrabold">TROY</span> Telugu
          Association Cultural Showcase &middot; Michigan
        </p>
        <h1 className="mt-4 max-w-3xl font-display text-4xl font-800 leading-[1.08] text-white sm:text-6xl">
          Reels Competition
        </h1>
        <p className="mt-5 max-w-xl text-base text-white/90 sm:text-lg">
          Lights, camera, Telugu pride. Submit your original reel and take the
          stage at this year&rsquo;s{" "}
          <span className="text-marquee-gold2 font-extrabold">TROY</span> Telugu
          Association showcase.
        </p>
        <p className="mt-2 max-w-xl text-xs uppercase tracking-[0.2em] text-white/70">
          Presented with the contribution of Hand NGO
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-6">
          <a
            href="#register"
            className="rounded-full bg-white px-7 py-3 text-sm font-bold uppercase tracking-wide text-blue-800 shadow-lg transition hover:bg-sky-100"
          >
            Start Your Entry
          </a>
          <div>
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-white/75">
              Submissions close
            </p>
            <Countdown />
          </div>
        </div>
      </div>
    </section>
  );
}
