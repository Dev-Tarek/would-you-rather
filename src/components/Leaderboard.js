import { Component } from "react"
import { connect } from "react-redux"
import User from "./parts/UserCard"

class Leaderboard extends Component {
  render() {
    const { userIds, users } = this.props
    return (
        <div className='leaderboard'>
            <h2>Leaderboard</h2>
            <div className="users-list">
                {userIds.map((userId, index) => 
                    <User
                        key={userId}
                        index={index + 1}
                        user={users[userId]} />
                )}
            </div>
        </div>
    )
  }
}

const getUserScore = user => Object.keys(user.answers).length + user.questions.length

function mapPropsToState({ users }) {
    return {
        users,
        userIds: Object.keys(users)
            .sort((a, b) => (getUserScore(users[b]) - getUserScore(users[a])))
    }
}
export default connect(mapPropsToState)(Leaderboard)