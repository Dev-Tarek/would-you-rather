import { connect } from 'react-redux'
import Question from './parts/Question'

const ViewQuestion = props => {
    let id = props.match.params.id
    let authedUser = props.authedUser
    return (
        <div className='dashboard'>
            <h2>Would You Rather .. ?</h2>
            <div className='questions-list'>
                <Question
                    id={id}
                    answer={authedUser.answers[id] ? authedUser.answers[id] : null}    
                />
            </div>
        </div>
    )
}

function mapPropsToState({ authedUser, questions, users }, { id }) {
    return {
        authedUser: users[authedUser],
        question: questions[id],
        users
    }
  }

export default connect(mapPropsToState)(ViewQuestion)