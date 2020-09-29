import React, { Component } from "react";
import $ from 'jquery';
import '../css/signup.css';
import { toast } from "react-toastify";
import OtpInput from 'react-otp-input';

const api = 'https://backend.tutorola.com';

var user, otp;

export default class TeacherSignUp extends Component {
    state = {
        signupName: '',
        signupEmail: '',
        signupPassword: '',
        signupConfirmPassword: '',
        loginEmail: '',
        loginPassword: '',

        checkEmail: 0,

        loaded: false,

        otpForm: false,

        otpInput: ''
    }

    componentWillMount() {
        $("html, body").animate({ scrollTop: 0 }, 100);
        var token = localStorage.getItem('teacherToken');
        if(token) {
            fetch(api+'/login/teacherCheckTokenStatus', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({token})
            })
            .then(res => res.json())
            .then(data => {
                if(data.status === 'success') {
                    this.props.history.push('/teacherDashboard');
                }
                else {
                    this.setState({loaded: true});
                }
            })
        }
        else {
            this.setState({loaded: true});
        }
    }

    componentWillUnmount() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }

    mounted = () => {
        if(this.state.loaded && !this.state.otpForm) {
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
    }

    componentDidMount() {
        this.mounted();
    }

    componentDidUpdate() {
        this.mounted();
    }

    isEmail = () => {
        var email = document.getElementById('email')
        if(email.checkValidity()) {
            fetch(api+'/login/teacherIsEmail', {
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
        //console.log('hello');
        if(this.state.checkEmail) {
            $('.register-button').attr('disabled', 'true');
            $('.register-button').css('opacity', '0.7');
            user = {
                name: this.state.signupName,
                email: this.state.signupEmail,
                password: this.state.signupPassword
            }
            fetch(api+'/login/teacherSendOTP', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({email: user.email})
            })
            .then(res => res.json())
            .then(data => {
                if(data.status === 'success') {
                    otp=data.otp;
                    $('.register-button').removeAttr('disabled');
                    $('.register-button').css('opacity', '1');
                    //$('.page-signup').empty();
                    //$('.page-signup').append('<form id="signup-otp-form"><div class="otp-text">An OTP has been sent to your Email!</div><div class="form-row"><label for="otp">OTP</label><input type="tel" id="otp" pattern="^[0-9]*$" class="input-text" required style="margin-bottom: 10px" /><i class="fa fa-key input-icon-left"></i></div><span class="resend-otp-row">Didn\'t receive OTP?&nbsp; <span class="resend-otp">Resend OTP</span></span><center><button type="submit" class="register-button" style="margin-top: 40px">Verify and Register</button></center></form>')
                    this.setState({otpForm: true});
                    //console.log(this.state);
                    
                }
                else {
                    //if(!alert('An error occurred! Please try again')) window.location.reload();
                    toast.info('✖ An error occurred');
                    this.setState({otpForm: false, signupName: '', signupEmail: '', signupPassword: '', signupConfirmPassword: '', otpInput: '', checkEmail: 0});
                    return;
                }
            })
        }
    }

    resendOTPClick = () => {
        fetch(api+'/login/teacherSendOTP', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email: user.email})
        })
        .then(res => res.json())
        .then(data => {
            if(data.status === 'success') {
                otp=data.otp;
                //alert('OTP sent successfully');
                toast.info('✔ OTP sent successfully');
            }
            else {
                //if(!alert('An error occurred! Please try again')) window.location.reload();
                toast.info('✖ An error occurred');
                this.setState({otpForm: false, signupName: '', signupEmail: '', signupPassword: '', signupConfirmPassword: '', otpInput: '', checkEmail: 0});
                return;
            }
        })
    }

    OTPSubmit = (e) => {
        e.preventDefault();
        //console.log(this.state);
        $('#signup-otp-form .register-button').attr('disabled', 'true');
        $('#signup-otp-form .register-button').css('opacity', '0.7');
        fetch(api+'/login/teacherCheckOTP', {
            method: 'POST', 
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({otp, input: this.state.otpInput})
        })
        .then(res => res.json())
        .then(data2 => {
            if(data2.status === 'success') {
                fetch(api+'/login/teacherSignup', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(user)
                })
                .then(res => res.json())
                .then(data3 => {
                    $('#signup-otp-form .register-button').removeAttr('disabled');
                    $('#signup-otp-form .register-button').css('opacity', '1');
                    if(data3.status === 'success') {
                        //if(!alert('Account created successfully')) window.location.reload();
                        toast.info('✔ Account created successfully!');
                        this.setState({otpForm: false, signupName: '', signupEmail: '', signupPassword: '', signupConfirmPassword: '', otpInput: '', checkEmail: 0});
                    }
                    else {
                        //if(!alert('An error occured! Please try again')) window.location.reload();
                        toast.info('✖ An error occurred');
                        this.setState({otpForm: false, signupName: '', signupEmail: '', signupPassword: '', signupConfirmPassword: '', otpInput: '', checkEmail: 0});
                    }
                    //console.log(this.state);
                    return;
                })
            }
            else {
                $('#signup-otp-form .register-button').removeAttr('disabled');
                $('#signup-otp-form .register-button').css('opacity', '1');
                //if(!alert('OTP verification failed')) window.location.reload();
                toast.info('✖ OTP verification failed');
                this.setState({otpForm: false, signupName: '', signupEmail: '', signupPassword: '', signupConfirmPassword: '', otpInput: '', checkEmail: 0});
                //console.log(this.state);
                return;
            }
        })
    }

    loginSubmitHandler = (e) => {
        e.preventDefault();
        $('.login-button').attr('disabled', 'true');
        $('.login-button').css('opacity', '0.7');
        fetch(api+'/login/teacherLogin', {
            method: 'POST', 
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email: this.state.loginEmail, password: this.state.loginPassword})
        })
        .then(res => res.json())
        .then(data => {
            $('.login-button').removeAttr('disabled');
            $('.login-button').css('opacity', '1');
            if(data.status === 'success') {
                localStorage.setItem('teacherToken', data.token);
                this.props.history.push('/teacherDashboard');
            }
            else {
                //if(!alert('Invalid credentials')) window.location.reload();
                toast.info('✖ Invalid Credentials');
                this.setState({loginEmail: '', loginPassword: ''});
                $(this).blur();
            }
        })
    }

    render() {
        return (this.state.loaded) ? (
            <div className="slide-2">
                <div className="page-content">
                    <div className="form-v7-content">
                        
                        <div className="form-detail" data-aos="fade-up">
                            <center>
                                <div className="login-signup-row">
                                    <div className="signup-head head-active noselect" onClick={() => {
                                        $('.page-login').fadeOut('fast', () => {
                                            $('.page-signup').fadeIn('fast');
                                        });
                                        $('.signup-head').addClass('head-active');
                                        $('.login-head').removeClass('head-active');
                                    }}>Sign Up</div>
                                    <div className="login-head noselect" onClick={() => {
                                        $('.page-signup').fadeOut('fast', () => {
                                            $('.page-login').fadeIn('fast');
                                        });
                                        $('.signup-head').removeClass('head-active');
                                        $('.login-head').addClass('head-active');
                                    }}>Login</div>
                                </div>
                            </center>
                            <div className="page-signup">
                                {(!this.state.otpForm) ? (
                                    <form onSubmit={this.signupSubmitHandler}>
                                        <div className="form-row">
                                            <label htmlFor="name">NAME</label>
                                            <input type="text" id="name" className="input-text" value={this.state.signupName} onChange={(e) => {this.setState({signupName: e.target.value})}} required />
                                            <span className="fa fa-user-o input-icon-left"></span>
                                        </div>
                                        <div className="form-row">
                                            <label htmlFor="email">E-MAIL</label>
                                            <input type="email" id="email" className="input-text" value={this.state.signupEmail} onBlur={this.isEmail} onChange={(e) => {this.setState({signupEmail: e.target.value})}} required />
                                            <span className="fa fa-envelope input-icon-left"></span>
                                            <span className="fa fa-check input-icon-right" id="emailCheck" style={{color: '#1ebd46', display: 'none'}}></span>
                                            <span className="fa fa-times input-icon-right" id="emailCheck2" style={{color: '#d12317', display: 'none'}}></span>
                                        </div>
                                        <div className="form-row">
                                            <label htmlFor="password">PASSWORD</label>
                                            <input type="password" id="password" className="input-text" value={this.state.signupPassword} onChange={(e) => {this.setState({signupPassword: e.target.value})}} required />
                                            <span className="fa fa-lock input-icon-left"></span>
                                            <span className="fa fa-eye input-icon-right" id="eye1" onClick={() => {
                                                $('#eye1').toggleClass('fa-eye');
                                                $('#eye1').toggleClass('fa-eye-slash');
                                                var input = $('#password');
                                                if(input.attr('type') === 'password') {
                                                    input.attr('type', 'text');
                                                }
                                                else {
                                                    input.attr('type', 'password');
                                                }
                                            }}></span>
                                        </div>
                                        <div className="form-row">
                                            <label htmlFor="confirmPassword">CONFIRM PASSWORD</label>
                                            <input type="password" id="confirmPassword" className="input-text" value={this.state.signupConfirmPassword} onChange={(e) => {this.setState({signupConfirmPassword: e.target.value})}} required />
                                            <span className="fa fa-lock input-icon-left"></span>
                                            <span className="fa fa-eye input-icon-right" id="eye2" onClick={() => {
                                                $('#eye2').toggleClass('fa-eye');
                                                $('#eye2').toggleClass('fa-eye-slash');
                                                var input = $('#confirmPassword');
                                                if(input.attr('type') === 'password') {
                                                    input.attr('type', 'text');
                                                }
                                                else {
                                                    input.attr('type', 'password');
                                                }
                                            }}></span>
                                        </div>
                                        <center>
                                        <button type="submit" className="register-button">Next</button>
                                        </center>
                                        
                                    </form>
                                ) :
                                (
                                    <form id="signup-otp-form">
                                        <div className="otp-text">An OTP has been sent to your Email!</div>
                                        <div className="form-row">
                                            {/* <label htmlFor="otp">OTP</label>
                                            <input type="tel" id="otp" pattern="^[0-9]*$" className="input-text" value={this.state.otpInput} onChange={(e) => {this.setState({otpInput: e.target.value})}} required style={{marginBottom: 10}} />
                                            <i className="fa fa-key input-icon-left"></i> */}
                                            <OtpInput 
                                                value={this.state.otpInput}
                                                numInputs={6}
                                                separator={<span> </span>}
                                                isInputNum={true}
                                                inputStyle="otp-input-box"
                                                shouldAutoFocus={true}
                                                onChange={(otp) => this.setState({otpInput: otp})}
                                            />
                                        </div>
                                        <span className="resend-otp-row">Didn't receive OTP?&nbsp; <span className="resend-otp" onClick={this.resendOTPClick}>Resend OTP</span></span>
                                        <center>
                                            <button type="submit" className="register-button" style={{marginTop: 40}} onClick={this.OTPSubmit}>Verify and Register</button>
                                        </center>
                                    </form>
                                )}
                                
                                
                            </div>
                            <div className="page-login" style={{display: 'none'}}>
                                <form style={{marginTop: 90}} onSubmit={this.loginSubmitHandler}>
                                    <div className="form-row">
                                        <label htmlFor="emaill">EMAIL</label>
                                        <input type="email" id="emaill" className="input-text" value={this.state.loginEmail} onChange={(e) => {this.setState({loginEmail: e.target.value})}} required />
                                        <span className="fa fa-envelope input-icon-left"></span>
                                    </div>
                                    <div className="form-row">
                                        <label htmlFor="passwordl">PASSWORD</label>
                                        <input type="password" id="passwordl" className="input-text" value={this.state.loginPassword} onChange={(e) => {this.setState({loginPassword: e.target.value})}} required />
                                        <span className="fa fa-lock input-icon-left"></span>
                                        <span className="fa fa-eye input-icon-right" id="eye3" onClick={() => {
                                            $('#eye3').toggleClass('fa-eye');
                                            $('#eye3').toggleClass('fa-eye-slash');
                                            var input = $('#passwordl');
                                            if(input.attr('type') === 'password') {
                                                input.attr('type', 'text');
                                            }
                                            else {
                                                input.attr('type', 'password');
                                            }
                                        }}></span>
                                    </div>
                                    
                                    <center>
                                        <button type="submit" className="login-button">Login</button>
                                    </center>
                                    
                                </form>
                            </div>
                        </div>
                        <div className="form-left" data-aos="fade-up" data-aos-delay="200">
                            
                        </div>
                    </div>
                </div>
            </div>
            
        ) :
        (
            <div id="loader" style={{position:'fixed',left:0,top:0,width:'100%',height:'100%',zIndex:100,background:"url('./loader.gif') center no-repeat #fff"}}></div>
        )
    }
}
