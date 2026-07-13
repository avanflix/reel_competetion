import SiteHeader from "@/components/SiteHeader";
import Hero from "@/components/Hero";
import FilmStripDivider from "@/components/FilmStripDivider";
import CompetitionFlow from "@/components/CompetitionFlow";
import { getEntryFeeLabel } from "@/lib/pricing";

export default function HomePage() {
  return (
    <main>
      <SiteHeader />
      <Hero />
      <FilmStripDivider />

      <CompetitionFlow entryFeeLabel={getEntryFeeLabel()} />

      <FilmStripDivider />
      <footer className="bg-curtain px-6 py-10 text-center text-xs text-white/80">
        <p>
          &copy; {new Date().getFullYear()}{" "}
          <span className="text-marquee-gold2 font-extrabold">TROY</span> Telugu
          Association, Michigan. All rights reserved.
        </p>
        <p className="mt-1">Presented with the contribution of Hand NGO.</p>
        <p className="mt-1">
          Questions? Email us at info@troytelugu.org &middot;{" "}
          <a href="/admin" className="underline underline-offset-2 hover:text-white">
            Admin
          </a>
        </p>
      </footer>
    </main>
  );
}
