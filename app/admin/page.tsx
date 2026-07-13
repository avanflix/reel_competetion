"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Demo mode: this preview isn't wired up to a real auth back end yet, so
  // any credentials will sign you in and drop you on the mock dashboard.
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      router.push("/admin/dashboard");
    }, 400);
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-curtain px-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-2xl"
      >
        <div className="mb-2 flex justify-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-marquee-sand p-1">
            <Image
              src="/logo2.png"
              alt="Troy Telugu Association seal"
              width={52}
              height={52}
              className="h-full w-full rounded-full object-contain"
            />
          </div>
        </div>
        <p className="text-center font-marquee text-sm uppercase tracking-[0.3em] text-blue-800">
          Troy Telugu Association
        </p>
        <h1 className="mt-1 text-center font-display text-2xl font-700 text-marquee-ink">
          Admin Sign In
        </h1>
        <p className="mt-1 text-center text-sm text-marquee-ink2">
          Review reel submissions and export entrant data.
        </p>

        <div className="mt-6 space-y-4">
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-marquee-ink2">
              Username
            </label>
            <input
              required
              className="w-full rounded-lg border border-marquee-gold/40 bg-white px-3.5 py-2.5 text-sm text-marquee-ink outline-none focus:border-blue-800 focus:ring-2 focus:ring-blue-800/10"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-marquee-ink2">
              Password
            </label>
            <input
              required
              type="password"
              className="w-full rounded-lg border border-marquee-gold/40 bg-white px-3.5 py-2.5 text-sm text-marquee-ink outline-none focus:border-blue-800 focus:ring-2 focus:ring-blue-800/10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <p className="mt-4 rounded-lg border border-marquee-gold/30 bg-marquee-sand px-4 py-2.5 text-xs text-marquee-ink2">
          Preview mode — any username and password will sign you in to the
          mock dashboard below.
        </p>

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full rounded-full bg-blue-800 py-3 text-sm font-bold uppercase tracking-wide text-white shadow-md transition hover:bg-marquee-marigold disabled:opacity-50"
        >
          {loading ? "Signing in…" : "Sign In"}
        </button>
      </form>
    </main>
  );
}
