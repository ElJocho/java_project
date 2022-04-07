import '../css/game.css';
import App_Body from './App_Body';
import React, { useState, useEffect } from 'react';
import ScrollView from '../common/ScrollView';
import PlayerElement from '../common/PlayerElement';
import Map from './Map';
import Mapillary from '../common/Mapillary'

async function createLobby(setupData){
    return fetch(`http://localhost:8090/create_game`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(setupData)
      }).then(data => data.json())
}


export default function Game({ player, goToScreen, game , updateGame}) {
    const onSubmitButtonClick = (e) => {
        let coordinates = document.getElementById("coords").innerHTML
        console.log(coordinates)
      }
    
    let player_ids = [];
    if (game !== undefined){
        for (let p of game.players){
            player_ids.push(p.playerId)
        }
    }
    return (
        <App_Body>
            <button className="backButton" onClick={ goToScreen } screen='menu'></button>
            <ScrollView ListElement={ PlayerElement } itemList={ game.players }></ScrollView>
            <h3>Try to guess where you are located based on the images below, then mark your position in the map.</h3>
            <Mapillary accessToken={'MLY|4966815033432372|521aed7230a3de1142329014c1061d7d'} imageId={34251232}></Mapillary>
            
            <img src={ require('../images/kyiv.jpg') } className="image_guess"/>
            <Map>
            </Map>
            <button className='button_guess' onClick={ onSubmitButtonClick }>Commit Guess</button>

        </App_Body>
            
    );

}


