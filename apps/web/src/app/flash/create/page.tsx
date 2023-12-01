'use client'
import { useAtom } from 'jotai'
// import Image from 'next/image'
import { ArrowLeft, Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { getSubjects } from '../../../utils/subjects'
import Link from 'next/link'
import uuid from 'react-uuid'
import { languageAtom } from '../../../utils/atoms'

export default function Create() {
  const router = useRouter()
  const [language] = useAtom(languageAtom)

  const [subject, setSubject] = useState('')
  const [title, setTitle] = useState('')
  const [level, setLevel] = useState('')
  const [description, setDescription] = useState('')

  const handleAddSubject = () => {
    const subjects = getSubjects()

    if (subject && title && level) {
      subjects.push({
        uuid: uuid(),
        title,
        subject,
        description,
        level,
      })

      if (typeof window !== 'undefined') {
        localStorage.setItem('subjects', JSON.stringify(subjects))
      }

      router.push('/')
    }
  }

  return (
    <div>
      <div className="bg-gradient-to-t from-marine-600 to-marine-500 px-6 py-5 flex flex-col gap-8  items-left˜">
        <span className="text-2xl font-bold leading-heading text-mirage-50 flex items-center gap-2">
          <Link href={'/'}>
            <ArrowLeft />
          </Link>
          {language.create.title}
        </span>
      </div>

      <main className="p-6 flex flex-col grid-cols-2 gap-4 md:grid md:grid-cols-2 lg:grid-cols-3">
        <div className="flex flex-col gap-1 ">
          <label htmlFor="title">{language.create.inputs.title}:</label>
          <input
            id="title"
            name="title"
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            className="bg-gray-50 py-2 px-4  outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 placeholder:text-marine-500 text-marine-500"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="subject">{language.create.inputs.subject}:</label>
          <input
            id="subject"
            name="subject"
            type="text"
            onChange={(e) => setSubject(e.target.value)}
            className="bg-gray-50 py-2 px-4  outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 placeholder:text-marine-500 text-marine-500"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="level">{language.create.inputs.level}:</label>
          <input
            id="level"
            name="level"
            type="text"
            onChange={(e) => setLevel(e.target.value)}
            className="bg-gray-50 py-2 px-4  outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 placeholder:text-marine-500 text-marine-500"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="level">{language.create.inputs.description}:</label>
          <input
            id="description"
            name="description"
            type="text"
            onChange={(e) => setDescription(e.target.value)}
            className="bg-gray-50 py-2 px-4  outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 placeholder:text-marine-500 text-marine-500"
          />
        </div>
        <div>
          <button
            onClick={handleAddSubject}
            className="py-3 px-5 flex items-center gap-3 font-bold text-sm bg-marine-500 rounded-md text-mirage-50 hover:bg-marine-600 transition-colors"
          >
            {language.create.button} <Plus className="w-5 h-5" />
          </button>
        </div>
      </main>
    </div>
  )
}
