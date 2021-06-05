import { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddQuestion } from '../actions/questions'

class NewQuestion extends Component {
    state = {
        optionOne: '',
        optionTwo: '',
    }
    handleChange = e => {
        let option = e.target.name
        let value = e.target.value
        this.setState({
            [option]: value
        })
    }
    handleQuestionSubmit = e => {
        e.preventDefault()
        let { optionOne, optionTwo } = this.state
        if (optionOne && optionTwo) {
            let question = {
                optionOneText: optionOne,
                optionTwoText: optionTwo,
                author: this.props.authedUser
            }
            this.props.dispatch(handleAddQuestion(question))
            this.props.history.push('/')
        }
    }
    render() {
        let { optionOne, optionTwo } = this.state
        return (
            <div className='dashboard'>
                <h2>Add a New Question</h2>
                <div className='question-form'>
                    <h4>Would you rather:</h4>
                    <form>
                        <p>Option One:</p>
                            <input value={optionOne} onChange={this.handleChange} name='optionOne' />
                        <p className='or'>
                            .. or ..
                        </p>
                        <p>Option Two:</p>
                        <   input value={optionTwo} onChange={this.handleChange} name='optionTwo' />
                        <span className={`btn ${optionOne && optionTwo ? '' : 'btn-disable'}`} onClick={this.handleQuestionSubmit}>
                            Submit
                        </span>
                    </form>
                </div>
            </div>
        )
    }
}

function mapPropsToState({ authedUser }) {
    return {
        authedUser
    }
  }
export default connect(mapPropsToState)(NewQuestion)