import React, { Component } from "react";
import { Route, Switch } from 'react-router-dom';
import $ from 'jquery';
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
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'
import StudentProfile from "./screens/studentProfile";
import Courses from "./screens/courses";
import CourseInfo from './screens/courseInfo';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            oldPassword: '',
            newPassword: '',
            confirmPassword: ''
        };
    }

    componentDidMount() {
        var Password = document.getElementById("newpass");
        var ConfirmPassword = document.getElementById("confirmpass");
        Password.onchange = Confirm;
        ConfirmPassword.onchange = Confirm;
        function Confirm() {
            ConfirmPassword.setCustomValidity("");
            if (Password.value !== ConfirmPassword.value) {
                ConfirmPassword.setCustomValidity("Passwords do not match.");
            }
        }
    }

    componentWillMount() {
        var token = localStorage.getItem('token');
        if(token) {
            fetch('/api/login/checkTokenStatus', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({token})
            })
            .then(res => res.json())
            .then(data => {
                if(data.status === 'success') {
                    this.setState({id: data.info.id});
                }
            })
        }
    }
    
    /* componentWillUpdate() {
        var token = localStorage.getItem('token');
        if(token) {
            fetch('/api/login/checkTokenStatus', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({token})
            })
            .then(res => res.json())
            .then(data => {
                if(data.status === 'success') {
                    this.setState({id: data.info.id});
                }
            })
        }
    } */

    changePassword = (e) => {
        e.preventDefault();
        $('#cp-button').attr('disabled', 'true');
        $('#cp-button').css('opacity', '0.7');
        fetch('/api/profile/changePassword', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({id: this.state.id, oldPassword: this.state.oldPassword, newPassword: this.state.newPassword})
        })
        .then(res => res.json())
        .then(data => {
            $('#cp-button').removeAttr('disabled');
            $('#cp-button').css('opacity', '1');
            $('#pass-modal-close').click();
            this.setState({oldPassword: '', newPassword: '', confirmPassword: ''});
            if(data.status==='success') {
                toast.info('✔ Password changed successfully');
            }
            else if(data.status==='failure2') {
                toast.info('✖ Wrong Password');
            }
            else {
                toast.info('✖ An error occurred');
            }
        })
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

                    <Route exact path="/studentProfile" component={StudentProfile} />
                    <Route exact path="/courses" component={Courses} />
                    <Route exact path="/courseInfo" component={CourseInfo} />
                    <Route component={Error} />
                </Switch>
                <Footer />
                <ToastContainer 
                    position="top-center"
                    autoClose={3000}
                    hideProgressBar={true}
                    pauseOnHover={true}
                    draggable={true}
                />
                <div className="modal fade" id="password-modal">
                    <div className="modal-dialog">
                        <div className="modal-content">

                        {/*Modal Header*/}
                        <div className="modal-header">
                            <h4 className="modal-title text-dark">Change Password</h4>
                            <button type="button" id="pass-modal-close" className="close" data-dismiss="modal">&times;</button>
                        </div>

                        {/*Modal body*/}
                        <div className="modal-body px-5 pb-5">
                            <form onSubmit={this.changePassword}>
                                <div style={{position: 'relative'}}>
                                    <div><label htmlFor="oldpass" className="profile-input-label">Old Password</label></div>
                                    <input type="password" id="oldpass" className="profile-input-box change-pass-input" value={this.state.oldPassword} onChange={(e) => this.setState({oldPassword: e.target.value})} required></input>
                                    <span className="fa fa-eye input-icon-right" id="cpeye1" onClick={() => {
                                        $('#cpeye1').toggleClass('fa-eye');
                                        $('#cpeye1').toggleClass('fa-eye-slash');
                                        var input = $('#oldpass');
                                        if(input.attr('type') === 'password') {
                                            input.attr('type', 'text');
                                        }
                                        else {
                                            input.attr('type', 'password');
                                        }
                                    }}></span>
                                </div>
                                <div style={{position: 'relative'}}>
                                    <div><label htmlFor="newpass" className="profile-input-label">New Password</label></div>
                                    <input type="password" id="newpass" className="profile-input-box change-pass-input" value={this.state.newPassword} onChange={(e) => this.setState({newPassword: e.target.value})} required></input>
                                    <span className="fa fa-eye input-icon-right" id="cpeye2" onClick={() => {
                                        $('#cpeye2').toggleClass('fa-eye');
                                        $('#cpeye2').toggleClass('fa-eye-slash');
                                        var input = $('#newpass');
                                        if(input.attr('type') === 'password') {
                                            input.attr('type', 'text');
                                        }
                                        else {
                                            input.attr('type', 'password');
                                        }
                                    }}></span>
                                </div>
                                <div style={{position: 'relative'}}>
                                    <div><label htmlFor="confirmpass" className="profile-input-label">Confirm New Password</label></div>
                                    <input type="password" id="confirmpass" className="profile-input-box change-pass-input" value={this.state.confirmPassword} onChange={(e) => this.setState({confirmPassword: e.target.value})} required></input>
                                    <span className="fa fa-eye input-icon-right" id="cpeye3" onClick={() => {
                                        $('#cpeye3').toggleClass('fa-eye');
                                        $('#cpeye3').toggleClass('fa-eye-slash');
                                        var input = $('#confirmpass');
                                        if(input.attr('type') === 'password') {
                                            input.attr('type', 'text');
                                        }
                                        else {
                                            input.attr('type', 'password');
                                        }
                                    }}></span>
                                </div>
                                <button className="btn btn-primary w-100 mt-4" id="cp-button">Change Password</button>
                            </form>
                        </div>

                        {/*Modal footer
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                        </div>*/}

                        </div>
                    </div>
                </div>
                
            </div>
        );
    }
}

export default App;
