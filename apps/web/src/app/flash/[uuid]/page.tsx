'use client'

// import { useState } from 'react'
// import { StepGetTypeFlash } from '../../components/StepGetTypeFlash'
import { StepQuestionsFlash } from '../../../components/StepQuestionsFlash'

export default function Task({ params }: { params: { uuid: string } }) {
  return (
    <div className="bg-gradient-to-t text-center from-marine-600 to-marine-500 h-screen text-mirage-50  flex-col flex md:items-center">
      <StepQuestionsFlash {...params} />
    </div>
  )
}
