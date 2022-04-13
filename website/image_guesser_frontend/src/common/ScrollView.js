import React, { useState } from 'react';
import '../css/scrollView.css';


export default function ScrollView({ itemList, onClick, ListElement, screen, heading, points }) {
      const [isCollapsed, setCollapsed] = useState(true)

     const toggleCollapse = (e) => {
        if (isCollapsed) {
          setCollapsed(false)
        }
        else {
          setCollapsed(true)
        }
      }
      return(
      <div className="scrollView">
        <div className="headingContainer" onClick={ toggleCollapse }>
          <h3>{ heading }</h3>
        </div>
        {isCollapsed ? null :
          <div className="collapseList" id="collapseList">
          {itemList.map(function(element, idx){
          return (<ListElement element={ element } onClick={ onClick } key={ idx } screen={ screen } points={ points ? points[idx]: null }></ListElement>)
        })}
        </div>

        }
      </div>
    )
  }