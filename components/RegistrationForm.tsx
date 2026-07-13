"use client";

import { useState } from "react";
import { US_STATES } from "@/lib/usStates";

const GENRES = [
  "Action", "Adventure", "Comedy", "Crime / Gangster", "Drama",
  "Epics / Historical", "Horror", "Musical / Dance", "Thriller", "Documentary", "Other"
];

export interface RegistrationData {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  mobile: string;
  genre: string;
  isMinor: boolean;
  guardianName: string;
  videoType: "url" | "upload";
  videoUrl: string;
  videoFile: File | null;
}

const EMPTY_DATA: RegistrationData = {
  firstName: "",
  lastName: "",
  email: "",
  address: "",
  city: "",
  state: "",
  zip: "",
  mobile: "",
  genre: "",
  isMinor: false,
  guardianName: "",
  videoType: "url",
  videoUrl: "",
  videoFile: null
};

function Field({
  label,
  children,
  hint
}: {
  label: string;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-marquee-ink2">
        {label}
      </span>
      {children}
      {hint && <span className="mt-1 block text-xs text-marquee-ink2/60">{hint}</span>}
    </label>
  );
}

const inputClass =
  "w-full rounded-lg border border-marquee-gold/40 bg-white px-3.5 py-2.5 text-sm text-marquee-ink placeholder:text-marquee-ink2/40 outline-none transition focus:border-blue-800 focus:ring-2 focus:ring-blue-800/10";

interface RegistrationFormProps {
  initialData: RegistrationData | null;
  onSubmit: (data: RegistrationData) => void;
  submitting: boolean;
  error: string;
  onBack: () => void;
}

export default function RegistrationForm({
  initialData,
  onSubmit,
  submitting,
  error,
  onBack
}: RegistrationFormProps) {
  const [data, setData] = useState<RegistrationData>(initialData || EMPTY_DATA);
  const [fileName, setFileName] = useState("");

  function update<K extends keyof RegistrationData>(key: K, value: RegistrationData[K]) {
    setData((d) => ({ ...d, [key]: value }));
  }

  function formatUSPhone(value: string) {
    const digits = value.replace(/\D/g, "").slice(0, 10);
    if (digits.length <= 3) return digits;
    if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  }

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 150 * 1024 * 1024) {
      alert("Video files must be 150MB or smaller. For larger files, please share a link instead.");
      e.target.value = "";
      return;
    }
    setFileName(file.name);
    update("videoFile", file);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const phoneDigits = data.mobile.replace(/\D/g, "");
    if (phoneDigits.length !== 10) {
      alert("Phone number not valid. Please enter a 10-digit US phone number.");
      return;
    }

    if (!/^\d{5}(-\d{4})?$/.test(data.zip)) {
      alert("ZIP code not valid. Please enter a valid US ZIP code.");
      return;
    }

    onSubmit(data);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <section>
        <h3 className="font-display text-lg font-700 text-blue-800">
          Applicant Details
        </h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Field label="First name">
            <input required className={inputClass} value={data.firstName}
              onChange={(e) => update("firstName", e.target.value)} />
          </Field>
          <Field label="Last name">
            <input required className={inputClass} value={data.lastName}
              onChange={(e) => update("lastName", e.target.value)} />
          </Field>
          <Field label="Email address">
            <input required type="email" className={inputClass} value={data.email}
              onChange={(e) => update("email", e.target.value)} />
          </Field>
          <Field label="Mobile number">
            <input
              required
              type="tel"
              className={inputClass}
              value={data.mobile}
              onChange={(e) => update("mobile", formatUSPhone(e.target.value))}
              placeholder="(248) 555-1234"
              maxLength={14}
            />
          </Field>
        </div>
      </section>

      <section>
        <h3 className="font-display text-lg font-700 text-blue-800">
          Mailing Address
        </h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Field label="Street address" hint="Used only for prize mailing and jury correspondence.">
            <input required className={inputClass} value={data.address}
              onChange={(e) => update("address", e.target.value)} />
          </Field>
          <Field label="City">
            <input required className={inputClass} value={data.city}
              onChange={(e) => update("city", e.target.value)} />
          </Field>
          <Field label="State">
            <select required className={inputClass} value={data.state}
              onChange={(e) => update("state", e.target.value)}>
              <option value="" disabled>Select a state</option>
              {US_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </Field>
          <Field label="ZIP code">
            <input
              required
              className={inputClass}
              value={data.zip}
              onChange={(e) => update("zip", e.target.value)}
              placeholder="48075"
              maxLength={10}
            />
          </Field>
        </div>
      </section>

      <section>
        <h3 className="font-display text-lg font-700 text-blue-800">
          Your Entry
        </h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Field label="Genre">
            <select required className={inputClass} value={data.genre}
              onChange={(e) => update("genre", e.target.value)}>
              <option value="" disabled>Select a genre</option>
              {GENRES.map((g) => <option key={g} value={g}>{g}</option>)}
            </select>
          </Field>
        </div>

        <div className="mt-4 rounded-lg border border-marquee-gold/25 bg-marquee-sand p-4">
          <label className="flex items-center gap-2.5 text-sm text-marquee-ink">
            <input type="checkbox" className="h-4 w-4 accent-blue-800"
              checked={data.isMinor} onChange={(e) => update("isMinor", e.target.checked)} />
            A participant featured in this entry is under 18
          </label>
          {data.isMinor && (
            <div className="mt-3">
              <Field label="Parent / guardian name">
                <input required={data.isMinor} className={inputClass} value={data.guardianName}
                  onChange={(e) => update("guardianName", e.target.value)} />
              </Field>
            </div>
          )}
        </div>
      </section>

      <section>
        <h3 className="font-display text-lg font-700 text-blue-800">
          Submit Your Video
        </h3>
        <p className="mt-1 text-sm text-marquee-ink2">
          Share a link to your video, or upload the source file directly — whichever is easier for you.
        </p>

        <div className="mt-4 flex gap-2 rounded-full border border-marquee-gold/40 bg-white p-1 text-sm">
          {[
            { key: "url" as const, label: "Social media / drive link" },
            { key: "upload" as const, label: "Upload video file" }
          ].map((opt) => (
            <button
              type="button"
              key={opt.key}
              onClick={() => update("videoType", opt.key)}
              className={
                "flex-1 rounded-full py-2 font-semibold transition " +
                (data.videoType === opt.key
                  ? "bg-blue-800 text-white"
                  : "text-marquee-ink2 hover:text-marquee-ink")
              }
            >
              {opt.label}
            </button>
          ))}
        </div>

        {data.videoType === "url" ? (
          <div className="mt-4">
            <Field label="Video URL" hint="YouTube, Instagram, Google Drive — any link the jury can open.">
              <input required type="url" className={inputClass} value={data.videoUrl}
                onChange={(e) => update("videoUrl", e.target.value)}
                placeholder="https://" />
            </Field>
          </div>
        ) : (
          <div className="mt-4">
            <Field label="Video file" hint="MP4 or MOV, up to 150MB.">
              <input required type="file" accept="video/*" onChange={handleFile}
                className="block w-full text-sm text-marquee-ink2 file:mr-3 file:rounded-full file:border-0 file:bg-blue-800 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-marquee-marigold" />
              {fileName && <span className="mt-1.5 block text-xs text-blue-800">Selected: {fileName}</span>}
            </Field>
          </div>
        )}
      </section>

      {error && (
        <p className="rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      )}

      <div className="flex flex-col-reverse gap-4 pt-4 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-marquee-gold bg-transparent px-7 py-3 text-sm font-semibold text-marquee-ink transition-all hover:border-blue-800 hover:text-blue-800"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none"
            viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>

        <button
          type="submit"
          disabled={submitting}
          className="rounded-full bg-blue-800 px-10 py-3.5 text-sm font-bold uppercase tracking-wide text-white shadow-md transition hover:bg-marquee-marigold disabled:cursor-not-allowed disabled:opacity-50"
        >
          {submitting ? "Saving your entry…" : "Continue to Payment"}
        </button>
      </div>
    </form>
  );
}
