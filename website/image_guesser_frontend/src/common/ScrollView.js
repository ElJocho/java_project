import React, { useState } from 'react';
import '../css/scrollView.css';


export default function ScrollView({ itemList, onClick, ListElement, screen, heading }) {
      const [isCollapsed, setCollapsed] = useState(true)

     const toggleCollapse = (e) => {
        /*
        collapseList = document.getElementById("collapseList")
        console.log(collapseList)
        if (isCollapsed) {
          collapseList.style.setAttribute("display","flex");
          setCollapsed(false)
        }
        else {
          collapseList.style.setAttribute("display","none");
          setCollapsed(true)
        }*/
      }
      return(
      <div className="scrollView">
        <div className="headingContainer" onClick={ toggleCollapse }>
          <h3>{ heading }</h3>
        </div>
        <div className="collapseList" id="collapseList">
          {itemList.map(function(element, idx){
          return (<ListElement element={ element } onClick={ onClick } key={ idx } screen={ screen }></ListElement>)
         })}
        </div>
      </div>
    )
  }