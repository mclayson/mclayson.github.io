import React from 'react'
import {
  Redirect,
  Link
} from 'react-router-dom'
import {SetToken} from '../utilities/cookies'

class PageSignup extends React.Component {
  state = {
    signed_up: false,
    loading: false,
    name: "",
    email: "",
    password: "",
    password_confirmed: ""
  };
  SignUp = () => {
    setTimeout(()=>{
      SetToken("Im a Token");
      this.setState({signed_up: true});
    },2000);
  };

  HandleChange = (event) => {
    let state = {};
    state[event.target.name] = event.target.value;
    this.setState(state);
  }

  HandleSubmit = (event) => {
      console.log("SUBMIT");
      event.preventDefault();
      this.setState({loading: true});
      this.SignUp();
  }

  Validate = () => {
    return this.state.name !== "" &&
    this.state.email !== "" &&
    this.state.password !== "" &&
    this.state.password_confirmed !== "" &&
    this.state.password_confirmed === this.state.password
  }

  render () {
    return (
      <section id="signup" className={this.state.loading?"loading":""}>
        <div className="card">
          <h1>try projul out for <strong>free</strong></h1>
          <form onSubmit={this.HandleSubmit}>
            <div>
              <input name="name" type="text" placeholder="full name" value={this.state.name} onChange={this.HandleChange} />
            </div>
            <div>
              <input name="email" type="email" placeholder="email" value={this.state.email} onChange={this.HandleChange} />
            </div>
            <div>
              <input name="password" type="password" placeholder="password" value={this.state.password} onChange={this.HandleChange} />
            </div>
            <div>
              <input name="password_confirmed" type="password" placeholder="confirm password" value={this.state.password_confirmed} onChange={this.HandleChange} />
            </div>
            <button className="button-sign-up load-button"
              disabled={
                this.state.loading ||
                !this.Validate()
              }
            ><span>{"it's that easy"}</span><span></span></button>
          </form>
          <div>
            <Link to="/signin">Have an account? Sign in!</Link>
          </div>
          {
            this.state.signed_up && (<Redirect to="/"/>)
          }
        </div>
      </section>
    );
  }
}

export default PageSignup
