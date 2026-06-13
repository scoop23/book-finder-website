const GENRES = [
  { icon: "📖", name: "Fiction", count: "84k titles" },
  { icon: "🔍", name: "Mystery", count: "31k titles" },
  { icon: "🚀", name: "Sci-Fi", count: "47k titles" },
  { icon: "🌹", name: "Romance", count: "62k titles" },
  { icon: "🧠", name: "Non-fiction", count: "55k titles" },
  { icon: "⚔️", name: "Fantasy", count: "39k titles" },
];

export function GenresCard() {
  return (
    <div
      className="rounded-[18px] border border-white/[0.06] overflow-hidden flex flex-col p-6"
      style={{ background: "#191920", gridColumn: "1", gridRow: "2" }}
    >
      <span className="text-[11px] font-medium tracking-[1.5px] uppercase text-[rgba(232,228,220,0.4)]">
        Browse by genre
      </span>

      <div className="grid grid-cols-3 gap-2 mt-4 flex-1">
        {GENRES.map((g) => (
          <button
            key={g.name}
            className="rounded-[10px] p-3 flex flex-col gap-1 cursor-pointer border border-white/[0.05] text-left transition-all duration-200 hover:border-white/[0.15] hover:bg-white/[0.04]"
            style={{ background: "transparent" }}
          >
            <span className="text-[18px] mb-0.5">{g.icon}</span>
            <span className="text-[12px] font-medium text-[rgba(232,228,220,0.8)]">
              {g.name}
            </span>
            <span className="text-[11px] text-[rgba(232,228,220,0.3)]">{g.count}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default GenresCard;
