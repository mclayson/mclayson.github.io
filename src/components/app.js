import React from 'react'
// import { TransitionGroup, CSSTransition } from "react-transition-group";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'
import PageDashboard from './page-dashboard'
import PageProjects from './page-projects'
import PageSchedule from './page-schedule'
import PageSetup from './page-setup'
// import PageCalendar from './page-calendar'
// import PageGantt from './page-gantt'
import PageSignin from './page-signin'
import PageSignup from './page-signup'
import Header from './header'
import Footer from './footer'
import {GetToken, GetSetup, ClearSetup, ClearToken} from '../utilities/cookies'
import {HOMEPAGE} from '../config/config'
import LoadingAnimation from '../assets/images/loading-animation.gif'

// App
// handles all of the main page routing


class App extends React.Component {
  state = {
    hide_load: false,
    modal_state: ""
  }
  componentDidMount() {
    setTimeout(()=>{
      this.setState({hide_load: 1});
      setTimeout(()=>{
        this.setState({hide_load: 2});
      }, 750);
    }, 2000);
    window.openModal = (modal_object) => {
      this.setState({
        modal: modal_object
      });
      setTimeout(()=>{
        this.setState({modal_state: "show"});
      }, 50);
    }
    window.closeModal = () => {
      this.setState({modal_state: ""});
      setTimeout(()=>{
        this.setState({
          modal: null
        });
      }, 750);
    }
    // Create a new style element
    const el = document.createElement('style');
    el.type = 'text/css';

    // Add it to the head of the document
    const head = document.querySelector('head');
    head.appendChild(el);

    // At some future point we can totally redefine the entire content of the style element
    window.setStyle = (newStyles) => {
      el.innerHTML = newStyles;
    };

  }

  render () {

  return (
  <Router>
    <Route render={({ location }) => (
      <div id="app">
        <div id="loading-screen" className={(this.state.hide_load?"":"show") + (this.state.hide_load>1?"hide":"")}>
          <img src={LoadingAnimation} alt="Projul Loading Animation" />
        </div>
        { this.state.modal ? (
          <div id="modal-container" className={this.state.modal_state}>{this.state.modal}</div>
        ) : [] }
        <Header />
        <main>
          {this.state.hide_load && (
          <Switch location={location}>

            <Route path="/signout" exact={true} render={() => (
              ClearToken() &&
                <Redirect to="/signin"/>
            )} />

            {!GetSetup() && GetToken() &&
              <Route path="/" render={() => (
                <PageSetup />
              )} />
            }

            <Route path="/setup" exact={true} render={() => (
              ClearSetup() &&
                <Redirect to="/"/>
            )} />

            <Route path="/signup" exact={true} render={() => {
              return GetToken() ? (
                <Redirect to="/"/>
              ) : (
                <PageSignup />
              )}
            } />

            <Route path="/signin" exact={true} render={() => {
              return GetToken() ? (
                <Redirect to="/"/>
              ) : (
                <PageSignin />
              )}
            } />

            <Route path="/" exact={true} render={() => {
              return GetToken() ? (
                <Redirect to={HOMEPAGE}/>
              ) : (
                <Redirect to="/signin"/>
              )}
            } />

            <Route path="/dashboard" exact={true} render={() => {
              return GetToken() ? (
                <PageDashboard />
              ) : (
                <Redirect to="/signin"/>
              )}
            } />

            <Route path="/projects" exact={true} render={() => {
              return GetToken() ? (
                <PageProjects />
              ) : (
                <Redirect to="/signin"/>
              )}
            } />

            <Route path="/schedule" exact={true} render={() => {
              return GetToken() ? (
                <PageSchedule />
              ) : (
                <Redirect to="/signin"/>
              )}
            } />



            <Route path="/ah-geez-404" exact={true} render={() => (
              <div>
                <h1>{"404"}</h1>
                <h2>{"Your request could not be found."}</h2>
              </div>
            )} />
            <Route render={() => (
              <Redirect to="/ah-geez-404"/>
            )} />
          </Switch>
          )}
        </main>
        <Footer />
      </div>
      )}
    />
  </Router>
)
}
}

export default App
