const clsNumber =
  'flex pt-1 flex-1 justify-center bg-gray-700 font-bold rounded'

export function Timer() {
  return (
    <div className="flex font-mono text-9xl w-full">
      <div className="flex flex-1 justify-evenly gap-2 items-center">
        <span className={clsNumber}>1</span>
        <span className={clsNumber}>2</span>
      </div>
      <span className="font-bold px-1">:</span>
      <div className="flex flex-1 justify-evenly gap-2 items-center">
        <span className={clsNumber}>3</span>
        <span className={clsNumber}>5</span>
      </div>
    </div>
  )
}
