"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { generateMockSubmissions, PaymentStatus, Submission } from "@/lib/mockSubmissions";

const STATUS_STYLES: Record<PaymentStatus, string> = {
  paid: "bg-emerald-50 text-emerald-700 border-emerald-300",
  pending: "bg-amber-50 text-amber-700 border-amber-300",
  failed: "bg-red-50 text-red-700 border-red-300"
};

type FilterValue = "all" | PaymentStatus;

export default function AdminDashboard() {
  const router = useRouter();

  // Demo data: the live submissions API hasn't been connected yet, so this
  // dashboard is populated with randomly generated sample entries so the
  // client can review the layout and flow.
  const [submissions] = useState<Submission[]>(() => generateMockSubmissions());
  const [filter, setFilter] = useState<FilterValue>("all");
  const [active, setActive] = useState<Submission | null>(null);

  const filtered = useMemo(() => {
    if (filter === "all") return submissions;
    return submissions.filter((s) => s.paymentStatus === filter);
  }, [submissions, filter]);

  function logout() {
    router.push("/admin");
  }

  function exportCsv() {
    const headers = [
      "First Name", "Last Name", "Email", "Mobile", "City", "State", "Zip",
      "Genre", "Video Type", "Video", "Status", "Submitted"
    ];
    const rows = submissions.map((s) => [
      s.firstName, s.lastName, s.email, s.mobile, s.city, s.state, s.zip,
      s.genre, s.videoType, s.videoUrl, s.paymentStatus,
      new Date(s.createdAt).toLocaleDateString("en-US")
    ]);
    const csv = [headers, ...rows]
      .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "troy-reels-submissions-demo.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <main className="min-h-screen bg-marquee-cream px-6 py-10 text-marquee-ink">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="font-marquee text-sm uppercase tracking-[0.3em] text-marquee-crimson">
              Troy Telugu Association
            </p>
            <h1 className="font-display text-2xl font-700">Reel Submissions Dashboard</h1>
            <p className="mt-1 text-xs text-marquee-ink2/70">
              Showing sample data for preview — this will connect to live
              submissions once the back end is ready.
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={exportCsv}
              className="rounded-full bg-marquee-crimson px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-white shadow-md transition hover:bg-marquee-marigold"
            >
              Export to CSV
            </button>
            <button
              onClick={logout}
              className="rounded-full border border-marquee-gold/50 bg-white px-5 py-2.5 text-sm font-semibold text-marquee-ink2 transition hover:border-marquee-crimson hover:text-marquee-crimson"
            >
              Sign Out
            </button>
          </div>
        </div>

        <div className="mt-6 flex gap-2">
          {(["all", "paid", "pending", "failed"] as FilterValue[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={
                "rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-wide transition " +
                (filter === f
                  ? "border-marquee-crimson bg-marquee-crimson text-white"
                  : "border-marquee-gold/40 bg-white text-marquee-ink2 hover:text-marquee-ink")
              }
            >
              {f} {f !== "all" && `(${submissions.filter((s) => s.paymentStatus === f).length})`}
            </button>
          ))}
        </div>

        <div className="mt-6 overflow-x-auto rounded-2xl border border-marquee-gold/30 bg-white shadow-[0_2px_10px_rgba(60,20,10,0.06)]">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead className="bg-marquee-sand text-xs font-semibold uppercase tracking-wide text-marquee-ink2">
              <tr>
                <th className="px-4 py-3">Applicant</th>
                <th className="px-4 py-3">Contact</th>
                <th className="px-4 py-3">Genre</th>
                <th className="px-4 py-3">Video</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Submitted</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-marquee-gold/15">
              {filtered.map((s) => (
                <tr key={s._id} className="hover:bg-marquee-sand/60">
                  <td className="px-4 py-3">
                    <p className="font-semibold">{s.firstName} {s.lastName}</p>
                    <p className="text-xs text-marquee-ink2/70">{s.city}, {s.state} {s.zip}</p>
                  </td>
                  <td className="px-4 py-3 text-xs text-marquee-ink2">
                    <p>{s.email}</p>
                    <p>{s.mobile}</p>
                  </td>
                  <td className="px-4 py-3 text-xs text-marquee-ink2">
                    <p>{s.genre}</p>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => setActive(s)}
                      className="text-xs font-semibold text-marquee-crimson underline underline-offset-2"
                    >
                      {s.videoType === "upload" ? "View upload" : "View link"}
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase ${STATUS_STYLES[s.paymentStatus]}`}>
                      {s.paymentStatus}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs text-marquee-ink2/70">
                    {new Date(s.createdAt).toLocaleDateString("en-US")}
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-10 text-center text-sm text-marquee-ink2/60">
                    No submissions in this filter yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {active && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-6"
          onClick={() => setActive(null)}
        >
          <div
            className="w-full max-w-2xl rounded-2xl border border-marquee-gold/30 bg-white p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h2 className="font-display text-lg font-700">
                {active.firstName} {active.lastName} —{" "}
                {active.videoType === "upload" ? "Uploaded Video" : "Video Link"}
              </h2>
              <button onClick={() => setActive(null)} className="text-marquee-ink2/70 hover:text-marquee-ink">
                ✕
              </button>
            </div>
            <div className="mt-4">
              {active.videoType === "upload" ? (
                <p className="rounded-lg border border-marquee-gold/30 bg-marquee-sand p-4 text-sm text-marquee-ink2">
                  Sample entry — no real video file attached in this preview.
                </p>
              ) : (
                <a
                  href={active.videoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="break-all text-marquee-crimson underline"
                >
                  {active.videoUrl}
                </a>
              )}
            </div>
            {active.isMinor && (
              <p className="mt-3 text-xs text-marquee-ink2">
                Minor participant — Guardian: {active.guardianName}
              </p>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
