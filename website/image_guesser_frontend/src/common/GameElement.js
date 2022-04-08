import React, { useState } from 'react';
import '../css/listElement.css';


export default function GameElement({ element, onClick, screen }) {
    
    return(
      <div className='listElement' game={ JSON.stringify(element) } onClick= { onClick } screen={ screen }>
        <p className='elementName'>
          { element.name }
        </p>
        <div className="flex-row">
          <div className='turnIcon'></div>
          <p>{ element.cities.length }/{ element.rounds }</p>
        </div>
        <div className="flex-row">
          <div className='playerIcon'></div>
          <p>{ element.players.length }/{ element.maxPlayers }</p>
        </div>
      </div>
    )
  }