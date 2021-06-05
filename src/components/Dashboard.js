import { Component } from "react"
import { connect } from "react-redux"
import Question from "./parts/Question"

class Dashboard extends Component {
    state = {
        selected: 'Unanswered',
        filters: ['All', 'Answered', 'Unanswered'],
    }
    handleFilter = e => {
        let filter = e.target.innerText
        if (filter !== this.state.selected)
            this.setState({
                selected: filter
            })
    }
    render() {
        let { questionIdList, authedUser } = this.props
        let { filters, selected } = this.state
        let answersIdList = Object.keys(authedUser.answers)

        questionIdList = selected === 'Answered'
                ? questionIdList.filter(qid => answersIdList.indexOf(qid) > -1)
                : selected === 'Unanswered'
                    ? questionIdList.filter(qid => answersIdList.indexOf(qid) === -1)
                    : questionIdList

        return (
            <div className='dashboard'>
                <h2>Would You Rather .. ?</h2>
                <div className='filters-list'>
                    <ul>
                        {filters.map(filter => 
                            <li key={filter} className={filter === selected? 'active' : ''} onClick={this.handleFilter}>
                                {filter}
                            </li>
                         )}
                    </ul>
                </div>
                <div className="questions-list">
                    {questionIdList.length
                        ? questionIdList.map(id => 
                                <Question
                                    key={id}
                                    id={id}
                                    readOnly={true}
                                    answer={authedUser.answers[id] ? authedUser.answers[id] : null}    
                                />
                            )
                        : <p style={{textAlign: 'center', margin: '64px'}}>No questions found</p>
                    }
                </div>
            </div>
        )
    }
}

function mapPropsToState({ questions, authedUser, users }) {
    return {
        questionIdList: Object.keys(questions)
                        .sort((a, b) => questions[b].timestamp - questions[a].timestamp),
        authedUser: users[authedUser]
    }
}
export default connect(mapPropsToState)(Dashboard)