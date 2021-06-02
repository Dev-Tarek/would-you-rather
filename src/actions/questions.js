import { _getQuestions } from "../_DATA"

export const GET_QUESTIONS = 'GET_QUESTIONS'
export const ADD_QUESTION = 'ADD_QUESTION'
export const ANSWER_QUESTION = 'ANSWER_QUESTION'

function getQuestions (questions) {
    return {
        type: GET_QUESTIONS,
        questions
    }
}

export function handleGetQuestions () {
    return dispatch => {
        return _getQuestions()
            .then(questions => {
                dispatch(getQuestions(questions))
            })
    }
}