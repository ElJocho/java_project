import React, { useState } from 'react';
import '../css/scrollView.css';


export default function ScrollView({ itemList, onClick, ListElement, screen}) {
    return(
      <div className="scrollView">
        {itemList.map(function(element, idx){
         return (<ListElement element={ element } onClick={ onClick } key={ idx } screen={ screen }></ListElement>)
       })}
      </div>
    )
  }