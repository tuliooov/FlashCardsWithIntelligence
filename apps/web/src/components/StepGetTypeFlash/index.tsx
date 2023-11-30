'use client'

import { useState } from 'react'

export const StepGetTypeFlash = ({
  handleChooseSubject,
}: {
  handleChooseSubject: (subject: string) => void
}) => {
  const [subject, setSubject] = useState('')
  return (
    <>
      <div className="flex-1 flex flex-col items-center px-6 py-20 self-stretch">
        <div className="space-y-4">
          <div>
            <span className="text-xl leading-heading font-bold">
              Digite o tema
            </span>
          </div>

          <div className="relative mt-20 w-full max-w-[480px] ">
            <div className="text-smoke-950 leading-base text-center  flex flex-col gap-3 justify-center items-center">
              <input
                type="text"
                id="first_name"
                className="bg-gray-50 py-2 px-4  outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 placeholder:text-marine-500 text-marine-500"
                placeholder="John"
                required
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
      <button
        onClick={() => {
          handleChooseSubject(subject)
        }}
        className="bg-mirage-50 text-marine-500 py-8 w-full font-bold uppercase hover:bg-mirage-50/90 md:w-[320px] md:mb-16 md:rounded-full md:py-6"
      >
        Começar
      </button>
    </>
  )
}
