import React, { Component } from "react";
import $ from 'jquery';
import Sidebar from '../components/studentDashboard/sidebar';
import Topnav from "../components/studentDashboard/topnav";

var courseId;

export default class CourseInfo extends Component {

    state = {
        loaded1: false,
        loaded2: false,
        name: '',
        profileImage: '',

        courseName: '',
        subject: ''
    }

    componentWillMount() {
        var urlParams = (window.location.search);
        if(urlParams) {
            if(urlParams.slice(0, 4)==='?id=') {
                courseId = Number(urlParams.slice(4));
                //console.log(courseId);
                if(isNaN(courseId)) {
                    this.props.history.push('/courses');
                }
                fetch('/api/courses/getCourseInfo', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({courseId})
                })
                .then(res => res.json())
                .then(data => {
                    if(data.status==='success') {
                        var keywords = JSON.parse(data.courseInfo.keywords);
                        this.setState({courseName: keywords[0], subject: keywords[1], loaded2: true});
                    }
                    else {
                        this.props.history.push('/courses');
                        //console.log(data);
                    }
                });
            }
            else {
                this.props.history.push('/courses');
            }
        }
        else {
            this.props.history.push('/courses');
        }

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
                    this.setState({loaded1: true, name: data.info.name, profileImage: data.info.profileImage});
                }
                else {
                    this.props.history.push('/studentSignup');
                }
            });

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
    }

    render() {
        
        return (this.state.loaded1 && this.state.loaded2) ? (
            <section>
                <Sidebar image={this.state.profileImage} />
                <div className="bodyContent" id="main-content-wrapper">
                    <Topnav activeLink="COURSE INFO" name={this.state.name} image={this.state.profileImage} />
                    <div className="courseInfo-hero">
                        <h1 className="hello-name mt-4 mb-0 text-center w-100" style={{lineHeight: 1}} data-aos="fade-up">{this.state.courseName}</h1>
                        <h5 className="text-center text-white w-100 mt-2" data-aos="fade-up">({this.state.subject})</h5>
                    </div>
                </div>
            </section>
        ) : (
            <div id="loader" style={{position:'fixed',left:0,top:0,width:'100%',height:'100%',zIndex:100,background:"url('./loader.gif') center no-repeat #fff"}}></div>
        )
    }
}