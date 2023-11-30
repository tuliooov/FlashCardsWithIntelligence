'use client'

import { useState } from 'react'
import { StepGetTypeFlash } from '../../components/StepGetTypeFlash'
import { StepQuestionsFlash } from '../../components/StepQuestionsFlash'

export default function Flash() {
  const [config, setConfig] = useState({
    step: 1,
    subject: '',
  })

  const handleChooseSubject = (subject: string) => {
    setConfig(() => ({
      step: 2,
      subject,
    }))
  }

  return (
    <div className="bg-gradient-to-t text-center from-marine-600 to-marine-500 h-screen text-mirage-50  flex-col flex md:items-center">
      {config.step === 1 ? (
        <StepGetTypeFlash handleChooseSubject={handleChooseSubject} />
      ) : (
          <StepQuestionsFlash subject={config.subject} />
      )}
    </div>
  )
}
