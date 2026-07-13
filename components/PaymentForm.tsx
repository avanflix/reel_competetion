"use client";

import { useMemo, useState } from "react";

// Deterministic pseudo-random pattern so the placeholder QR looks the same on every render
function seededRandom(seed: number) {
  let value = seed;
  return () => {
    value = (value * 9301 + 49297) % 233280;
    return value / 233280;
  };
}

function QrPlaceholder() {
  const size = 11;
  const cells = useMemo(() => {
    const rand = seededRandom(42);
    const grid: boolean[] = [];
    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        const inCorner =
          (row < 3 && col < 3) ||
          (row < 3 && col > size - 4) ||
          (row > size - 4 && col < 3);
        grid.push(inCorner ? true : rand() > 0.5);
      }
    }
    return grid;
  }, []);

  const cellSize = 14;
  const dim = size * cellSize;

  return (
    <svg
      viewBox={`0 0 ${dim} ${dim}`}
      width="176"
      height="176"
      className="mx-auto rounded-lg border border-marquee-gold/30 bg-white p-2 shadow-sm"
      role="img"
      aria-label="Scan to pay QR code"
    >
      <rect x="0" y="0" width={dim} height={dim} fill="#ffffff" />
      {cells.map((filled, i) => {
        if (!filled) return null;
        const row = Math.floor(i / size);
        const col = i % size;
        return (
          <rect
            key={i}
            x={col * cellSize}
            y={row * cellSize}
            width={cellSize}
            height={cellSize}
            fill="#3B2312"
          />
        );
      })}
    </svg>
  );
}

const inputClass =
  "w-full rounded-lg border border-marquee-gold/40 bg-white px-3.5 py-2.5 text-sm text-marquee-ink placeholder:text-marquee-ink2/40 outline-none transition focus:border-blue-800 focus:ring-2 focus:ring-blue-800/10";

interface PaymentFormProps {
  amountLabel: string;
  onPaid: (referenceId: string) => void;
  onBack: () => void;
}

export default function PaymentForm({ amountLabel, onPaid, onBack }: PaymentFormProps) {
  const [method, setMethod] = useState<"online" | "scan">("online");

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-marquee-gold/30 bg-marquee-sand p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-marquee-ink2">
          Entry fee
        </p>
        <p className="mt-1 font-marquee text-3xl text-blue-800">{amountLabel}</p>
        <p className="mt-2 text-xs text-marquee-ink2/80">
          Proceeds from your entry fee are made possible with the contribution
          of <span className="font-semibold text-marquee-ink">Hand NGO</span>.
        </p>
      </div>

      <div className="flex gap-2 rounded-full border border-marquee-gold/40 bg-white p-1 text-sm">
        {[
          { key: "online" as const, label: "Pay Online" },
          { key: "scan" as const, label: "Scan & Pay" }
        ].map((opt) => (
          <button
            type="button"
            key={opt.key}
            onClick={() => setMethod(opt.key)}
            className={
              "flex-1 rounded-full py-2 font-semibold transition " +
              (method === opt.key
                ? "bg-blue-800 text-white"
                : "text-marquee-ink2 hover:text-marquee-ink")
            }
          >
            {opt.label}
          </button>
        ))}
      </div>

      {method === "online" ? (
        <OnlinePayment onPaid={onPaid} onBack={onBack} />
      ) : (
        <ScanAndPay amountLabel={amountLabel} onPaid={onPaid} onBack={onBack} />
      )}
    </div>
  );
}

// Card fields are a visual placeholder for this UI-only flow — no live
// payment processor is connected yet, so nothing here reads or sends real
// card data.
function OnlinePayment({
  onPaid,
  onBack
}: {
  onPaid: (referenceId: string) => void;
  onBack: () => void;
}) {
  const [submitting, setSubmitting] = useState(false);
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    // Simulated processing delay — a real charge will be wired up once the
    // payment back end is connected.
    setTimeout(() => {
      onPaid(`DEMO-${Date.now().toString().slice(-8)}`);
    }, 900);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4 rounded-2xl border border-marquee-gold/30 bg-white p-4 shadow-[0_2px_10px_rgba(60,20,10,0.06)]">
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-marquee-ink2">
            Name on card
          </span>
          <input
            required
            className={inputClass}
            value={cardName}
            onChange={(e) => setCardName(e.target.value)}
            placeholder="Jane Doe"
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-marquee-ink2">
            Card number
          </span>
          <input
            required
            inputMode="numeric"
            className={inputClass}
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            placeholder="4242 4242 4242 4242"
            maxLength={19}
          />
        </label>
        <div className="grid grid-cols-2 gap-4">
          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-marquee-ink2">
              Expiry
            </span>
            <input
              required
              className={inputClass}
              value={expiry}
              onChange={(e) => setExpiry(e.target.value)}
              placeholder="MM / YY"
              maxLength={7}
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-marquee-ink2">
              CVC
            </span>
            <input
              required
              inputMode="numeric"
              className={inputClass}
              value={cvc}
              onChange={(e) => setCvc(e.target.value)}
              placeholder="123"
              maxLength={4}
            />
          </label>
        </div>
      </div>

      <div className="flex flex-col-reverse gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
        <BackButton onClick={onBack} />

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-full bg-blue-800 py-3.5 text-sm font-bold uppercase tracking-wide text-white shadow-md transition hover:bg-marquee-marigold disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto sm:px-10"
        >
          {submitting ? "Processing payment…" : "Pay & Submit Entry"}
        </button>
      </div>

      <p className="text-xs text-marquee-ink2/70">
        This is a preview of the payment step for review purposes — no card
        details are collected or charged yet. Live payment processing will be
        connected in a later phase.
      </p>
    </form>
  );
}

function ScanAndPay({
  amountLabel,
  onPaid,
  onBack
}: {
  amountLabel: string;
  onPaid: (referenceId: string) => void;
  onBack: () => void;
}) {
  const [reference, setReference] = useState("");
  const [confirming, setConfirming] = useState(false);

  function handleConfirm(e: React.FormEvent) {
    e.preventDefault();
    setConfirming(true);
    // No live payment gateway is wired up for Scan & Pay yet — this simply
    // records the reference number the participant enters after scanning.
    onPaid(reference ? `SCAN-${reference}` : `SCAN-${Date.now()}`);
  }

  return (
    <form onSubmit={handleConfirm} className="space-y-6">
      <div className="rounded-2xl border border-marquee-gold/30 bg-white p-6 text-center shadow-[0_2px_10px_rgba(60,20,10,0.06)]">
        <QrPlaceholder />
        <p className="mt-4 text-sm text-marquee-ink2">
          Scan this code with any UPI or mobile payment app and pay{" "}
          <span className="font-semibold text-blue-800">{amountLabel}</span>.
        </p>
      </div>

      <div>
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-marquee-ink2">
            Transaction / reference number
          </span>
          <input
            className={inputClass}
            value={reference}
            onChange={(e) => setReference(e.target.value)}
            placeholder="Optional — helps us match your payment"
          />
        </label>
      </div>

      <div className="flex flex-col-reverse gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
        <BackButton onClick={onBack} />

        <button
          type="submit"
          disabled={confirming}
          className="w-full rounded-full bg-blue-800 py-3.5 text-sm font-bold uppercase tracking-wide text-white shadow-md transition hover:bg-marquee-marigold disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto sm:px-10"
        >
          {confirming ? "Confirming…" : "I've Completed My Payment"}
        </button>
      </div>

      <p className="text-xs text-marquee-ink2/70">
        After scanning and paying, tap the button above to confirm your
        entry. We may follow up by email if we need to verify your payment.
      </p>
    </form>
  );
}

function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-marquee-gold bg-transparent px-7 py-3 text-sm font-semibold text-marquee-ink transition-all hover:border-blue-800 hover:text-blue-800"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none"
        viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
      </svg>
      Back
    </button>
  );
}
