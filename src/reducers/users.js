import { GET_USERS } from '../actions/users'
import { REMOVE_ANSWER, SAVE_ANSWER } from '../actions/shared'
import { ADD_QUESTION } from '../actions/questions'

export function users (state = {}, action) {
    switch (action.type) {
        case GET_USERS:
            return {
                ...state,
                ...action.users
            }
        case ADD_QUESTION:
            return {
                ...state,
                [action.question.author]: {
                    ...state[action.question.author],
                    questions: state[action.question.author].questions.concat([action.question.id])
                }
            }
        case SAVE_ANSWER:
            return {
                ...state,
                [action.authedUser]: {
                    ...state[action.authedUser],
                    answers: {
                        ...state[action.authedUser].answers,
                        [action.qid]: action.answer
                    }
                }
            }
        case REMOVE_ANSWER:
            const { ...newAnswers } = state[action.authedUser].answers
            delete(newAnswers[action.qid])
            return {
                ...state,
                [action.authedUser]: {
                    ...state[action.authedUser],
                    answers: {
                        ...newAnswers
                    }
                }
            }
        default:
            return state
    }
}