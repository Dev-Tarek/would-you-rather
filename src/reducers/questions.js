import { ADD_QUESTION, GET_QUESTIONS } from '../actions/questions'
import { REMOVE_ANSWER, SAVE_ANSWER } from '../actions/shared'

export function questions (state = {}, action) {
    switch (action.type) {
        case GET_QUESTIONS:
            return {
                ...state,
                ...action.questions
            }
        case ADD_QUESTION:
            return {
                ...state,
                [action.question.id]: {
                    ...action.question
                }
            }
        case SAVE_ANSWER:
            return {
                ...state,
                [action.qid]: {
                    ...state[action.qid],
                    [action.answer]: {
                        ...state[action.qid][action.answer],
                        votes: state[action.qid][action.answer].votes.concat([action.authedUser])
                    }
                }
            }
        case REMOVE_ANSWER:
            return {
                ...state,
                [action.qid]: {
                    ...state[action.qid],
                    [action.answer]: {
                        ...state[action.qid][action.answer],
                        votes: state[action.qid][action.answer].votes
                                .splice(state[action.qid][action.answer].votes.indexOf(action.authedUser), 1)
                    }
                }
            }
        default:
            return state
    }
}