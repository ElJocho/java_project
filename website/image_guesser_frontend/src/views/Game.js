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


export default function Game({ player, goToScreenAndChangeGame, game , updateGame, apiKey }) {


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
    let points = null;


    let isFinished=!game.points.includes(-1)


    if (game.cities.length>1){
        let point_clone = JSON.parse(JSON.stringify(game.points))
        let no_players = game.players.length;
        points = new Array(no_players).fill(0);
        while(point_clone.length> (isFinished ? 0 : no_players)){
            for (let x = 0; x<game.players.length; x++){
                let p = point_clone.shift()
                points[x] += p
            }
        }
    }

    const handleUpdate = () =>{
        updateGame(game)
    }


    return (

        <App_Body>
                <button className="backButton" onClick={ goToScreenAndChangeGame } screen='menu'></button>
                <button className='button_guess' onClick={ handleUpdate }>Reload</button>

                <ScrollView ListElement={ PlayerElement } itemList={ game.players } heading="Players" points={ points } winner={ isFinished? game.winner:null }></ScrollView>
                {game.cities.length>1? <ScrollView heading="Cities" ListElement={ PlayerElement } itemList={ isFinished? game.cities: game.cities.slice(0,-1) } winner={null} points={null}></ScrollView>:null}
            {
                isFinished
                ? null
                :
            
                <div>
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
            }
        </App_Body>
            
    );

}


