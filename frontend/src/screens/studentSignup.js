import React, { Component } from "react";
import $ from 'jquery';
import '../css/opensans-font.css';
import '../css/signup.css';

const api = 'http://localhost:9000';

export default class StudentSignUp extends Component {
    state = {
        signupName: '',
        signupEmail: '',
        signupPassword: '',
        loginEmail: '',
        loginPassword: '',

        checkEmail: 0
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

    signupSubmitHandler = (e) => {
        e.preventDefault();
        if(this.state.checkEmail) {
            $('.register-button.button-loader-wrapper').prepend('<div class="button-loader"></div>');
            $('.register-button.button-loader-wrapper').css('opacity', '0.7');
            $('.register-button.button-loader-wrapper').attr('disabled', 'true');
            const user = {
                name: this.state.signupName,
                email: this.state.signupEmail,
                password: this.state.signupPassword
            }
            var otp;
            fetch(api+'/login/studentSendOTP', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({email: user.email})
            })
            .then(res => res.json())
            .then(data => {
                if(data.status === 'success') {
                    otp=data.otp;
                    $('.register-button.button-loader-wrapper .button-loader').remove();
                    $('.register-button.button-loader-wrapper').css('opacity', '1');
                    $('.register-button.button-loader-wrapper').attr('disabled', 'false');

                    $('.page-signup').empty();
                    $('.page-signup').append('<form id="signup-otp-form"><div class="otp-text">An OTP has been sent to your Email!</div><div class="form-row"><label for="otp">OTP</label><input type="tel" id="otp" pattern="^[0-9]*$" class="input-text" required style="margin-bottom: 10px" /><i class="fa fa-key input-icon-left"></i></div><span class="resend-otp-row">Didn\'t receive OTP?&nbsp; <span class="resend-otp">Resend OTP</span></span><center><button type="submit" class="register-button" style="margin-top: 40px">Verify and Register</button></center></form>')
                    $('.resend-otp').click(() => {
                        fetch(api+'/login/studentSendOTP', {
                            method: 'POST',
                            headers: {'Content-Type': 'application/json'},
                            body: JSON.stringify({email: user.email})
                        })
                        .then(res => res.json())
                        .then(data => {
                            if(data.status === 'success') {
                                otp=data.otp;
                                alert('OTP sent successfully');
                            }
                            else {
                                if(!alert('An error occurred! Please try again')) window.location.reload();
                            }
                        })
                    })
                    $('#signup-otp-form').submit((e) => {
                        e.preventDefault();
                        fetch(api+'/login/studentCheckOTP', {
                            method: 'POST', 
                            headers: {'Content-Type': 'application/json'},
                            body: JSON.stringify({otp, input: $('input#otp').val()})
                        })
                        .then(res => res.json())
                        .then(data2 => {
                            if(data2.status === 'success') {
                                fetch(api+'/login/studentSignup', {
                                    method: 'POST',
                                    headers: {'Content-Type': 'application/json'},
                                    body: JSON.stringify(user)
                                })
                                .then(res => res.json())
                                .then(data3 => {
                                    if(data3.status === 'success') {
                                        if(!alert('Account created successfully')) window.location.reload();
                                    }
                                    else {
                                        if(!alert('An error occured! Please try again')) window.location.reload();
                                    }
                                })
                            }
                            else {
                                if(!alert('OTP verification failed')) window.location.reload();
                            }
                        })
                    })
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
            body: JSON.stringify({email: this.state.loginEmail, password: this.state.loginPassword})
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
                                <button type="submit" className="register-button button-loader-wrapper"><div>Next</div></button>
                                </center>
                                
                            </form>
                            
                        </div>
                        <div className="page-login" style={{display: 'none'}}>
                            <form style={{marginTop: 90}} onSubmit={this.loginSubmitHandler}>
                                <div className="form-row">
                                    <label htmlFor="emaill">EMAIL</label>
                                    <input type="email" id="emaill" className="input-text" onChange={(e) => {this.setState({loginEmail: e.target.value})}} required />
                                    <span className="fa fa-envelope input-icon-left"></span>
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
