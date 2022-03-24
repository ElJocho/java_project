import '../css/lobby.css';
import App_Body from './App_Body';
import React, { useState, useEffect } from 'react';
import ScrollView from '../common/ScrollView';
import PlayerElement from '../common/PlayerElement';


async function createLobby(setupData){
    return fetch(`http://localhost:8090/create_game`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(setupData)
      }).then(data => data.json())
}

async function addPlayer(player, gameId){
    return fetch(`http://localhost:8090/add_player?id=${gameId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(player)
      }).then(data => data.json())
}

async function startGame(game){
    return fetch(`http://localhost:8090/start_game`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(game)
      }).then(data => data.json())
}


export default function Lobby({ player, goToScreen, game , updateGame}) {
    const [name, setName] = useState();
    const [rounds, setRounds] = useState();
    const [maxPlayers, setMaxPlayers] = useState();
    
    const handleSubmit = async e => {
        e.preventDefault();
        const game_data_1 = await createLobby(
        {
          name: name,
          rounds: rounds,
          maxPlayers: maxPlayers,
          ownerId: player.playerId,
          isActive: false,
          winner: null
        })
        
        
        await addPlayer(player, game_data_1.gameId)
        .then(game_data=>{
            updateGame(game_data)
        });

      }
    
    const handleAddPlayer = async e => {
        await addPlayer(player, game.gameId).then(game_data=>{
            updateGame(game_data)
        })
    }

    const handleStartGame = async e => {
        await startGame(game).then(
            game_data=> updateGame(game_data)
        )
    }    

    // fixes bug in react where you can input chars in a number field..
    const handleKeyPress = async e => {
        if (!/[0-9]/.test(e.key)) {
            e.preventDefault();
        }
    }
    let player_ids = [];
    if (game !== undefined){
        for (let p of game.players){
            player_ids.push(p.playerId)
        }
    }
    return (
        
        <div>
            {
                game === undefined ? 
                <App_Body>
                    <button className="backButton" onClick={ goToScreen } screen='menu'></button>
                    <form className='lobbyForm' onSubmit={ handleSubmit }>
                        <label className='lobbyLabel'>
                            <p>Lobby Name:</p>
                            <input type="text" name="name" className='lobbyInput' maxLength="20" onChange={e => setName(e.target.value)}/>
                        </label>
                        <label className='lobbyLabel'>
                            <p>Rounds:</p>
                            <input type="number" name="rounds" min="2" max="20" className='lobbyInput' onChange={e => setRounds(e.target.value)} onKeyPress={ handleKeyPress }/>
                        </label>
                        <label className='lobbyLabel'>
                            <p>Max Players:</p>
                            <input type="number" name="players" min="1" max="8" className='lobbyInput' onChange={e => setMaxPlayers(e.target.value)} onKeyPress={ handleKeyPress }/>
                        </label>

                        <input type="submit" value="Submit" className="button_guess"/>
                    </form>
                </App_Body>
                :
                <App_Body>
                    <button className="backButton" onClick={ goToScreen } screen='menu'></button>
                    <ScrollView ListElement={ PlayerElement } itemList={ game.players }></ScrollView>
                    {
                        game.ownerId === player.playerId ?
                        <button className='button_guess' onClick={ handleStartGame }>Start Game</button>
                        :
                        !player_ids.includes(player.playerId) ?
                        <button className='button_guess' onClick={ handleAddPlayer }>Join Game</button>
                        : <p>You are already part of this Game.</p>
                    }
                </App_Body>

            }
        </div>
    );

}


