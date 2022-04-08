import React, { useState, createRef, useEffect } from 'react';
import {Viewer} from 'mapillary-js'
import '../css/mapillary.css'


class Mapillary extends React.Component {
    constructor(props) {
    super(props);
    this.containerRef = React.createRef();
    }

    componentDidMount() {
    this.viewer = new Viewer({
        accessToken: this.props.accessToken,
        container: this.containerRef.current,
        imageId: this.props.imageId,
    });
    }
    componentDidUpdate(){
        this.viewer = new Viewer({
            accessToken: this.props.accessToken,
            container: this.containerRef.current,
            imageId: this.props.imageId,
        });    
    }
    componentWillUnmount() {
    if (this.viewer) {
        this.viewer.remove();
    }
    }

    render() {
    return <div ref={this.containerRef} className="mapillary_container"/>;
    }
}
  
export default Mapillary;
