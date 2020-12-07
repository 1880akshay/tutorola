import React, { Component } from "react";

export default class Error extends Component {
    componentWillUnmount() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }
    render() {
        return (
            <div style={{paddingTop: 200}}>
                <center>
                    <h1>Page not found (Error 404)</h1>
                </center>
            </div>
        )
    }
}