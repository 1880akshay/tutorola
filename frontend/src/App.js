import React, { Component } from "react";
import { Route, Switch } from 'react-router-dom';
import Home from './screens/home';
//import StudentSignUp from './screens/studentSignup';
//import TeacherSignUp from './screens/teacherSignup';
//import StudentDashboard from './screens/studentDashboard';
//import TeacherDashboard from './screens/teacherDashboard';
import Error from './screens/error';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="App">
                <Switch>
                    <Route path="/" component={Home} exact />
                    {/* <Route path="/studentSignup" component={StudentSignUp} />
                    <Route path="/teacherSignup" component={TeacherSignUp} />
                    <Route path="/studentDashboard" component={StudentDashboard} />
                    <Route path="/teacherDashboard" component={TeacherDashboard} /> */}
                    <Route component={Error} />
                </Switch>
            </div>
        );
    }
}

export default App;
