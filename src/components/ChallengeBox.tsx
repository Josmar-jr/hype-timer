export function ChallengeBox() {
  return (
    <div className="flex grow h-full border border-gray-600 justify-center items-center bg-gray-700 rounded py-6 px-8">
      <div className="text-center flex flex-col justify-center items-center">
        <strong className="text-2xl text-center font-semibold block mx-auto max-w-[240px] w-full">
          Inicie um ciclo e receba um desafio
        </strong>

        <div className="mx-auto mt-14 mb-4">
          <img src="/icons/arrow-plus-up.svg" alt="arrow up" />
        </div>

        <p className="max-w-[240px] w-full">
          Avance de level completando os desafios.
        </p>
      </div>
    </div>
  )
}
