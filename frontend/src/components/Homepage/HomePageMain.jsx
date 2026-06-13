import { useState } from "react";
import HeroCard from "./HeroCard";
import TrendingBooksCard from "./TrendingBooksCard";
import GenresCard from "./GenresCard";
import StatsCard from "./StatsCard";

export function HomePageMain() {
  const [search, setSearch] = useState("");


  return (
    <div
      className="flex flex-col min-h-screen min-w-screen items-center text-[#e8e4dc] overflow-hidden "
      style={{ background: "#0f0f12", fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* Google Fonts */}
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap');`}</style>

      {/* NAV */}
      <nav className="justify-between items-center px-10 py-5 border-b border-white/[0.06] flex gap-12">
        <div
          className="text-[22px] tracking-tight"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Bookiverse
          <span className="text-[#c9a96e] italic">.</span>
        </div>

        <ul className="flex gap-7 list-none text-[13px] font-light tracking-wide text-[rgba(232,228,220,0.5)]">
          {["Discover", "My Library", "Lists", "Authors"].map((link) => (
            <li
              key={link}
              className="cursor-pointer hover:text-[#e8e4dc] transition-colors duration-200"
            >
              {link}
            </li>
          ))}
        </ul>

        <button
          className="text-[13px] font-medium px-[22px] py-[9px] rounded-[6px] cursor-pointer transition-colors duration-200"
          style={{ background: "#c9a96e", color: "#0f0f12" }}
          onMouseEnter={(e) => (e.target.style.background = "#dbbf87")}
          onMouseLeave={(e) => (e.target.style.background = "#c9a96e")}
        >
          Search books ↗
        </button>
      </nav>

      {/* GRID BODY */}
      <div
        className="grid gap-4 px-10 pb-8 pt-6"
        style={{
          gridTemplateColumns: "1fr 1fr",
          gridTemplateRows: "auto auto",
          height: "calc(100vh - 69px)",
        }}
      >
        {/* HERO CARD */}
        <HeroCard />

        {/* TRENDING BOOKS CARD */}
        <TrendingBooksCard />

        {/* GENRES CARD */}
        <GenresCard />

        {/* STATS CARD */}
        <StatsCard />
      </div>
    </div>
  );
}

export default HomePageMain;
