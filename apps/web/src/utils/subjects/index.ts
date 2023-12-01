export interface ISubject {
  uuid: string
  title: string
  subject: string
  level: string
  score?: number
}

export const subjectsMock: ISubject[] = [
  {
    uuid: '1',
    title: 'Javascript Fundamentals',
    subject: 'Javascript',
    level: 'easy',
  },
  {
    uuid: '2',
    title: 'Javascript Intermediary',
    subject: 'Javascript',
    level: 'hard',
  },
  {
    uuid: '3',
    title: 'Javascript Advanced',
    subject: 'Javascript',
    level: 'extremely hard',
  },
]

export const getSubjectByUuid = (uuid: string) => {
  const subjects = getSubjects()
  return subjects.find((subject) => subject.uuid === uuid) as ISubject
}

export const getSubjects = (): ISubject[] => {
  if (typeof window !== 'undefined') {
    return JSON.parse(
      localStorage.getItem('subjects') || JSON.stringify(subjectsMock),
    )
  }
  return []
}

export const addScoreSubject = (uuid: string) => {
  const subjects = getSubjects()
  const subject = subjects.find((subject) => subject.uuid === uuid) as ISubject
  changeSubject({ ...subject, score: (subject.score || 0) + 1 })
}

export const changeScoreSubject = (uuid: string, value: number) => {
  const subjects = getSubjects()
  const subject = subjects.find((subject) => subject.uuid === uuid) as ISubject
  changeSubject({ ...subject, score: value })
}

export const changeSubject = (newSubject: ISubject) => {
  const subjects = getSubjects()
  const newSubjects = subjects.map((sub) => {
    if (sub.uuid === newSubject.uuid) return newSubject
    return sub
  })
  if (typeof window !== 'undefined') {
    localStorage.setItem('subjects', JSON.stringify(newSubjects))
  }
}
