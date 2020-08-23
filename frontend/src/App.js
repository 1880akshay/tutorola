import React, { Component } from "react";
import { Route, Switch } from 'react-router-dom';
import Home from './screens/home';
import SignUp from './screens/signup';
import Error from './screens/error';

const api = 'http://localhost:9000';

class App extends Component {
    constructor(props) {
        super(props);
        //this.state = { apiResponse: "" };
        this.state = {};
    }

    /* callAPI() {
        fetch(api+'/')
            .then(res => res.text())
            .then(res => this.setState({ apiResponse: res }))
            .catch(err => err);
    }

    componentDidMount() {
        this.callAPI();
    } */

    render() {
        return (
            <div className="App">
                <Switch>
                    <Route path="/" component={Home} exact />
                    <Route path="/signup" component={SignUp} />
                    <Route component={Error} />
                </Switch>
            </div>
        );
    }
}

export default App;
