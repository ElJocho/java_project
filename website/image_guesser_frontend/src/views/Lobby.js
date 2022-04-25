import '../css/lobby.css';
import App_Body from './App_Body';
import React, { useState, useEffect } from 'react';
import ScrollView from '../common/ScrollView';
import PlayerElement from '../common/PlayerElement';


async function createLobby(setupData, api_url){
    return fetch(`http://${api_url}/create_game`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(setupData)
      }).then(data => data.json())
}

async function addPlayer(player, gameId, api_url){
    return fetch(`http://${api_url}/add_player?id=${gameId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(player)
      }).then(data => data.json())
}

async function startGame(game, api_url){
    return fetch(`http://${api_url}/start_game`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(game)
      }).then(data => data.json())
}


export default function Lobby({ player, goToScreenAndChangeGame, game , updateGame, api_url}) {
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
        }, api_url)
        
        
        await addPlayer(player, game_data_1.gameId, api_url)
        .then(game_data=>{
            updateGame(game_data)
        });

      }
    
    const handleAddPlayer = async e => {
        await addPlayer(player, game.gameId, api_url).then(game_data=>{
            updateGame(game_data)
        })
    }

    const handleStartGame = async e => {
        await startGame(game, api_url).then(
            game_data=> {
                // hey its ugly, but it works :P
                updateGame(game_data)
                e.currentTarget = e.target
                e.currentTarget.setAttribute("game", JSON.stringify(game_data))
                goToScreenAndChangeGame(e)        
            }
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

    const handleUpdate = (e) =>{
        updateGame(game)
        if (game.active){
            goToScreenAndChangeGame(e)
        }
    }


    return (
        
        <App_Body>
            <button className="backButton" onClick={ goToScreenAndChangeGame } screen='menu'></button>
            {
                game===undefined ? null 
                : <button className='button_guess' onClick={ handleUpdate } screen="game" game={JSON.stringify(game)}>Reload</button>

            }

            {
                game === undefined ? 
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
                :
                    <div>
                        <h3>Lobby "{ game.name }" started by { game.players[0].name }</h3>
                        <h3>Max Players: {game.maxPlayers}</h3>
                        <h3>Rounds: { game.rounds }</h3>

                        <ScrollView ListElement={ PlayerElement } itemList={ game.players } heading="Players"></ScrollView>
                        {
                            game.ownerId === player.playerId ?
                            <button className='button_guess' onClick={ handleStartGame } screen="game">Start Game</button>
                            :
                            !player_ids.includes(player.playerId) ?
                            <button className='button_guess' onClick={ handleAddPlayer }>Join Game</button>
                            : <p>You are already part of this Game.</p>
                        }
                    </div>
            }
        </App_Body>
    );

}


