import React, { Component } from 'react';
import logo from './images/world.png';
import './App.css';
import { slide as Menu } from 'react-burger-menu'
import App_Body from './views/App_Body'
import Map from './views/Map'
import Login from './views/Login'
import Lobby from './views/Lobby'
import ScrollView from './common/ScrollView';
import GameElement from './common/GameElement';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalActive: false,
      player: false,
      screen: "menu",
      login: null,
      menuOpen: false,
      openLobbies: [],
      activeGames: [],
      oldGames: [],
      currentGame: undefined
    };

    this.setPlayer = this.setPlayer.bind(this);
    this.disableModal = this.disableModal.bind(this);
    this.activateLogin = this.activateLogin.bind(this);
    this.activateSignUp = this.activateSignUp.bind(this);
    this.logOut = this.logOut.bind(this)
    this.goToScreen = this.goToScreen.bind(this)
    this.loadGames = this.loadGames.bind(this)
    this.goToLobby = this.goToLobby.bind(this)
    this.updateGame = this.updateGame.bind(this)
  }

  loadGames(e){
    fetch(`http://localhost:8090/get_games`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state.player)
    }).then(data => data.json()).then( games =>{
      console.log(games)

      let openLobbies = [];
      let activeGames = [];
      let oldGames = [];
      for (var game of games) {
        if (!game.active){
          openLobbies.push(game)
        }
        else if (game.winner === 0){
          activeGames.push(game)
        }
        else {
          oldGames.push(game)
        }
      }
      this.setState({oldGames: oldGames, activeGames: activeGames, openLobbies: openLobbies})
    }
    )
  }


  handleStateChange (e) {
    this.setState({menuOpen: e.isOpen})  
  }

  logOut(e){
    this.setState({player: false, screen: "menu"})
  }

  setPlayer(player){
    this.setState({player: player, menuOpen: false});
    this.loadGames()
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
  goToScreen(e){
    this.setState({screen: e.target.getAttribute('screen') })
  }
  goToLobby(e){
    console.log(e.target.getAttribute("game"))
    console.log(JSON.parse(e.target.getAttribute("game")))
    this.setState({currentGame: JSON.parse(e.currentTarget.getAttribute("game"))}, ()=>{this.setState({screen: 'lobby'})})
  }

  updateGame(game){
    this.setState({currentGame: game})
    this.loadGames()
  }


  render() {
    let current_screen;
    let startScreen =
      <App_Body>
          <h3>Welcome to ImageGuesser, a game that is <strong>definitely</strong> not just a bootlegged GeoGuessr</h3>
          <p>Please Login or Sign up via the menu in the upper right.</p>
      </App_Body>
   

    let menuSceen = 
      <App_Body>
        <button className='button_guess' onClick={this.loadGames }>Reload</button>
        <h3>Active Games.</h3>
        <ScrollView itemList={ this.state.activeGames } ListElement={ GameElement }></ScrollView>
        <div>
          <h3>Open Lobbies.</h3>
          <button className='button_guess' onClick={this.goToScreen } screen="lobby">Open Lobby</button>
          <ScrollView itemList={ this.state.openLobbies } ListElement={ GameElement } onClick={ this.goToLobby }></ScrollView>
        </div>

        <h3>Old Games.</h3>
        <ScrollView itemList={ this.state.oldGames } ListElement={ GameElement }></ScrollView>

      </App_Body>
    
    let lobbyScreen = <Lobby player={ this.state.player } goToScreen={ this.goToScreen } game={ this.state.currentGame } updateGame={ this.updateGame }></Lobby>
  

    let gameScreen =
    <App_Body>
      <h3>Try to guess where you are located based on the images below, then mark your position in the map.</h3>
      <img src={ require('./images/kyiv.jpg') } className="image_guess"/>
      <Map>
      </Map>
      <button className='button_guess' onClick={this.onSubmitButtonClick}>Commit Guess</button>
    </App_Body>

    if (this.state.player == false){
      current_screen = startScreen;
    }
    else if (this.state.screen=="menu"){
      current_screen = menuSceen
    }
    else if (this.state.screen=="lobby"){
      current_screen = lobbyScreen
    }
    else if (this.state.screen=="game"){
      current_screen = gameScreen
    }

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>ImageGuesser</h2>
          <Menu right isOpen={ this.state.menuOpen } onStateChange={(state) => this.handleStateChange(state)}>
            <a id="home" className="menu-item" href="/">Home</a>
            {
              this.state.player == false ?
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
          current_screen
        }
        <p id="coordinates"></p>
        <Login setPlayer={this.setPlayer} modalActive={this.state.modalActive} disableModal={this.disableModal} isLogin={this.state.login}></Login>
     </div>
    );
  }
}

export default App;
