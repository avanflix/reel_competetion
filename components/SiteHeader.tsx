import Image from "next/image";
import FilmStripDivider from "./FilmStripDivider";

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 shadow-[0_2px_12px_rgba(0, 191, 255, 0.15)]">
      <div className="bg-curtain">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3.5">
          <div className="flex items-center gap-3">
            <div>
              <Image
                src="/troy.png"
                alt="Troy Telugu Association, Michigan seal"
                width={66}
                height={66}
                priority
              />
            </div>
            <div className="leading-tight">
              <p className="font-marquee text-2xl tracking-wide text-white drop-shadow-sm">
                <span className="text-marquee-gold2 ">TROY</span> TELUGU
                ASSOCIATION
              </p>
              <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-white/85">
                Michigan
              </p>
            </div>
          </div>
          <a
            href="#register"
            className="hidden rounded-full bg-white px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-blue-800 shadow-md transition hover:bg-marquee-cream sm:inline-block"
          >
            Enter the Competition
          </a>
        </div>
      </div>
      <FilmStripDivider />
    </header>
  );
}
