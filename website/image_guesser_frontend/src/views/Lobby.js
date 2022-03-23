import '../css/lobby.css';
import App_Body from './App_Body';
import React, { useState } from 'react';


async function createLobby(setupData){
    return fetch(`http://localhost:8090/create_game`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(setupData)
      }).then(data => data.json())
}

export default function Lobby({ player, goToScreen }) {
    const [name, setName] = useState();
    const [rounds, setRounds] = useState();
    const [maxPlayers, setMaxPlayers] = useState();

    const handleSubmit = async e => {
        e.preventDefault();
        const game = await createLobby(
        {
          name: name,
          rounds: rounds,
          maxPlayers: maxPlayers,
          ownerId: player.playerId,
          isActive: false
        });
      }
    
    // fixes bug in react where you can input chars in a number field..
    const handleKeyPress = async e => {
        if (!/[0-9]/.test(e.key)) {
            e.preventDefault();
        }
    }

    return (
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
    );

}


