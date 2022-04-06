import React, { useState } from 'react';
import '../css/listElement.css';


export default function GameElement({ element, onClick }) {
    
    return(
      <div className='listElement'>
        <p className='elementName'>
          { element.username }
        </p>
      </div>
    )
  }