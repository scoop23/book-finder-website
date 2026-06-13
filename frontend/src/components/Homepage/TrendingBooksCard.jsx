import { useState } from "react";

const BOOKS = [
  { title: "The House of Leaves", author: "Danielewski", bg: "from-[#2a1a3e] to-[#6b3a7d]", short: "The House\nof Leaves" },
  { title: "Piranesi", author: "Susanna Clarke", bg: "from-[#1a2e2a] to-[#2d6b5a]", short: "Piranesi" },
  { title: "Fourth Wing", author: "Rebecca Yarros", bg: "from-[#2e1a1a] to-[#7d3a3a]", short: "Fourth Wing" },
  { title: "Tomorrow & Tomorrow", author: "Gabrielle Zevin", bg: "from-[#1a1e2e] to-[#3a4a7d]", short: "Tomorrow,\nTomorrow" },
  { title: "The Covenant of Water", author: "Abraham Verghese", bg: "from-[#2a2a1a] to-[#7d6b2a]", short: "The Covenant\nof Water" },
];

export function TrendingBooksCard() {
  return (
    <div
      className="rounded-[18px] border border-white/[0.06] overflow-hidden flex flex-col"
      style={{ background: "#191920", gridColumn: "2", gridRow: "1" }}
    >
      <div className="flex justify-between items-center px-6 pt-5">
        <span className="text-[11px] font-medium tracking-[1.5px] uppercase text-[rgba(232,228,220,0.4)]">
          Trending this week
        </span>
        <span className="text-[12px] text-[#c9a96e] cursor-pointer">See all →</span>
      </div>

      <div className="flex gap-3 px-6 pb-5 pt-[18px] flex-1 items-end">
        {BOOKS.map((book) => (
          <div
            key={book.title}
            className="flex-1 flex flex-col gap-2 cursor-pointer group"
          >
            <div
              className={`rounded-lg bg-gradient-to-b ${book.bg} flex items-end p-2 overflow-hidden transition-transform duration-200 group-hover:-translate-y-1`}
              style={{ aspectRatio: "2/3", position: "relative" }}
            >
              <span
                className="w-full text-[10px] font-bold leading-[1.3] text-white/90"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  textShadow: "0 1px 3px rgba(0,0,0,0.6)",
                  whiteSpace: "pre-line",
                }}
              >
                {book.short}
              </span>
            </div>
            <div className="text-[11px] font-medium text-[rgba(232,228,220,0.85)] leading-[1.3]">
              {book.title}
            </div>
            <div className="text-[10px] text-[rgba(232,228,220,0.35)]">{book.author}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TrendingBooksCard;