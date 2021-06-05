import { Component } from 'react'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'

class Login extends Component {
    state = {
      selected: null
    }
    handleClick = e => {
        let userId = e.target.innerText
        this.setState({
          selected: userId
        })
    }
    handleSelect = e => {
        let { selected } = this.state
        if (selected) {
          const { dispatch } = this.props
          dispatch(setAuthedUser(selected))
        }
    }
    render() {
        const { users } = this.props
        const { selected } = this.state
        return (
          <div className='login-container'>
            <h3>Select a User</h3>
            <div>
              <ul>
                {Object.keys(users).map(userId =>
                    <li
                      key={userId} 
                      className={selected === userId? 'selected' : ''}
                      onClick={this.handleClick}
                    >
                       {userId}
                    </li>
                )}
              </ul>
            </div>
            <span className={`btn ${selected? '' : 'btn-disable'}`} onClick={this.handleSelect}> 
              Login
            </span>
          </div>
        )
      }
}

function mapPropsToState({ users }) {
  return {
    users,
  }
}
export default connect(mapPropsToState)(Login)