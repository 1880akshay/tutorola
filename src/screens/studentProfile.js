import React, { Component } from "react";
import $ from 'jquery';
import Sidebar from '../components/studentDashboard/sidebar';
import Topnav from "../components/studentDashboard/topnav";
import Select from 'react-select';
import OtpInput from 'react-otp-input';
import ContentLoader from 'react-content-loader';
import { toast } from "react-toastify";

const classOptions = [
    {value: '11', label: 'Class 11'},
    {value: '12', label: 'Class 12'},
    {value: 'drop', label: 'Dropout / Target'}
]
var subjectOptions = [];
var otp;
var selectedSubjects = [];
const customStyles = {
    control: (provided) => ({
      ...provided,
      borderRadius: 5,
      boxShadow: '0 1px 3px rgba(50,50,93,.15),0 1px 0 rgba(0,0,0,.02)',
      border: 0,
      transition: 'box-shadow .15s ease',
      padding: '3px 10px',
      color: '#8898aa',
      fontSize: 16
    })
  }
export default class StudentProfile extends Component {

    state = {
        loaded: false,
        dateJoined: '',
        name: '',
        email: '',
        id: '',
        phoneNumber: '',
        city: '',
        class: '',
        subjects: '',
        profileImage: '',

        inputName: '',
        inputEmail: '',
        inputPhoneNumber: '',
        inputCity: '',
        inputClass: '',
        inputSubId: [],

        selectIsDisabled: true,

        checkEmail: 1,
        checkPhoneNumber: 1,

        otpInput: '',
        otpSent: false,
        isEmailVerified: true,

        token: '',
    }

    componentWillMount() {
        var token = localStorage.getItem('token');
        this.setState({token});
        if(token) {
            fetch('/api/login/checkTokenStatus', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({token})
            })
            .then(res => res.json())
            .then(data => {
                if(data.status === 'success') {
                    this.setState({id: data.info.id, name: data.info.name, email: data.info.email, inputName: data.info.name, inputEmail: data.info.email, profileImage: data.info.profileImage});
                    fetch('/api/profile/getProfile', {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({id: data.info.id})
                    })
                    .then(res => res.json())
                    .then(data2 => {
                        if(data2.status==='success') {
                            this.setState({phoneNumber: data2.phoneNumber, city: data2.city, class: data2.class, subjects: data2.subjects, inputPhoneNumber: data2.phoneNumber, inputCity: data2.city});
                            var classVal = (this.state.class==='11')?classOptions[0].value:(this.state.class==='12')?classOptions[1].value:(this.state.class==='drop')?classOptions[2].value:'';
                            this.setState({inputClass: classVal});
                            if(this.state.subjects!=='') {
                                var subIds = JSON.parse(this.state.subjects);
                                this.setState({inputSubId: subIds});
                                selectedSubjects = subjectOptions.filter(sub => {
                                    return subIds.includes(sub.value);
                                })
                            }

                        }
                        this.setState({loaded: true});
                    })
                }
                else {
                    this.props.history.push('/studentSignup');
                }
            })
            fetch('/api/topicRequest/getSubjects')
            .then(res => res.json())
            .then(data => {
                subjectOptions=[];
                for(var i=0; i<data.length; i++) {
                    subjectOptions.push({value: data[i].id, label: data[i].name})
                }
            })
        }
        else {
            this.props.history.push('/studentSignup');
        }
    }

    componentWillUnmount() {
        $('#navbar-container').css('opacity', '1');
        $('footer.footer-section').show();
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }

    componentDidMount() {
        $('#navbar-container').css('opacity', '0');
        $('footer.footer-section').hide();

        var s=localStorage.getItem('token');
        if(s) {
            s=s.substring(
                s.lastIndexOf('@@')+2,
                s.lastIndexOf('..')
            );
            s=s.replace('$', ' ');
            s=s.replace('$', ' ').split(' ');
            var date = s[0];
            var month = Number(s[1]);
            var year = s[2];
            switch(month) {
                case 1: month=" January "; break;
                case 2: month=" February "; break;
                case 3: month=" March "; break;
                case 4: month=" April "; break;
                case 5: month=" May "; break;
                case 6: month=" June "; break;
                case 7: month=" July "; break;
                case 8: month=" August "; break;
                case 9: month=" September "; break;
                case 10: month=" October "; break;
                case 11: month=" November "; break;
                case 12: month=" December "; break;
                default: month=" undefined "; break;
            }
            this.setState({dateJoined: date+month+year});
        }
    }

    logout = () => {
        var token = localStorage.getItem('token');
        fetch('/api/login/studentLogout', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({token})
        })
        .then(res => res.json())
        .then(data => {
            if(data.status === 'success') {
                localStorage.removeItem('token');
                this.props.history.push('/studentSignup');
            }
            else {
                alert('An error occurred');
            }
        })
    }

    enableInput = () => {
        this.setState({selectIsDisabled: false});
        $('.profile-form1 input').removeAttr('disabled');
        $('#submit-btn-row').show();
        $('#phoneNumber').focus();
    }

    isEmail = () => {
        var email = document.getElementById('email');
        this.setState({otpSent: false, isEmailVerified: false});
        if(email.checkValidity() && email.value!==this.state.email) {
            fetch('/api/login/studentIsEmail', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({email: this.state.inputEmail})
            })
            .then(res => res.json())
            .then(data => {
                if(data.status === 'available') {
                    $('#emailCheck2').hide();
                    $('#emailCheck').show();
                    $('#emailCheck').attr('title', 'Email available');
                    this.setState({checkEmail: 1});
                    $('#verify-email-btn').show();
                }
                else {
                    $('#emailCheck').hide();
                    $('#emailCheck2').show();
                    $('#emailCheck2').attr('title', 'Email already exists');
                    this.setState({checkEmail: 0});
                    $('#verify-email-btn').hide();
                }
            })
        }
        else if(email.value===this.state.email) {
            $('#emailCheck').hide();
            $('#emailCheck2').hide();
            this.setState({checkEmail: 1, isEmailVerified: true});
            $('#verify-email-btn').hide();
        }
        else {
            $('#emailCheck').hide();
            $('#emailCheck2').show();
            $('#emailCheck2').attr('title', 'Please match the requested format');
            $('#verify-email-btn').hide();
        }
    }

    isPhoneNumber = () => {
        var phoneNumber = document.getElementById('phoneNumber')
        if(phoneNumber.checkValidity() && phoneNumber.value!=='' && phoneNumber.value!==this.state.phoneNumber) {
            fetch('/api/profile/studentIsPhoneNumber', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({phoneNumber: this.state.inputPhoneNumber})
            })
            .then(res => res.json())
            .then(data => {
                if(data.status === 'available') {
                    $('#phoneCheck2').hide();
                    $('#phoneCheck').show();
                    $('#phoneCheck').attr('title', 'Phone Number available');
                    this.setState({checkPhoneNumber: 1});
                }
                else {
                    $('#phoneCheck').hide();
                    $('#phoneCheck2').show();
                    $('#phoneCheck2').attr('title', 'Phone Number already exists');
                    this.setState({checkPhoneNumber: 0});
                }
            })
        }
        else if(phoneNumber.value==='') {
            $('#phoneCheck').hide();
            $('#phoneCheck2').hide();
            this.setState({checkPhoneNumber: 1});
        }
        else if(phoneNumber.value===this.state.phoneNumber) {
            $('#phoneCheck').hide();
            $('#phoneCheck2').hide();
            this.setState({checkPhoneNumber: 1});
        }
        else {
            $('#phoneCheck').hide();
            $('#phoneCheck2').show();
            $('#phoneCheck2').attr('title', 'Please match the requested format');
        }
    }

    verifyEmail = () => {
        var email = document.getElementById('email');
        if(this.state.checkEmail && email.value!==this.state.email && email.value!=='' && !this.state.otpSent) {
            fetch('/api/login/studentSendOTP', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({email: this.state.inputEmail})
            })
            .then(res => res.json())
            .then(data => {
                if(data.status==='success') {
                    otp=data.otp;
                    this.setState({otpSent: true});
                }
                else {
                    this.setState({otpSent: false});
                }
            })
        }
    }

    resendOTPClick = () => {
        fetch('/api/login/studentSendOTP', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email: this.state.inputEmail})
        })
        .then(res => res.json())
        .then(data => {
            if(data.status === 'success') {
                otp=data.otp;
                toast.info('✔ OTP sent successfully');
            }
            else {
                toast.info('✖ An error occurred');
                this.setState({otpSent: false});
            }
        })
    }

    OTPSubmit = (e) => {
        e.preventDefault();
        fetch('/api/login/studentCheckOTP', {
            method: 'POST', 
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({otp, input: this.state.otpInput})
        })
        .then(res => res.json())
        .then(data => {
            $('#otp-modal button.close').click();
            if(data.status==='success') {
                toast.info('✔ Email verification successful');
                this.setState({isEmailVerified: true, otpInput: ''});
                $('#verify-email-btn').hide();
            }
            else {
                toast.info('✖ OTP verification failed');
                this.setState({otpSent: false, otpInput: '', isEmailVerified: false});
            }
        })
    }

    updateFormSubmit = (e) => {
        const info = {
            id: this.state.id,
            name: this.state.inputName,
            email: this.state.inputEmail,
            phoneNumber: this.state.inputPhoneNumber,
            city: this.state.inputCity,
            class: this.state.inputClass,
            subjects: JSON.stringify(this.state.inputSubId),
            token: this.state.token
        }
        e.preventDefault();
        if(this.state.checkEmail && this.state.checkPhoneNumber && this.state.isEmailVerified) {
            fetch('/api/profile/updateProfile', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(info)
            })
            .then(res => res.json())
            .then(data => {
                if(data.status==='success') {
                    var part2 = info.token.substr(info.token.indexOf('@@'), info.token.length);
                    var newToken = info.email+part2;
                    localStorage.setItem('token', newToken);
                    if(!alert('Profile updated successfully')) window.location.reload();
                }
                else {
                    if(!alert('An error occurred')) window.location.reload();
                }
            })
        }
        if(!this.state.checkEmail) {
            toast.info('✖ Email already exists');
        }
        if(!this.state.checkPhoneNumber) {
            toast.info('✖ Phone Number already exists');
        }
        if(!this.state.isEmailVerified) {
            toast.info('✖ Please complete email verification');
        }
    }

    imageUpload = (e) => {
        e.preventDefault();
        var info = new FormData();
        info.append('id', this.state.id);
        info.append('profileImage', $('#profile-img-upload').get(0).files[0]);
        fetch('/api/profile/imageUpload', {
            method: 'POST',
            body: info
        })
        .then(res => res.json())
        .then(data => {
            if(data.status==='success') {
                if(!alert('Image updated successfully')) window.location.reload();
            }
            else {
                if(!alert('An error occurred')) window.location.reload();
            }
        });
    }

    readURL = (event) => {
        var input = event.target;
        if (input.files && input.files[0]) {
          var reader = new FileReader();
          
          reader.onload = function(e) {
            $('#upl-icon').hide();
            $('#cross-btn').show();
            $('.image-container img').remove();
            $('.image-container').prepend('<img src="'+e.target.result+'" style="width: 200px" />')
            $('#profile-image-container').attr('src', e.target.result);
          }
          
          reader.readAsDataURL(input.files[0]); // convert to base64 string
        }
    }

    clearImageInput = (e) => {
        e.preventDefault();
        $('#profile-img-upload').val('');
        $('#cross-btn').hide();
        $('.image-container img').remove();
        $('#upl-icon').show();
    }

    render() {
        
        return (this.state.loaded && this.state.dateJoined!=='') ? (
            <section className="bg-light">
                <Sidebar image={this.state.profileImage} />
                <div className="bodyContent" id="main-content-wrapper">
                    <Topnav activeLink="STUDENT PROFILE" name={this.state.name} image={this.state.profileImage} />
                    <div className="profile-hero">
                        <div className="col-lg-6 col-md-8">
                            <h1 className="hello-name mb-3" data-aos="fade-up">Hello {this.state.name}!</h1>
                            <p className="text-white" style={{fontSize: 17}} data-aos="fade-up">This is your profile page. You can edit your profile information here and specify your preferences for a better experience.</p>
                            <a className="btn mb-lg-0 mb-5 mt-lg-3 mt-4 edit-pro-btn" href="#edit" onClick={this.enableInput} data-aos="fade-up">Edit Profile</a>
                        </div>
                        
                    </div>
                    <div className="container-fluid profile-form-container">
                        <div className="row">
                            
                            <div className="col-lg-4 order-lg-last profile-form2">
                                <div className="profile-edit-form">
                                    <center>
                                        <div className="profile-img-container">
                                            <img src={`./profile_images/students/${this.state.profileImage}`} alt="" className="profile-img" />
                                            {/* <div className="profile-img-overlay"></div> */}
                                            <button type="button" data-toggle="modal" data-target="#profile-img-modal" data-backdrop="static" data-keyboard="false" className="fa fa-pencil img-edit-icon" title="Change Profile Image"></button>
                                        </div>
                                        <div className="profile-name">{this.state.name}</div>
                                        <div className="profile-designation">Student {
                                            (this.state.class==='')?(<span></span>):(this.state.class==='11')?(<span>(Class 11)</span>):(this.state.class==='12')?(<span>(Class 12)</span>):(<span>(Dropout / Target)</span>)
                                        }</div>
                                        <hr />
                                        <div style={{fontSize: 'smaller'}}>Email: {this.state.email}</div>
                                        <div style={{fontSize: 'smaller'}}>{
                                            (this.state.phoneNumber==='')?(<span></span>):(<span>Phone Number: {this.state.phoneNumber}</span>)
                                        }</div>
                                        <hr />
                                        <div style={{fontSize: 'small'}}>Joined Tutorola on {this.state.dateJoined}</div>
                                    </center>
                                </div>
                            </div>
                            <div className="col-lg-8 profile-form1" id="edit">
                                <div className="profile-edit-form p-0" style={{overflow: 'hidden', backgroundColor: '#f7fafc'}}>
                                    <div className="py-3 px-4 bg-white manage-profile-row">
                                        <div style={{color: '#333', fontWeight: 600, fontSize: 15}}>Manage Profile</div>
                                        <div><button className="btn-primary-bs" onClick={this.enableInput}>Edit</button></div>
                                    </div>
                                    <form id="update-profile-form" onSubmit={this.updateFormSubmit}>
                                        <div className="container-fluid py-3 px-4">
                                            <div className="info-type">USER INFORMATION</div>
                                            <div className="row px-md-4 px-2">
                                                <div className="col-md-6 mb-3">
                                                    <div><label htmlFor="name" className="profile-input-label">Name <span style={{color: '#d12317'}}>*</span></label></div>
                                                    <input type="text" id="name" className="profile-input-box" disabled value={this.state.inputName} onChange={(e) => this.setState({inputName: e.target.value})} required></input>
                                                </div>
                                                <div className="col-md-6 mb-3" style={{position: 'relative'}}>
                                                    <div><label htmlFor="email" className="profile-input-label">Email <span style={{color: '#d12317'}}>*</span></label></div>
                                                    <input type="email" id="email" className="profile-input-box" disabled value={this.state.inputEmail} onBlur={this.isEmail} onChange={(e) => this.setState({inputEmail: e.target.value})} required></input>
                                                    <span className="fa fa-check input-icon-right" id="emailCheck" style={{color: '#1ebd46', display: 'none'}}></span>
                                                    <span className="fa fa-times input-icon-right" id="emailCheck2" style={{color: '#d12317', display: 'none'}}></span>
                                                    <span id="verify-email-btn" data-toggle="modal" data-target="#otp-modal" onClick={this.verifyEmail}>Verify Email</span>
                                                </div>
                                                <div className="col-md-6 mb-3">
                                                    <div><label htmlFor="phoneNumber" className="profile-input-label">Phone Number</label></div>
                                                    <input type="tel" pattern="^\d{10}$" id="phoneNumber" className="profile-input-box" disabled value={this.state.inputPhoneNumber} onBlur={this.isPhoneNumber} onChange={(e) => this.setState({inputPhoneNumber: e.target.value})}></input>
                                                    <span className="fa fa-check input-icon-right" id="phoneCheck" style={{color: '#1ebd46', display: 'none'}}></span>
                                                    <span className="fa fa-times input-icon-right" id="phoneCheck2" style={{color: '#d12317', display: 'none'}}></span>
                                                </div>
                                                <div className="col-md-6 mb-3">
                                                    <div><label htmlFor="city" className="profile-input-label">City</label></div>
                                                    <input type="text" id="city" className="profile-input-box" disabled value={this.state.inputCity} onChange={(e) => this.setState({inputCity: e.target.value})}></input>
                                                </div>
                                            </div>
                                            <hr style={{marginTop: 30, marginBottom: 30}} />
                                            <div className="info-type">EDUCATIONAL INFORMATION</div>
                                            <div className="row px-md-4 px-2">
                                                <div className="col-md-6 mb-3">
                                                    <div><label className="profile-input-label">Class</label></div>
                                                    <Select
                                                        options={classOptions}
                                                        menuPlacement="auto"
                                                        styles={customStyles}
                                                        isClearable={true}
                                                        isMulti={false}
                                                        isDisabled={this.state.selectIsDisabled}
                                                        onChange={(selected) => {(selected)?this.setState({inputClass: selected.value}):this.setState({inputClass: ''})}}
                                                        defaultValue={(this.state.class==='11')?classOptions[0]:(this.state.class==='12')?classOptions[1]:(this.state.class==='drop')?classOptions[2]:null}
                                                    />
                                                </div>
                                                <div className="col-md-6 mb-4">
                                                    <div><label className="profile-input-label">Subjects of Interest</label></div>
                                                    <Select
                                                        options={subjectOptions}
                                                        menuPlacement="auto"
                                                        styles={customStyles}
                                                        isClearable={true}
                                                        isMulti={true}
                                                        isDisabled={this.state.selectIsDisabled}
                                                        onChange={(selected) => {
                                                            var a=[];
                                                            if(selected) {
                                                                for(var i=0; i<selected.length; i++) a.push(selected[i].value);
                                                                a.sort();
                                                            }
                                                            this.setState({inputSubId: a});
                                                        }}
                                                        defaultValue={selectedSubjects}
                                                    />
                                                </div>
                                            </div>
                                            <div className="row justify-content-center">
                                                <div className="col-sm-4" id="submit-btn-row">
                                                    <button type="submit" className="btn btn-primary w-100">Update Profile</button>
                                                </div>
                                            </div>
                                            
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
                
                <div className="modal fade" id="profile-img-modal">
                    <div className="modal-dialog">
                        <div className="modal-content">

                        {/*Modal Header*/}
                        <div className="modal-header">
                            <h4 className="modal-title text-dark">Update Profile Image</h4>
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                        </div>

                        {/*Modal body*/}
                        <div className="modal-body">
                            <center>
                                <form encType="multipart/form-data" onSubmit={this.imageUpload}>
                                    
                                    <label className="image-container" htmlFor="profile-img-upload">
                                        <span className="fa fa-upload" id="upl-icon" style={{textAlign: 'center', fontSize: 50}}></span><br />
                                        <div className="text-center" style={{margin: '10px 0 0 0'}}>Select an image to upload</div>
                                        <span className="fa fa-times" id="cross-btn" onClick={this.clearImageInput}></span>
                                        <input type="file" accept="image/*" id="profile-img-upload" className="profile-input-tag" onChange={this.readURL} required />
                                    </label>
                                    <button type="submit" className="btn btn-primary mt-2" style={{width: 300}}>Update</button>
                                </form>
                                
                            </center>
                        </div>

                        {/*Modal footer
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                        </div>*/}

                        </div>
                    </div>
                </div>

                <div className="modal fade" id="otp-modal">
                    <div className="modal-dialog">
                        <div className="modal-content">

                        {/*Modal Header*/}
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                        </div>

                        {/*Modal body*/}
                        <div className="modal-body">
                            {(this.state.otpSent) ? (
                                <form id="signup-otp-form" className="mt-1" onSubmit={this.OTPSubmit}>
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
                                        <button type="submit" className="register-button mb-4" style={{marginTop: 40}}>Verify Email</button>
                                    </center>
                                </form>
                            ) : (
                                <ContentLoader />
                            )}
                        </div>

                        {/*Modal footer
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                        </div>*/}

                        </div>
                    </div>
                </div>
                
            </section>
            
        ) :
        (
            <div id="loader" style={{position:'fixed',left:0,top:0,width:'100%',height:'100%',zIndex:100,background:"url('./loader.gif') center no-repeat #fff"}}></div>
        )
    }
}