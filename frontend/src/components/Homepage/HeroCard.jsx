import { useState } from "react";

const BOOKS = [
  { title: "The House of Leaves", author: "Danielewski", bg: "from-[#2a1a3e] to-[#6b3a7d]", short: "The House\nof Leaves" },
  { title: "Piranesi", author: "Susanna Clarke", bg: "from-[#1a2e2a] to-[#2d6b5a]", short: "Piranesi" },
  { title: "Fourth Wing", author: "Rebecca Yarros", bg: "from-[#2e1a1a] to-[#7d3a3a]", short: "Fourth Wing" },
  { title: "Tomorrow & Tomorrow", author: "Gabrielle Zevin", bg: "from-[#1a1e2e] to-[#3a4a7d]", short: "Tomorrow,\nTomorrow" },
  { title: "The Covenant of Water", author: "Abraham Verghese", bg: "from-[#2a2a1a] to-[#7d6b2a]", short: "The Covenant\nof Water" },
];

const DecoDots = () => (
  <svg
    className="absolute top-7 right-8 w-20 h-20 opacity-[0.12] pointer-events-none"
    viewBox="0 0 80 80"
    fill="none"
  >
    {[10, 30, 50, 70].flatMap((x) =>
      [10, 30, 50, 70].map((y) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="3" fill="#c9a96e" />
      ))
    )}
  </svg>
);

export function HeroCard() {
  const [search, setSearch] = useState("");

  return (
    <>
      <DecoDots />

      <div
        className="relative rounded-[18px] border border-white/[0.06] overflow-hidden flex flex-col justify-end p-9"
        style={{
          background: "linear-gradient(135deg, #191920 0%, #1e1a2e 100%)",
          gridColumn: "1",
          gridRow: "1",
          minHeight: "280px",
        }}
      >
        <p className="text-[11px] font-medium tracking-[2px] uppercase text-[#c9a96e] mb-3">
          Your reading universe
        </p>

        <h1
          className="text-[38px] leading-[1.15] font-bold text-[#e8e4dc] mb-3"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Find your next
          <br />
          <em className="text-[#c9a96e] not-italic" style={{ fontStyle: "italic" }}>
            great read
          </em>
        </h1>

        <p className="text-[14px] text-[rgba(232,228,220,0.5)] leading-[1.7] max-w-[340px] mb-6">
          Millions of books, curated shelves, and recommendations built around how you actually read.
        </p>

        <div className="flex bg-white/[0.07] border border-white/10 rounded-[10px] overflow-hidden max-w-[400px]">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title, author, or ISBN…"
            className="flex-1 bg-transparent border-none outline-none px-4 py-3 text-[14px] text-[#e8e4dc] placeholder-[rgba(232,228,220,0.3)]"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          />
          <button
            className="px-[18px] text-[16px] cursor-pointer transition-colors duration-200"
            style={{ background: "#c9a96e", color: "#0f0f12", border: "none" }}
            onMouseEnter={(e) => (e.target.style.background = "#dbbf87")}
            onMouseLeave={(e) => (e.target.style.background = "#c9a96e")}
          >
            →
          </button>
        </div>
      </div>
    </>
  );
}

export default HeroCard;
