import { hideLoading, showLoading } from "react-redux-loading"
import { _getQuestions, _saveQuestion } from "../_DATA"

export const GET_QUESTIONS = 'GET_QUESTIONS'
export const ADD_QUESTION = 'ADD_QUESTION'

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

function addQuestion (question) {
    return {
        type: ADD_QUESTION,
        question
    }
}

export function handleAddQuestion (question) {
    return dispatch => {
        dispatch(showLoading())
        return _saveQuestion(question)
            .then(question => {
                dispatch(addQuestion(question))
                dispatch(hideLoading())
            })
            .catch(error => {
                console.log('Error adding question:', error)
                alert('Question was not added due to an error, please retry.')
                dispatch(hideLoading())
            })
    }
}