import { Component } from "react"
import { connect } from "react-redux"
import { setAuthedUser } from "../actions/authedUser"

class Login extends Component {
    handleSelect = e => {
        const { dispatch } = this.props
        let userId = e.target.value
        dispatch(setAuthedUser(userId))
    }
    render() {
        const { users } = this.props
        return (
          <div className="login-container">
            <select onChange={this.handleSelect}>
                <option> Select User </option>
                {Object.keys(users).map(userId =>
                    <option 
                        key={userId} 
                        value={userId}>
                            {userId}
                    </option>
                )}
            </select>
          </div>
        );
      }
}

function mapPropsToState({ users }) {
  return {
    users,
  }
}
export default connect(mapPropsToState)(Login)