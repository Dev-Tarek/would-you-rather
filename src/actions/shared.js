import { showLoading } from "react-redux-loading-bar"
import { handleGetQuestions } from "./questions"
import { handleGetUsers } from "./users"

export function getInitialData () {
    return dispatch => {
        dispatch(showLoading())
        return Promise.all([
            dispatch(handleGetQuestions()),
            dispatch(handleGetUsers())
        ])
    }
}