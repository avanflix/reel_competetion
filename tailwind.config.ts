import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        marquee: {
          cream: "#FFFBF1",
          paper: "#FFFFFF",
          sand: "#FBF0DA",
          ink: "#3B2312",
          ink2: "#6B4B33",
          crimson: "#C0392B",
          marigold: "#F0821F",
          saffron: "#F7A83B",
          gold: "#C9962F",
          gold2: "#E8B84B",
          emerald: "#2F7D5E"
        }
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        marquee: ["var(--font-marquee)", "serif"],
        body: ["var(--font-body)", "sans-serif"]
      },
      backgroundImage: {
        "film-grain": "url('/grain.svg')",
        curtain: "linear-gradient(135deg, #C0392B 0%, #E8641F 45%, #F7A83B 100%)"
      },
      keyframes: {
        sweep: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" }
        },
        flicker: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.85" }
        }
      },
      animation: {
        sweep: "sweep 3.5s linear infinite",
        flicker: "flicker 4s ease-in-out infinite"
      }
    }
  },
  plugins: []
};

export default config;
