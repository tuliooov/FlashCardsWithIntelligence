'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// {String(flashCardsCount).padStart(2, '0')} -> Maneira para determinar que precisa ter 2 strings e que se não tiver, é para completar com o 0

const flashCardsTotal = 12

export default function Flash() {
  // State para "contar" quantos flashcards já foram respondidos
  const [flashCardsCount, setFlashCardCount] = useState(0)

  const [shouldShowAnswer, setShouldShowAnswer] = useState(false)

  return (
    <div className="bg-gradient-to-t from-marine-600 to-marine-500 h-screen text-mirage-50  flex-col flex md:items-center">
      <div className="flex-1 flex flex-col items-center px-6 py-20 self-stretch">
        <div className="space-y-4">
          <div>
            <span className="text-xl leading-heading font-bold">
              Fundamentos do JavaScript
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="h-3 flex-1 bg-marine-800 rounded-md">
              <div
                className="h-3 rounded-md bg-marine-300 transition-all"
                style={{
                  width: `${Math.round(
                    (flashCardsCount * 100) / flashCardsTotal,
                  )}%`,
                }}
              />
            </div>
            <span className="font-bold font-mono text-sm">
              {String(flashCardsCount).padStart(2, '0')}/{flashCardsTotal}
            </span>
          </div>
        </div>

        <div className="relative mt-20 w-full max-w-[480px]">
          <motion.div
            className="rounded-lg relative inset-0 bg-mirage-50 min-h-[416px] px-5 py-6 mx-6 z-20"
            transition={{ duration: 0.4 }}
            animate={
              shouldShowAnswer
                ? {
                  rotateY: 180,
                }
                : {}
            }
          />
          <div className="absolute z-30 top-1/2 -translate-y-1/2 w-full text-center px-5 py-6">
            <AnimatePresence>
              {shouldShowAnswer ? (
                <motion.p
                  layoutId="card-text"
                  className="text-smoke-950 leading-base text-center  flex justify-center items-center"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  Resposta
                </motion.p>
              ) : (
                <motion.p
                  layoutId="card-text"
                  className="text-smoke-950 leading-base text-center  flex justify-center items-center"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet
                  dicta, nisi accusamus deserunt, eos delectus, culpa doloribus
                  esse ex architecto illo aliquam soluta saepe recusandae non!
                  Fugiat, odio unde? Nisi!
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          <div className="z-10 rounded-lg bg-mirage-50/60 left-6 right-6 -bottom-2 absolute mx-6 h-20">
            f
          </div>
        </div>
      </div>

      <button
        onClick={() => setShouldShowAnswer(true)}
        className="bg-mirage-50 text-marine-500 py-8 w-full font-bold uppercase hover:bg-mirage-50/90 md:w-[320px] md:mb-16 md:rounded-full md:py-6"
      >
        Revelar respostas
      </button>
    </div>
  )
}
