import { atom } from 'jotai'

export enum ELanguage {
  PORTUGUESE = 'PORTUGUESE',
  ENGLISH = 'ENGLISH',
}

export const textsLanguage = {
  PORTUGUESE: {
    home: {
      title: 'Dashboard',
      subtitle: 'Assunto',
      buttonGoTask: 'Acessar',
    },
    create: {
      title: 'Criar',
      inputs: {
        title: 'Escreva o título',
        subject: 'Escreva o assunto',
        level: 'Escreva o nível',
        description: 'Escreva a descrição',
      },
      button: 'Adicionar',
    },
    flash: {
      loading: 'Carregando pergunta',
      success: 'Parabéns',
      error: 'Você errou',
      chatGPT: `Me retorne APENAS um objeto JSON uma pergunta diferente sobre [subject] [level], 4 alternativas e também uma resposta correta, siga exatamente o seguinte modelo:
      {
        question: 'responda aqui',
        alternatives: ['alternativa aqui']
        answer: 'resposta aqui'
      }`,
    },
  },
  ENGLISH: {
    home: {
      title: 'Dashboard',
      subtitle: 'Subjects',
      buttonGoTask: 'View',
    },
    create: {
      title: 'Criar',
      inputs: {
        title: 'Write the title',
        subject: 'Write the subject',
        level: 'Write the level',
        description: 'Write the description',
      },
      button: 'Add',
    },
    flash: {
      loading: 'Loading question',
      success: 'Success',
      error: 'Fail',
      chatGPT: `Return me ONLY a JSON object, a different question about [subject] [level], 4 alternatives and also a correct answer, follow exactly the following model:
      {
        question: 'answer here',
        alternatives: ['alternative here']
        answer: 'answer here'
      }`,
    },
  },
}

export const languageAtom = atom(textsLanguage[ELanguage.PORTUGUESE])
