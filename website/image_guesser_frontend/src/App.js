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
      token: null
    };
    this.activateModal = this.activateModal.bind(this);
    this.setToken = this.setToken.bind(this);
    this.disableModal = this.disableModal.bind(this);


  }

  activateModal(e){
    this.setState({modalActive: true})
  }

  onLoginButtonClick(e){

  }

  onSignupButtonClick(e){

  }
  setToken(token){
    this.state.token = token;
  }
  disableModal = async e => {
    this.setState({modalActive: false})
  }


  onSubmitButtonClick(e){
    let coordinates = document.getElementById("coords").innerHTML
    console.log(coordinates)
  }

  render() {

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>ImageGuesser</h2>
          <Menu right>
            <a id="home" className="menu-item" href="/">Home</a>
            <button id="login" className="menu-item" onClick={this.activateModal}>Login</button>
            <button id="signUp" className="menu-item">Sign Up</button>

          </Menu>
        </div>
        <App_Body>
          <h3>Welcome to ImageGuesser, a game that is <strong>definitely</strong> not just a bootlegged GeoGuessr</h3>
          <img src={ require('./images/kyiv.jpg') } className="image_guess"/>
          <Map>
          </Map>
          <button className='button_guess' onClick={this.onSubmitButtonClick}>Commit Guess</button>
        </App_Body>
        <p id="coordinates"></p>
        <Login setToken={this.setToken} modalActive={this.state.modalActive} disableModal={this.disableModal}></Login>
     </div>
    );
  }
}

export default App;
