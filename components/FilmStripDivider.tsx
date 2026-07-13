export default function FilmStripDivider({ className = "" }: { className?: string }) {
  return <div aria-hidden="true" className={`h-4 w-full bunting ${className}`} />;
}
