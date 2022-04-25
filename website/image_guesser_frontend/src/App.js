import React, { Component } from 'react';
import logo from './images/world.png';
import './App.css';
import { slide as Menu } from 'react-burger-menu';
import App_Body from './views/App_Body';
import Login from './views/Login';
import Lobby from './views/Lobby';
import ScrollView from './common/ScrollView';
import GameElement from './common/GameElement';
import Game from './views/Game';

class App extends Component {
  constructor(props) {
    super(props);
    this.api_url = "localhost:8080";


    this.state = {
      modalActive: false,
      player: false,
      screen: "menu",
      login: null,
      menuOpen: false,
      openLobbies: [],
      activeGames: [],
      oldGames: [],
      apiKey: null,
      currentGame: undefined
    };
    this.setPlayer = this.setPlayer.bind(this);
    this.disableModal = this.disableModal.bind(this);
    this.activateLogin = this.activateLogin.bind(this);
    this.activateSignUp = this.activateSignUp.bind(this);
    this.logOut = this.logOut.bind(this)
    this.loadGames = this.loadGames.bind(this)
    this.updateGame = this.updateGame.bind(this)
    this.getApiKey = this.getApiKey.bind(this)
    this.goToScreenAndChangeGame = this.goToScreenAndChangeGame.bind(this)
  }

  componentWillMount() {
    this.getApiKey();

  }
  getApiKey(){
    fetch(`http://${this.api_url}/get_key`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(data => data.text()).then(
        data=>{
          this.state.apiKey = data
        }
      )
  }

  loadGames(new_game=null){
    fetch(`http://${this.api_url}/get_games`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state.player)
    }).then(data => data.json()).then( games =>{

      let openLobbies = [];
      let activeGames = [];
      let oldGames = [];
      for (var game of games) {
        // update game with reloaded game
        if (new_game!==null){
          if (game.id === new_game.id){
            new_game=game;
          }
        }

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
      this.setState({oldGames: oldGames, activeGames: activeGames, openLobbies: openLobbies, currentGame: new_game})
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

  activateLogin(e){
    this.setState({login: true, modalActive:true})
  }

  activateSignUp(e){
    this.setState({login: false, modalActive:true})
  }

  goToScreenAndChangeGame(e){
    let nextGame = undefined

    if (! (e.currentTarget.getAttribute('game') === null)){
      nextGame = JSON.parse(e.currentTarget.getAttribute('game'))
    }

    this.setState({
      screen: e.currentTarget.getAttribute('screen'),
      currentGame: nextGame
    })
  }

  updateGame(game){
    this.loadGames(game)
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
        <ScrollView heading="Active Games" itemList={ this.state.activeGames } ListElement={ GameElement } onClick={ this.goToScreenAndChangeGame} screen="game"></ScrollView>
        <div>
          <ScrollView heading="Open Lobbies" itemList={ this.state.openLobbies } ListElement={ GameElement } onClick={ this.goToScreenAndChangeGame } screen="lobby"></ScrollView>
          <button className='button_guess' onClick={this.goToScreenAndChangeGame } currentGame={ null } screen='lobby'>Open Lobby</button>
        </div>
        <ScrollView heading="Old Games" itemList={ this.state.oldGames } ListElement={ GameElement } onClick={ this.goToScreenAndChangeGame} screen="game"></ScrollView>
      </App_Body>
    
    let lobbyScreen = <Lobby api_url={ this.api_url } player={ this.state.player } goToScreenAndChangeGame={ this.goToScreenAndChangeGame } game={ this.state.currentGame } updateGame={ this.updateGame }></Lobby>
  

    let gameScreen = <Game api_url={ this.api_url } player={ this.state.player} game={ this.state.currentGame } apiKey={ this.state.apiKey } goToScreenAndChangeGame={ this.goToScreenAndChangeGame } updateGame={this.updateGame}></Game>

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
        <Login api_url={ this.api_url } setPlayer={this.setPlayer} modalActive={this.state.modalActive} disableModal={this.disableModal} isLogin={this.state.login}></Login>
     </div>
    );
  }
}

export default App;
