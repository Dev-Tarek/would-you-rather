import { showLoading } from "react-redux-loading"
import { _saveQuestionAnswer } from "../_DATA"
import { handleGetQuestions } from "./questions"
import { handleGetUsers } from "./users"

export const SAVE_ANSWER = 'SAVE_ANSWER'
export const REMOVE_ANSWER = 'REMOVE_ANSWER'

export function getInitialData () {
    return dispatch => {
        dispatch(showLoading())
        return Promise.all([
            dispatch(handleGetQuestions()),
            dispatch(handleGetUsers())
        ])
    }
}

function saveAnswer (authedUser, qid, answer, users) {
    return {
        type: SAVE_ANSWER,
        authedUser,
        qid,
        users,
        answer
    }
}

function removeAnswer (authedUser, qid, answer, users) {
    return {
        type: REMOVE_ANSWER,
        authedUser,
        qid,
        users,
        answer
    }
}

export function handleSaveAnswer (authedUser, qid, answer, users) {
    return dispatch => {
        dispatch(saveAnswer(authedUser, qid, answer, users))
        return _saveQuestionAnswer({ authedUser, qid, answer })
                .catch((error) => {
                        console.log('Error saving question:', error)
                        alert('Unexpected error, please try again.')
                        dispatch(removeAnswer(authedUser, qid, answer, users))
                    })
    }
}