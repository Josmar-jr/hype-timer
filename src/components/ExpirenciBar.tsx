export function ExperienceBar() {
  return (
    <header className="flex items-center text-md w-full text-gray-150 font-semibold">
      <span>0 xp</span>
      <div className="flex-1 h-2 border border-green-100 rounded bg-gray-100 mx-5 relative">
        <div
          className="h-[6px] rounded bg-emerald-400"
          style={{ width: `90%` }}
        />
        <span
          className="absolute top-3 -translate-x-1/2 w-[44px]"
          style={{ left: `90%` }}
        >
          50 xp
        </span>
      </div>
      <span>100 xp</span>
    </header>
  )
}
