import React, { useState } from 'react';
import '../css/listElement.css';
import crown from "../images/crown.svg";

export default function PlayerElement({ element, onClick, points, winner }) {
    const round = (value, precision) => {
      var multiplier = Math.pow(10, precision || 0);
      return Math.round(value * multiplier) / multiplier;
    }  
    return(
      <div className='listElement' style={ winner===element.playerId ? { backgroundColor: "#1fb52e", backgroundImage: `url(${crown})`, backgroundRepeat: "no-repeat", backgroundSize: "45px 45px", backgroundPosition:"center" } : {}}>
        <p className='elementName'>
          { element.name }
        </p>
        <p>{points!==null ? `Points: ${round(points, 1)}` : null }</p>
      </div>
    )
  }