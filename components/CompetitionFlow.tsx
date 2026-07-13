"use client";

import { useState } from "react";
import Stepper from "./Stepper";
import RulesSection from "./RulesSection";
import RegistrationForm, { RegistrationData } from "./RegistrationForm";
import PaymentForm from "./PaymentForm";

const STEP = { RULES: 0, FORM: 1, PAYMENT: 2, DONE: 3 } as const;
type Step = (typeof STEP)[keyof typeof STEP];

function makeReferenceId() {
  return `TROY-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
}

export default function CompetitionFlow({ entryFeeLabel }: { entryFeeLabel: string }) {
  const [step, setStep] = useState<Step>(STEP.RULES);
  const [acknowledged, setAcknowledged] = useState(false);
  const [formData, setFormData] = useState<RegistrationData | null>(null);
  const [submissionId, setSubmissionId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  // This is a front-end-only preview of the entry flow: submitting the form
  // simply advances to the Payment step and issues a placeholder reference
  // ID. Saving entries and processing payments will be wired up once the
  // back end is ready.
  function handleFormSubmit(data: RegistrationData) {
    setSubmitting(true);
    setError("");

    setTimeout(() => {
      setFormData(data);
      setSubmissionId(makeReferenceId());
      setSubmitting(false);
      setStep(STEP.PAYMENT);
    }, 500);
  }

  function handlePaid() {
    setStep(STEP.DONE);
  }

  return (
    <div id="register" className="mx-auto max-w-3xl px-6 py-16">
      <Stepper current={step} />

      {step === STEP.RULES && (
        <RulesSection
          acknowledged={acknowledged}
          onAcknowledgeChange={setAcknowledged}
          onContinue={() => setStep(STEP.FORM)}
        />
      )}

      {step === STEP.FORM && (
        <RegistrationForm
          initialData={formData}
          onSubmit={handleFormSubmit}
          submitting={submitting}
          error={error}
          onBack={() => setStep(STEP.RULES)}
        />
      )}

      {step === STEP.PAYMENT && (
        <PaymentForm
          amountLabel={entryFeeLabel}
          onPaid={handlePaid}
          onBack={() => setStep(STEP.FORM)}
        />
      )}

      {step === STEP.DONE && (
        <div className="rounded-2xl border border-marquee-gold/40 bg-marquee-sand p-8 text-center shadow-[0_2px_10px_rgba(60,20,10,0.06)]">
          <p className="font-marquee text-3xl text-blue-800">That&rsquo;s a wrap!</p>
          <p className="mx-auto mt-3 max-w-md text-sm text-marquee-ink2">
            Your entry has been submitted and your payment is confirmed. A
            confirmation email is on its way to{" "}
            <span className="font-semibold text-marquee-ink">{formData?.email}</span>.
            Finalists will be contacted directly — the jury&rsquo;s decision
            is final.
          </p>
          {submissionId && (
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-marquee-ink2/60">
              Reference ID: {submissionId}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
