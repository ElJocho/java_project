import React, { Component } from 'react';
import logo from './images/world.png';
import './App.css';
import { slide as Menu } from 'react-burger-menu'
import App_Body from './views/App_Body'
import Map from './views/Map'
import Login from './views/Login'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalActive: false,
      token: false,
      menuScreen: true,
      login: null,
      menuOpen: false
    };

    this.setToken = this.setToken.bind(this);
    this.disableModal = this.disableModal.bind(this);
    this.activateLogin = this.activateLogin.bind(this);
    this.activateSignUp = this.activateSignUp.bind(this);
    this.logOut = this.logOut.bind(this)

  }

  handleStateChange (e) {
    this.setState({menuOpen: e.isOpen})  
  }

  logOut(e){
    this.setState({token: false})
  }

  setToken(token){
    this.setState({token: token, menuOpen: false});
  }

  disableModal = async e => {
    this.setState({modalActive: false})
  }


  onSubmitButtonClick(e){
    let coordinates = document.getElementById("coords").innerHTML
    console.log(coordinates)
  }

  activateLogin(e){
    this.setState({login: true, modalActive:true})
  }

  activateSignUp(e){
    this.setState({login: false, modalActive:true})
  }


  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>ImageGuesser</h2>
          <Menu right isOpen={ this.state.menuOpen } onStateChange={(state) => this.handleStateChange(state)}>
            <a id="home" className="menu-item" href="/">Home</a>
            {
              this.state.token == false ?
              <div style={{display:"flex", flexDirection:"column"}}>
                <button id="login" className="menu-item" onClick={this.activateLogin}>Login</button>
                <button id="signUp" className="menu-item" onClick={this.activateSignUp}>Sign Up</button>
              </div>
              :
              <button id="logOut" className="menu-item" onClick={this.logOut}>Log Out</button>
            }
          </Menu>
        </div>
        {
          this.state.menuScreen ?
          <App_Body>
            {
              this.state.token == false ?
              <div>
                <h3>Welcome to ImageGuesser, a game that is <strong>definitely</strong> not just a bootlegged GeoGuessr</h3>
                <p>Please Login or Sign up via the menu in the upper right.</p>
               </div>
              :
              <div>
                <h3>Here you can find active games.</h3>
                <h3>Here you can find open lobbies.</h3>
                <h3>Here you can find old games.</h3>
              </div>
            }

          </App_Body>

          :
          <App_Body>
            <h3>Try to guess where you are located based on the images below, then mark your position in the map.</h3>
            <img src={ require('./images/kyiv.jpg') } className="image_guess"/>
            <Map>
            </Map>
            <button className='button_guess' onClick={this.onSubmitButtonClick}>Commit Guess</button>
          </App_Body>
        }
        <p id="coordinates"></p>
        <Login setToken={this.setToken} modalActive={this.state.modalActive} disableModal={this.disableModal} isLogin={this.state.login}></Login>
     </div>
    );
  }
}

export default App;
