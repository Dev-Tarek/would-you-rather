import { Component } from "react"
import { connect } from "react-redux"
import { hideLoading, LoadingBar } from "react-redux-loading-bar";
import { getInitialData } from "../actions/shared";
import Login from "./Login";

class App extends Component {
  componentDidMount() {
    const { dispatch } = this.props
    dispatch(getInitialData())
      .then(() => dispatch(hideLoading()))
  }
  render() {
    const { authedUser } = this.props
    return (
      <div className="App">
        <LoadingBar />
        {this.props.authedUser === null
          ? <Login />
          : <h3>{authedUser}</h3>
        }
      </div>
    );
  }
}

function mapPropsToState({ users, questions, authedUser }) {
  return {
    users,
    questions,
    authedUser
  }
}
export default connect(mapPropsToState)(App)