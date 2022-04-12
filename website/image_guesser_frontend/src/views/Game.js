import '../css/game.css';
import App_Body from './App_Body';
import React, { useState, useEffect } from 'react';
import ScrollView from '../common/ScrollView';
import PlayerElement from '../common/PlayerElement';
import Map from './Map';
import Mapillary from '../common/Mapillary'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';


async function createLobby(setupData){
    return fetch(`http://localhost:8090/create_game`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(setupData)
      }).then(data => data.json())
}


export default function Game({ player, goToScreenAndChangeGame, game , updateGame, apiKey}) {
    const onSubmitButtonClick = (e) => {
        let coordinates = document.getElementById("coords").innerHTML.split(' ')

        return fetch(`http://localhost:8090/commit_guess?player_id=${player.playerId}&x=${coordinates[0]}&y=${coordinates[1]}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(game)
          }).then(data => data.json()).then(data=> {
                updateGame(data);
            })
    }
    
    let player_ids = [];
    if (game !== undefined){
        for (let p of game.players){
            player_ids.push(p.playerId)
        }
    }

    return (
        <App_Body>
            
            <div>
                <button className="backButton" onClick={ goToScreenAndChangeGame } screen='menu'></button>
                <ScrollView ListElement={ PlayerElement } itemList={ game.players }></ScrollView>
                <h3>Try to guess where you are located, then mark your position in the map.</h3>
                <Carousel className="Map_Carousel" infiniteLoop={true} showStatus={false}>
                    <Mapillary accessToken={ apiKey } imageId={game.images.at(-3)}></Mapillary>
                    <Mapillary accessToken={ apiKey } imageId={game.images.at(-2)}></Mapillary>
                    <Mapillary accessToken={ apiKey } imageId={game.images.at(-1)}></Mapillary>
                </Carousel>
                
                <Map>
                </Map>
                <button className='button_guess' onClick={ onSubmitButtonClick }>Commit Guess</button>
            </div>

        </App_Body>
            
    );

}


