import { Component } from 'react'
import { connect } from 'react-redux'
import { FaArrowRight } from 'react-icons/fa'
import { Link, Redirect } from 'react-router-dom'
import { handleSaveAnswer } from '../../actions/shared'

const titleStyle = {
    display: 'inline-block',
    verticalAlign: 'middle',
    marginLeft: '16px',
    fontSize: '20px',
}
const avatarStyle = {
    display: 'inline-block',
    verticalAlign: 'middle',
    width: '64px',
}

class Question extends Component {
    getDate = timestamp => {
        let date = new Date(timestamp)
        return date.toLocaleString()
    }
    handleOptionClick = (authedUser, users, qid, option) => {
        const answered = this.props.answer
        if (!answered)
            this.props.dispatch(handleSaveAnswer(authedUser, qid, option, users))
    }
    render() {
        let { question, readOnly, users, answer, authedUser } = this.props
        if (!question)
            return <Redirect to='/404' />
            
        let authorName = users[question.author].name
        let authorAvatar = users[question.author].avatarURL
        let optionOneCount = question.optionOne.votes.length
        let optionTwoCount = question.optionTwo.votes.length
        let total = optionOneCount + optionTwoCount
        return question
            ? readOnly
                ?   <div className={`question ${answer ? 'answered' : ''}`}>
                        <Link to={`/question/${question.id}`}>
                            <span className='view'>
                                Open Poll <FaArrowRight />
                            </span>
                        </Link>
                        <p className='date'>{this.getDate(question.timestamp)}</p>
                        <p className='author-name'><b>{authorName}</b> asks:</p>
                        <div className='options'>
                            <p className='option'> {question.optionOne.text} </p>
                            <p className='or'> OR </p>
                            <p className='option'> {question.optionTwo.text} </p>
                        </div>
                    </div>

                :   <div className={`question ${answer ? 'answered' : ''}`}>
                        <img style={avatarStyle} alt={`${authorName} avatar`} src={authorAvatar} />
                        <div style={titleStyle}>
                            <p className='date'>{this.getDate(question.timestamp)}</p>
                            <p className='author-name'><b>{authorName}</b> asks:</p>
                        </div>
                        <div className='options'>
                            <p  onClick={() => this.handleOptionClick(authedUser, users, question.id, 'optionOne') }
                                className={`option ${answer ? answer === 'optionOne' ? 'answered' : 'disabled' : ''}`}>
                                    {question.optionOne.text}
                                    {answer ? ` [${optionOneCount} votes: ${(optionOneCount * 100 / total).toFixed(2)}%]` : null }
                            </p>
                            <p className='or'> OR </p>
                            <p  onClick={() => this.handleOptionClick(authedUser, users, question.id, 'optionTwo') }
                                className={`option ${answer ? answer === 'optionTwo' ? 'answered' : 'disabled' : ''}`}>
                                    {question.optionTwo.text}
                                    {answer ? ` [${optionTwoCount} votes: ${(optionTwoCount * 100 / total).toFixed(2)}%]` : null }
                            </p>
                        </div>
                    </div>
            : null
    }
}

function mapPropsToState({ authedUser, questions, users }, { id }) {
    return {
        authedUser,
        question: questions[id],
        users
    }
  }

export default connect(mapPropsToState)(Question)