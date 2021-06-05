import { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { FaGithub } from 'react-icons/fa'
import { setAuthedUser } from '../actions/authedUser'

class Navbar extends Component {
    handleLogout = e => {
        const { dispatch } = this.props
        dispatch(setAuthedUser(null))
    }
    render() {
        const { authedUser } = this.props
        return (
            <div className='navbar'>
                <div className='logo'>
                    <a href='https://github.com/Dev-Tarek'>
                        <FaGithub className='navbar-icon' />
                        <span className='navbar-text'>DevTarek</span>
                    </a>
                </div>
                <div className='navigation'>
                    <span className='space-5'></span>
                    <ul>
                    <Link className='nav-button' to='/'>              <li> Dashboard    </li> </Link>
                    <Link className='nav-button' to='/add'>           <li> New Question </li> </Link>
                    <Link className='nav-button' to='/leaderboard'>   <li> Leaderboard  </li> </Link>
                    </ul>
                    <span className='space-15'></span>
                    {authedUser
                        ? <ul>
                            <li>Hi, {authedUser.name}</li>
                            <li className='avatar'>
                                <img className='avatar-img' alt={`${authedUser.name} avatar`} src={authedUser.avatarURL} />
                            </li>
                            <li onClick={this.handleLogout}>Logout</li>
                        </ul>
                        : <ul>
                            <li>Login to Access</li>
                        </ul>
                    }
                </div>
            </div>
        )
    }
}

function mapPropsToState({ users, authedUser }) {
    return {
        authedUser: users[authedUser]
    }
  }

export default connect(mapPropsToState)(Navbar)