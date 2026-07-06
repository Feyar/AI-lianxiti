import type { QuestionDB } from '@/types'
import data from '@/data/questions.json'

export const questionDB = data as unknown as QuestionDB
export const allQuestions = questionDB.questions
