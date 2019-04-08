import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Redirect } from 'react-router-dom'
import RestaurantCard from './RestaurantCard'
import UserProfile from './UserProfile'


class Login extends Component {
  state = {
    username: "",
    password: "",
    redirect: false // in order to redirect to user profile
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  // use state to know when to re-direct to restaurant homepage
    setRedirect = () => {
      this.setState({
        redirect: true
      })
    }

    //listening in render() for changed state
    renderRedirect = () => {
        if (this.state.redirect) {
          return <Redirect to='/UserProfile' />
        }
      }

  login = (e) => {
    e.preventDefault()
    if (this.state.username !== "" || this.state.password !== "") {
      this.loginUser(this.state.username, this.state.password)
    }
  }

  loginUser = (username, password) => {
    console.log("will log in user", username, password);
    fetch("http://localhost:3000/api/v1/users")
    .then(res => res.json())
    .then( json => {
    let login_user = json.find( user => user.username === username)
      if (login_user.password === password) {
        console.log("success!")
        this.props.dispatch({ type: "LOGIN_USER", payload: login_user })
        this.props.dispatch({ type: "LOGIN_USER_TYPE", payload: "user" })
        this.setRedirect()
      }
    })
  }

  renderLoginForm = () => {
  return (
    <div className="login">
      <form onSubmit={this.login}>
        <label>Username: </label>
          <br/>
        <input onChange={this.handleChange} type="text"  name="username" value={this.state.username}/><br />
          <br />
        <label>Password: </label>
          <br />
        <input onChange={this.handleChange} type="password"  name="password" value={this.state.password}/><br />
          <br />
          <br />
        <button type="submit">Submit</button>
          <br />
          <br />
        Dont have an account? <NavLink to="/SignUp"> Sign Up Here </NavLink>
          <br />
        ATTN: RESTAURANTS! Interested in working with us?
        <NavLink to="/RestaurantSignUp"> Register with us here </NavLink>
        <NavLink to="/RestaurantLogin"> Restaurant Login</NavLink>
      </form>
      {
        this.props.errorLogin ?
        <p>Invalid Username or Password</p>
        :
        null
      }
    </div>
  )
}

render () {
  return (
    <div>
      <h1> Login </h1>
      {this.renderLoginForm()}
      {this.renderRedirect()}
    </div>
  )
}

}
export default connect()(Login)
