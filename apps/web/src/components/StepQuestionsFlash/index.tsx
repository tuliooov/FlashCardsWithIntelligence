'use client'

import { useCallback, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { changeScoreSubject, getSubjectByUuid } from '../../utils/subjects'
import { useAtom } from 'jotai'
import { languageAtom } from '../../utils/atoms'

const flashCardsTotal = 20

interface IQuestion {
  question: string
  alternatives: string[]
  answer: string
}

export const StepQuestionsFlash = ({ uuid }: { uuid: string }) => {
  const router = useRouter()
  const [language] = useAtom(languageAtom)

  const [flashCardsCount, setFlashCardCount] = useState(0)
  const [shouldShowAnswer, setShouldShowAnswer] = useState(false)
  const [numberQuestion, setNumberQuestion] = useState(1)
  const [loading, setloading] = useState(true)
  const [message, setMessage] = useState('')
  const [question, setQuestion] = useState<IQuestion>()
  const [menssages, setMessages] = useState<
    {
      message: string
      direction?: string
      sender: string
    }[]
  >([])

  const { level, subject, score = 0 } = getSubjectByUuid(uuid)

  const fetchQuestion = useCallback(async () => {
    const newMessage = {
      message: language.flash.chatGPT
        .replace('[subject]', subject)
        .replace('[level]', level),
      direction: 'outgoing',
      sender: 'user',
    }
    try {
      const response = await processMessageToChatGPT([...menssages, newMessage])
      const content = response.choices[0]?.message?.content
      if (content) {
        const chatGPTResponse = {
          message: content,
          sender: 'ChatGPT',
        }
        console.log(`chatGPTResponse`, chatGPTResponse)
        setMessages([...menssages, chatGPTResponse])
        const { message } = chatGPTResponse
        setMessage(message)
        const resposta = JSON.parse(message)

        setQuestion(resposta)
        setShouldShowAnswer(false)

        setloading(false)
      }
    } catch (error) {
      console.error('Error processing message:', error)
    } finally {
      // setIsTyping(false)
    }
  }, [level, menssages, subject])

  async function processMessageToChatGPT(
    chatMessages: {
      message: string
      direction?: string
      sender: string
    }[],
  ) {
    const apiMessages = chatMessages.map((messageObject) => {
      const role = messageObject.sender === 'ChatGPT' ? 'assistant' : 'user'
      return { role, content: messageObject.message }
    })

    const apiRequestBody = {
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: "I'm a Student using ChatGPT for learning" },
        ...apiMessages,
      ],
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + process.env.NEXT_PUBLIC_API_KEY_CHAT_GPT,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(apiRequestBody),
    })

    return response.json()
  }

  const onSuccess = () => {
    setTimeout(() => {
      setNumberQuestion((value) => {
        const newValue = value + 1
        return newValue
      })
      fetchQuestion()
    }, 2000)
  }

  const onFail = () => {
    alert(language.flash.error)
    setTimeout(() => {
      router.push('/', { scroll: false })
    }, 2000)
  }

  const handleChoose = (option: string) => () => {
    setFlashCardCount((count) => count + 1)
    setShouldShowAnswer(true)
    if (question && option === question.answer) onSuccess()
    else onFail()
  }

  useEffect(() => {
    if (numberQuestion === 20) {
      alert(language.flash.success)
      router.push('/', { scroll: false })
    } else if (numberQuestion > score) {
      changeScoreSubject(uuid, numberQuestion)
    }
  }, [language.flash.success, numberQuestion, router, score, uuid])

  useEffect(() => {
    fetchQuestion()
  }, [])

  return (
    <>
      <div className="flex-1 flex flex-col items-center px-6 py-20 self-stretch">
        <div className="space-y-4">
          <div>
            <span className="text-xl leading-heading font-bold">
              {subject} {level}
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
                  {question?.answer}
                </motion.p>
              ) : (
                <motion.p
                  layoutId="card-text"
                  className="text-smoke-950 leading-base text-center  flex flex-col gap-3 justify-center items-center"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {loading ? (
                    <>{language.flash.loading}...</>
                  ) : (
                    <>
                      <div>
                        <p>{question?.question}</p>
                      </div>

                      <div className="flex flex-col gap-2">
                        {(question?.alternatives || []).map((option) => (
                          <button
                            onClick={handleChoose(option)}
                            key={option}
                            className="text-left hover:bg-marine-400 rounded-md py-0 px-2"
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          <div className="z-10 rounded-lg bg-mirage-50/60 left-6 right-6 -bottom-2 absolute mx-6 h-20">
            f
          </div>
        </div>
      </div>

      {message}

      {/* <button
        onClick={() => {
          // setFlashCardCount((count) => count + 1)
          // setShouldShowAnswer(true)
        }}
        className="bg-mirage-50 text-marine-500 py-8 w-full font-bold uppercase hover:bg-mirage-50/90 md:w-[320px] md:mb-16 md:rounded-full md:py-6"
      >
        Revelar respostas
      </button> */}
    </>
  )
}
