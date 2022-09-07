export function Profile() {
  return (
    <div className="flex gap-4 items-center">
      <div className="w-[5.5rem] md:w-24 rounded-full border-violet-500 border-2 p-1">
        <img
          className="w-full rounded-full "
          src="https://github.com/josmar-jr.png"
          alt="Image Profile"
        />
      </div>

      <div className="flex flex-col">
        <span className="text-2xl font-semibold">Josmar Junior</span>
        <p className="text-base text-gray-150 inline-flex gap-2 mt-[2px]">
          <img src="/icons/arrow-up.svg" alt="arrow up" />
          Level 01
        </p>
      </div>
    </div>
  )
}
