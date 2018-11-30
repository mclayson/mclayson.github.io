import React from 'react'
import {
  Redirect,
  Link
} from 'react-router-dom'
import {SetToken} from '../utilities/cookies'

class PageSignin extends React.Component {
  state = {
    signed_in: false,
    loading: false
  };
  SignIn = () => {
    setTimeout(()=>{
      SetToken("Im a Token");
      this.setState({signed_in: true});
    },2000);
  };

  render () {
    return (
      <section id="signin" className={this.state.loading?"loading":""}>
        <div className="card">
          <h1>welcome back</h1>
          <button className="button-sign-in load-button" disabled={this.state.loading} onClick={e=>{
            this.setState({loading: true});
            this.SignIn();
          }}><span>sign in</span><span></span></button>
          <div>
            <Link to="/signup">Need an account? Try it out!</Link>
          </div>
          {
            this.state.signed_in && (<Redirect to="/"/>)
          }
        </div>
      </section>
    );
  }
}

export default PageSignin
