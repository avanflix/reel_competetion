export type PaymentStatus = "paid" | "pending" | "failed";
export type VideoType = "url" | "upload";

export interface Submission {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  city: string;
  state: string;
  zip: string;
  genre: string;
  videoType: VideoType;
  videoUrl: string;
  isMinor: boolean;
  guardianName?: string;
  paymentStatus: PaymentStatus;
  createdAt: string;
}

const FIRST_NAMES = [
  "Anjali", "Ravi", "Sneha", "Kiran", "Priya", "Arjun", "Divya", "Sai",
  "Meera", "Vikram", "Lakshmi", "Naveen", "Pooja", "Rahul", "Swathi",
  "Aditya", "Harika", "Karthik", "Nikhil", "Sowmya"
];
const LAST_NAMES = [
  "Reddy", "Rao", "Kumar", "Naidu", "Sharma", "Chowdary", "Prasad",
  "Varma", "Iyer", "Gupta", "Patel", "Krishna", "Murthy", "Sastry"
];
const CITIES: [string, string][] = [
  ["Troy", "MI"], ["Ann Arbor", "MI"], ["Novi", "MI"], ["Canton", "MI"],
  ["Sterling Heights", "MI"], ["Detroit", "MI"], ["Chicago", "IL"],
  ["Columbus", "OH"], ["Cincinnati", "OH"], ["Indianapolis", "IN"]
];
const GENRES = [
  "Action", "Comedy", "Drama", "Musical / Dance", "Thriller",
  "Documentary", "Epics / Historical", "Horror"
];
const STATUSES: PaymentStatus[] = ["paid", "paid", "paid", "pending", "failed"];

// Small deterministic PRNG so the "random" admin data is stable across
// re-renders within a session, instead of reshuffling on every refresh.
function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function pick<T>(arr: T[], rand: () => number): T {
  return arr[Math.floor(rand() * arr.length)];
}

export function generateMockSubmissions(count = 18): Submission[] {
  const rand = mulberry32(20260713);
  const submissions: Submission[] = [];

  for (let i = 0; i < count; i++) {
    const first = pick(FIRST_NAMES, rand);
    const last = pick(LAST_NAMES, rand);
    const [city, state] = pick(CITIES, rand);
    const isMinor = rand() < 0.15;
    const videoType: VideoType = rand() < 0.6 ? "url" : "upload";
    const daysAgo = Math.floor(rand() * 20);
    const createdAt = new Date(Date.now() - daysAgo * 86400000).toISOString();

    submissions.push({
      _id: `demo-${1000 + i}`,
      firstName: first,
      lastName: last,
      email: `${first.toLowerCase()}.${last.toLowerCase()}@example.com`,
      mobile: `(248) 555-${String(1000 + i).slice(-4)}`,
      city,
      state,
      zip: String(48000 + Math.floor(rand() * 900)),
      genre: pick(GENRES, rand),
      videoType,
      videoUrl:
        videoType === "url"
          ? "https://drive.google.com/example-reel-link"
          : "/grain.svg",
      isMinor,
      guardianName: isMinor ? `${pick(FIRST_NAMES, rand)} ${last}` : undefined,
      paymentStatus: pick(STATUSES, rand),
      createdAt
    });
  }

  // Newest first
  return submissions.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}
