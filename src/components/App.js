import { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import LoadingBar, { hideLoading } from 'react-redux-loading'
import { getInitialData } from '../actions/shared'
import ClipLoader from "react-spinners/ClipLoader";

import Navbar from './Navbar'
import Login from './Login'
import Dashboard from './Dashboard'
import Leaderboard from './Leaderboard'
import ViewQuestion from './ViewQuestion'
import NewQuestion from './NewQuestion'
import NotFound from './NotFound'
import '../styles/App.css'

const loadingStyle = `
  position: absolute;
  top: 40%;
  left: calc(50% - 50px);
`;

class App extends Component {
  componentDidMount() {
    const { dispatch } = this.props
    dispatch(getInitialData())
      .then(() => dispatch(hideLoading()))
  }
  render() {
    const { authedUser, loading } = this.props
    return (
      <Router>
        <div>
          <Navbar />
          <LoadingBar style={{ backgroundColor: 'pink'}} />
          {loading
            ? <ClipLoader color={'silver'} loading size={100} css={loadingStyle} />
            : authedUser === null
              ? <Login />
              : <Switch>
                  <Route path='/' exact component={Dashboard} />
                  <Route path='/dashboard' component={Dashboard} />
                  <Route path='/leaderboard' exact component={Leaderboard} />
                  <Route path='/question/:id' component={ViewQuestion} />
                  <Route path='/add' component={NewQuestion} />
                  <Route component={NotFound} />
                </Switch>
          }
        </div>
      </Router>
    )
  }
}

function mapPropsToState({ users, questions, authedUser, loadingBar }) {
  return {
    users,
    questions,
    authedUser,
    loading: loadingBar.default
  }
}
export default connect(mapPropsToState)(App)