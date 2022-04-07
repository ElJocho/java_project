import React, { useState, createRef, useEffect } from 'react';
import {Viewer} from 'mapillary-js'
import '../css/mapillary.css'

export default function Mapillary({imageId, accessToken}) {
    let containerRef = createRef();

    
    useEffect(() => {
        let viewer = new Viewer({
            accessToken: accessToken,
            container: containerRef.current,
            imageId: imageId,
        });
    }, [])


    return (
        <div ref={containerRef} className="mapillary_container" />
    );
  }