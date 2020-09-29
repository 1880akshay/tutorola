import React, { Component } from "react";
import { Route, Switch } from 'react-router-dom';
import Home from './screens/home';
import StudentSignup from './screens/studentSignup';
import StudentDashboard from "./screens/studentDashboard";
import TeacherSignup from './screens/teacherSignup';
import TeacherDashboard from "./screens/teacherDashboard";
import FAQ from "./screens/faq";
import About from "./screens/about";
import Error from './screens/error';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="App">
                <Navbar />
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/studentSignup" component={StudentSignup} />
                    <Route exact path="/studentDashboard" component={StudentDashboard} />
                    <Route exact path="/teacherSignup" component={TeacherSignup} />
                    <Route exact path="/teacherDashboard" component={TeacherDashboard} />
                    <Route exact path="/faq" component={FAQ} />
                    <Route exact path="/about" component={About} />
                    <Route component={Error} />
                </Switch>
                <ToastContainer 
                    position="top-center"
                    autoClose={3000}
                    hideProgressBar={true}
                    pauseOnHover={true}
                    draggable={true}
                />
                <Footer />
            </div>
        );
    }
}

export default App;
