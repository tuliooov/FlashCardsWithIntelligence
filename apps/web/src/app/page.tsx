'use client'
import { useAtom } from 'jotai'
// import Image from 'next/image'
import { MoveRight, Plus } from 'lucide-react'
import { ProgressCircle } from '../components/progress-circle'
import { getSubjects } from '../utils/subjects'
import Link from 'next/link'
import { ELanguage, languageAtom, textsLanguage } from '../utils/atoms'

export default function Home() {
  const subjects = getSubjects()
  const [language] = useAtom(languageAtom)

  const [, setLanguage] = useAtom(languageAtom)

  const handleChangeLanguage = (value: 'PORTUGUESE' | 'ENGLISH') => () => {
    setLanguage(textsLanguage[value])
  }

  return (
    <div>
      <div className="bg-gradient-to-t from-marine-600 to-marine-500 px-6 py-5 flex flex-row justify-between items-left˜">
        <span className="text-2xl font-bold leading-heading text-mirage-50">
          Dashboard
        </span>
        <div className="flex flex-row gap-2 text-marine-50">
          <button
            onClick={handleChangeLanguage(ELanguage.PORTUGUESE)}
            className="rounded-full hover:bg-marine-600 py-2 px-2 active:bg-marine-700"
          >
            BR
          </button>
          <button
            onClick={handleChangeLanguage(ELanguage.ENGLISH)}
            className="rounded-full hover:bg-marine-600 py-2 px-2 active:bg-marine-700"
          >
            EN
          </button>
        </div>
      </div>

      <main className="p-6 flex flex-col gap-4">
        <div className="flex flex-row justify-between">
          <span className="text-lg font-bold leading-heading">
            {language.home.subtitle}
          </span>
          <Link href={'/flash/create'}>
            <button className="rounded-full hover:bg-marine-200 py-2 px-2 active:bg-marine-300">
              <Plus className="w-5 h-5" />
            </button>
          </Link>
        </div>

        {/* cards */}
        <div className="flex flex-col gap-4 md:grid md:grid-cols-2 lg:grid-cols-3">
          {subjects.map((subject, i) => {
            return (
              <div
                key={i}
                className="py-6 px-5 rounded-lg flex flex-col gap-5 bg-mirage-50 border border-mirage-100 shadow-lg transition-transform duration-300 hover:scale-[1.025] "
              >
                <span className="uppercase font-bold text-sm text-mirage-600 leading-heading">
                  {subject.subject}
                </span>

                <div className="space-y-2">
                  <h2 className="font-bold leading-heading">{subject.title}</h2>

                  <p className="text-smoke-800 text-sm leading-base">
                    {subject.description}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <Link
                    href={`/flash/${subject.uuid}`}
                    className="py-3 px-5 flex items-center gap-3 font-bold text-sm bg-marine-500 rounded-md text-mirage-50 hover:bg-marine-600 transition-colors"
                  >
                    {language.home.buttonGoTask}
                    <MoveRight className="w-5 h-5" />
                  </Link>

                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6">
                      <ProgressCircle
                        progress={(60 / 20) * (subject.score || 0)}
                      />
                    </div>
                    <span className="text-smoke-600 text-sm leading-base">
                      {subject.score || 0}/20
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </main>
    </div>
  )
}
