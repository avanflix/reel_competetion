"use client";

interface RuleGroup {
  title: string;
  items: string[];
}

const RULE_GROUPS: RuleGroup[] = [
  {
    title: "Eligibility",
    items: [
      "Actors in the reel must be local US residents only. Senior actors may be the parent of a US resident.",
      "There is no restriction on the number of people in the reel and no restriction on age.",
      "Participants under the age of 18 must list a parent or guardian name on the entry form."
    ]
  },
  {
    title: "Content Guidelines",
    items: [
      "Reels must be original work in the Telugu language. Some English is permitted and English subtitles are accepted.",
      "All genres are welcome — Action, Adventure, Comedy, Crime/Gangster, Drama, Epics/Historical, Horror, Musicals/Dance, Thriller and more.",
      "Entries must not contain political bias, or demeaning, vulgar, or adult content. Any such entry will be disqualified."
    ]
  },
  {
    title: "Format & Duration",
    items: [
      "Short reels must run between 5 and 10 minutes (600 seconds max), including opening and closing credits.",
      "Reel submissions must be 1 minute 30 seconds or shorter.",
      "Reels previously submitted to other festivals are welcome — please note where they were shown."
    ]
  },
  {
    title: "Rights & Copyright",
    items: [
      "No third-party copyrighted material may be used unless you hold a license or the use qualifies as fair use (e.g. background music or sound effects).",
      "You are solely responsible for securing rights to any music, trademarks, logos, or other IP used in your entry.",
      "Troy Telugu Association is not responsible for copyright infringement in submitted entries."
    ]
  },
  {
    title: "Judging & Prizes",
    items: [
      "The jury's decision is final, unquestionable, and binding on all participants.",
      "The top 3 finalists in each category will be notified by email and recognized on stage.",
      "Submission deadline: July 20, 2026."
    ]
  }
];

interface RulesSectionProps {
  acknowledged: boolean;
  onAcknowledgeChange: (value: boolean) => void;
  onContinue: () => void;
}

export default function RulesSection({
  acknowledged,
  onAcknowledgeChange,
  onContinue
}: RulesSectionProps) {
  return (
    <div className="space-y-8">
      {/* Single Rules Card */}
      <div className="rounded-3xl border border-marquee-blue/30 bg-marquee-paper p-8 shadow-xl">
        <h2 className="font-display text-3xl text-center text-blue-800">
          Rules &amp; Regulations
        </h2>

        <div className="dotted-rule mx-auto mt-3 mb-8 w-58" />

        <div className="space-y-5">
          {RULE_GROUPS.map((group) => (
            <div
              key={group.title}
              className="grid gap-2 last:pb-0 md:grid-cols-[220px_1fr]"
            >
              {/* Left Heading */}
              <div>
                <h3 className="font-display text-xl text-blue-800">{group.title}</h3>
              </div>

              {/* Right Content */}
              <ul className="space-y-0.5">
                {group.items.map((item, index) => (
                  <li
                    key={index}
                    className="flex gap-3 text-sm leading-snug text-marquee-ink2"
                  >
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-blue-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Acknowledgement */}
      <div className="rounded-2xl border border-marquee-gold/40 bg-marquee-sand p-5">
        <label className="flex cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            checked={acknowledged}
            onChange={(e) => onAcknowledgeChange(e.target.checked)}
            className="mt-1 h-5 w-5 accent-blue-800"
          />

          <span className="text-sm text-marquee-ink">
            I acknowledge the Rules &amp; Regulations set by{" "}
            <span className="text-blue-800 font-extrabold">TROY</span> Telugu
            Association for the Reels Competition and confirm that my submission
            complies with all the above guidelines.
          </span>
        </label>

        <button
          type="button"
          disabled={!acknowledged}
          onClick={onContinue}
          className="mt-5 rounded-full bg-gradient-to-r from-blue-900 via-blue-700 to-sky-500 px-8 py-3 text-sm font-bold uppercase tracking-wide text-white shadow-lg transition-all duration-300 enabled:hover:from-sky-500 enabled:hover:via-blue-600 enabled:hover:to-indigo-800 enabled:hover:scale-105 disabled:cursor-not-allowed disabled:opacity-30"
        >
          Continue to Entry Form
        </button>
      </div>
    </div>
  );
}
