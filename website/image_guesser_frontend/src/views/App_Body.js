import { Component } from 'react';
import '../css/body.css';
import React from 'react';
class App_Body extends Component {
    render() {
        return (
            <div className="outerBody">
                <div className="innerBody">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default App_Body;