import React, { Component } from "react";
import $ from 'jquery';
import '../css/opensans-font.css';
import '../css/signup.css';

const api = 'http://localhost:9000';

export default class StudentSignUp extends Component {
    state = {
        signupName: '',
        signupEmail: '',
        signupPhoneNumber: '',
        signupUsername: '',
        signupPassword: '',
        loginUsername: '',
        loginPassword: '',

        checkEmail: 0,
        checkPhoneNumber: 0,
        checkUsername: 0
    }

    componentDidMount() {
        $('.login-head').click(function() {
			$('.page-signup').fadeOut('fast', function() {
				$('.page-login').fadeIn('fast');
			});

			$('.signup-head').removeClass('head-active');
			$('.login-head').addClass('head-active');
		});
		$('.signup-head').click(function() {
			$('.page-login').fadeOut('fast', function() {
				$('.page-signup').fadeIn('fast');
			});
			$('.signup-head').addClass('head-active');
			$('.login-head').removeClass('head-active');
		});

		$('#eye1').click(function() {
			$('#eye1').toggleClass('fa-eye');
			$('#eye1').toggleClass('fa-eye-slash');
			var input = $('#password');
			if(input.attr('type') === 'password') {
				input.attr('type', 'text');
			}
			else {
				input.attr('type', 'password');
			}
		});
		$('#eye2').click(function() {
			$('#eye2').toggleClass('fa-eye');
			$('#eye2').toggleClass('fa-eye-slash');
			var input = $('#confirmPassword');
			if(input.attr('type') === 'password') {
				input.attr('type', 'text');
			}
			else {
				input.attr('type', 'password');
			}
		});
		$('#eye3').click(function() {
			$('#eye3').toggleClass('fa-eye');
			$('#eye3').toggleClass('fa-eye-slash');
			var input = $('#passwordl');
			if(input.attr('type') === 'password') {
				input.attr('type', 'text');
			}
			else {
				input.attr('type', 'password');
			}
        });
        
        var Password = document.getElementById("password");
        var ConfirmPassword = document.getElementById("confirmPassword");
        Password.onchange = Confirm;
        ConfirmPassword.onchange = Confirm;
        function Confirm() {
            ConfirmPassword.setCustomValidity("");
            if (Password.value !== ConfirmPassword.value) {
                ConfirmPassword.setCustomValidity("Passwords do not match.");
            }
        }
    }

    isEmail = () => {
        var email = document.getElementById('email')
        if(email.checkValidity()) {
            fetch(api+'/login/studentIsEmail', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({email: this.state.signupEmail})
            })
            .then(res => res.json())
            .then(data => {
                if(data.status === 'available') {
                    $('#emailCheck2').hide();
                    $('#emailCheck').show();
                    $('#emailCheck').attr('title', 'Email available');
                    this.setState({checkEmail: 1});
                }
                else {
                    $('#emailCheck').hide();
                    $('#emailCheck2').show();
                    $('#emailCheck2').attr('title', 'Email already exists');
                    this.setState({checkEmail: 0});
                }
            })
        }
        else {
            $('#emailCheck').hide();
            $('#emailCheck2').show();
            $('#emailCheck2').attr('title', 'Please match the requested format');
        }
    }

    isPhoneNumber = () => {
        var phoneNumber = document.getElementById('phoneNumber')
        if(phoneNumber.checkValidity()) {
            fetch(api+'/login/studentIsPhoneNumber', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({phoneNumber: this.state.signupPhoneNumber})
            })
            .then(res => res.json())
            .then(data => {
                if(data.status === 'available') {
                    $('#phoneNumberCheck2').hide();
                    $('#phoneNumberCheck').show();
                    $('#phoneNumberCheck').attr('title', 'Phone number available');
                    this.setState({checkPhoneNumber: 1});
                }
                else {
                    $('#phoneNumberCheck').hide();
                    $('#phoneNumberCheck2').show();
                    $('#phoneNumberCheck2').attr('title', 'Phone number already exists');
                    this.setState({checkPhoneNumber: 0});
                }
            })
        }
        else {
            $('#phoneNumberCheck').hide();
            $('#phoneNumberCheck2').show();
            $('#phoneNumberCheck2').attr('title', 'Please match the requested format');
        }
    }

    isUsername = () => {
        var username = document.getElementById('username')
        if(username.checkValidity()) {
            fetch(api+'/login/studentIsUsername', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({username: this.state.signupUsername})
            })
            .then(res => res.json())
            .then(data => {
                if(data.status === 'available') {
                    $('#usernameCheck2').hide();
                    $('#usernameCheck').show();
                    $('#usernameCheck').attr('title', 'Username available');
                    this.setState({checkUsername: 1});
                }
                else {
                    $('#usernameCheck').hide();
                    $('#usernameCheck2').show();
                    $('#usernameCheck2').attr('title', 'Username already exists');
                    this.setState({checkUsername: 0});
                }
            })
        }
        else {
            $('#usernameCheck').hide();
            $('#usernameCheck2').show();
            $('#usernameCheck2').attr('title', 'Username cannot be empty');
        }
    }

    signupSubmitHandler = (e) => {
        e.preventDefault();
        if(this.state.checkEmail && this.state.checkPhoneNumber && this.state.checkUsername) {
            var user = {
                name: this.state.signupName,
                email: this.state.signupEmail,
                phoneNumber: this.state.signupPhoneNumber,
                username: this.state.signupUsername,
                password: this.state.signupPassword
            }
            fetch(api+'/login/studentSignup', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(user)
            })
            .then(res => res.json())
            .then(data => {
                if(data.status === 'success') {
                    if(!alert('Account created successfully')) window.location.reload();
                }
                else {
                    if(!alert('An error occurred! Please try again')) window.location.reload();
                }
            })
        }
    }

    loginSubmitHandler = (e) => {
        e.preventDefault();
        fetch(api+'/login/studentLogin', {
            method: 'POST', 
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({username: this.state.loginUsername, password: this.state.loginPassword})
        })
        .then(res => res.json())
        .then(data => {
            if(data.status === 'success') {
                this.props.history.push('/studentDashboard');
            }
            else {
                if(!alert('Invalid credentials')) window.location.reload();
            }
        })
    }

    render() {
        return (
            <div className="page-content">
                <div className="form-v7-content">
                    <div className="form-left">
                        
                    </div>
                    <div className="form-detail">
                        <center>
                            <div className="login-signup-row">
                                <div className="signup-head head-active">Sign Up</div>
                                <div className="login-head">Login</div>
                            </div>
                        </center>
                        <div className="page-signup">
                            <form onSubmit={this.signupSubmitHandler}>
                                <div className="form-row">
                                    <label htmlFor="name">NAME</label>
                                    <input type="text" id="name" className="input-text" onChange={(e) => {this.setState({signupName: e.target.value})}} required />
                                    <span className="fa fa-user-o input-icon-left"></span>
                                </div>
                                <div className="form-row">
                                    <label htmlFor="email">E-MAIL</label>
                                    <input type="email" id="email" className="input-text" onBlur={this.isEmail} onChange={(e) => {this.setState({signupEmail: e.target.value})}} required />
                                    <span className="fa fa-envelope input-icon-left"></span>
                                    <span className="fa fa-check input-icon-right" id="emailCheck" style={{color: '#1ebd46', display: 'none'}}></span>
                                    <span className="fa fa-times input-icon-right" id="emailCheck2" style={{color: '#d12317', display: 'none'}}></span>
                                </div>
                                <div className="form-row">
                                    <label htmlFor="phoneNumber">PHONE NUMBER</label>
                                    <input type="tel" id="phoneNumber" className="input-text" onBlur={this.isPhoneNumber} onChange={(e) => {this.setState({signupPhoneNumber: e.target.value})}} required pattern="^\d{10}$" />
                                    <span className="fa fa-phone input-icon-left"></span>
                                    <span className="fa fa-check input-icon-right" id="phoneNumberCheck" style={{color: '#1ebd46', display: 'none'}}></span>
                                    <span className="fa fa-times input-icon-right" id="phoneNumberCheck2" style={{color: '#d12317', display: 'none'}}></span>
                                </div>
                                <div className="form-row">
                                    <label htmlFor="username">USERNAME</label>
                                    <input type="text" id="username" className="input-text" onBlur={this.isUsername} onChange={(e) => {this.setState({signupUsername: e.target.value})}} required />
                                    <span className="fa fa-user input-icon-left"></span>
                                    <span className="fa fa-check input-icon-right" id="usernameCheck" style={{color: '#1ebd46', display: 'none'}}></span>
                                    <span className="fa fa-times input-icon-right" id="usernameCheck2" style={{color: '#d12317', display: 'none'}}></span>
                                </div>
                                <div className="form-row">
                                    <label htmlFor="password">PASSWORD</label>
                                    <input type="password" id="password" className="input-text" onChange={(e) => {this.setState({signupPassword: e.target.value})}} required />
                                    <span className="fa fa-lock input-icon-left"></span>
                                    <span className="fa fa-eye input-icon-right" id="eye1"></span>
                                </div>
                                <div className="form-row">
                                    <label htmlFor="confirmPassword">CONFIRM PASSWORD</label>
                                    <input type="password" id="confirmPassword" className="input-text" required />
                                    <span className="fa fa-lock input-icon-left"></span>
                                    <span className="fa fa-eye input-icon-right" id="eye2"></span>
                                </div>
                                <center>
                                    <button type="submit" className="register-button">Register</button>
                                </center>
                                
                            </form>
                        </div>
                        <div className="page-login" style={{display: 'none'}}>
                            <form style={{marginTop: 160}} onSubmit={this.loginSubmitHandler}>
                                <div className="form-row">
                                    <label htmlFor="usernamel">USERNAME</label>
                                    <input type="text" id="usernamel" className="input-text" onChange={(e) => {this.setState({loginUsername: e.target.value})}} required />
                                    <span className="fa fa-user input-icon-left"></span>
                                </div>
                                <div className="form-row">
                                    <label htmlFor="passwordl">PASSWORD</label>
                                    <input type="password" id="passwordl" className="input-text" onChange={(e) => {this.setState({loginPassword: e.target.value})}} required />
                                    <span className="fa fa-lock input-icon-left"></span>
                                    <span className="fa fa-eye input-icon-right" id="eye3"></span>
                                </div>
                                
                                <center>
                                    <button type="submit" className="login-button">Login</button>
                                </center>
                                
                            </form>
                        </div>
                    </div>
                    
                </div>
            </div>
            
        )
    }
}
