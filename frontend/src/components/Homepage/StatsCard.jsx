const STATS = [
  { num: "24", suffix: "+", label: "Books read this year", bar: 68 },
  { num: "8,430", suffix: "", label: "Pages turned", bar: 45 },
  { num: "7", suffix: "", label: "Day reading streak", bar: 30 },
];

export function StatsCard() {
  return (
    <div
      className="rounded-[18px] border border-white/[0.06] overflow-hidden flex flex-col p-6"
      style={{ background: "#191920", gridColumn: "2", gridRow: "2" }}
    >
      <div className="flex justify-between items-center">
        <span className="text-[11px] font-medium tracking-[1.5px] uppercase text-[rgba(232,228,220,0.4)]">
          Your reading year
        </span>
        <span className="text-[12px] text-[#c9a96e] cursor-pointer">View profile</span>
      </div>

      <div className="grid grid-cols-2 gap-3 mt-4 flex-1">
        {STATS.map((s) => (
          <div
            key={s.label}
            className="rounded-[12px] border border-white/[0.05] p-4 flex flex-col justify-between"
            style={{ background: "rgba(255,255,255,0.03)" }}
          >
            <div>
              <div
                className="text-[28px] font-bold text-[#e8e4dc] leading-none"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {s.num}
                {s.suffix && (
                  <span className="text-[18px] text-[#c9a96e]">{s.suffix}</span>
                )}
              </div>
              <div className="text-[12px] text-[rgba(232,228,220,0.35)] mt-1.5">
                {s.label}
              </div>
            </div>
            <div
              className="h-[3px] rounded-sm mt-2.5 overflow-hidden"
              style={{ background: "rgba(255,255,255,0.08)" }}
            >
              <div
                className="h-full rounded-sm"
                style={{ width: `${s.bar}%`, background: "#c9a96e" }}
              />
            </div>
          </div>
        ))}

        {/* Surprise Me tile */}
        <button
          className="rounded-[12px] border p-4 flex flex-col justify-between cursor-pointer transition-all duration-200 text-left hover:border-[rgba(201,169,110,0.3)]"
          style={{
            background: "rgba(201,169,110,0.08)",
            borderColor: "rgba(201,169,110,0.15)",
          }}
        >
          <div>
            <div className="text-[22px] mb-1">✨</div>
            <div
              className="text-[13px] font-medium"
              style={{ color: "rgba(201,169,110,0.7)" }}
            >
              Surprise me
            </div>
          </div>
          <div
            className="text-[11px] mt-2"
            style={{ color: "rgba(201,169,110,0.4)" }}
          >
            Get a random pick →
          </div>
        </button>
      </div>
    </div>
  );
}

export default StatsCard;