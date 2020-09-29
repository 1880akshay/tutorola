import React, { Component } from "react";
import $ from 'jquery';

const api = "https://backend.tutorola.com";

export default class StudentDashboard extends Component {

    state = {
        loaded: false
    }

    componentWillMount() {
        var token = localStorage.getItem('token');
        if(token) {
            fetch(api+'/login/checkTokenStatus', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({token})
            })
            .then(res => res.json())
            .then(data => {
                if(data.status === 'success') {
                    this.setState({loaded: true});
                }
                else {
                    this.props.history.push('/studentSignup');
                }
            })
        }
        else {
            this.props.history.push('/studentSignup');
        }
    }

    componentWillUnmount() {
        $('#navbar-container').show();
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }

    componentDidMount() {
        $('#navbar-container').hide();
    }

    logout = () => {
        var token = localStorage.getItem('token');
        fetch(api+'/login/studentLogout', {
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

    render() {
        
        return (this.state.loaded) ? (
            <section>
                <div style={{paddingTop: 200}}>
                    <h1>Student Dashboard</h1>
                    <br /><br />
                    <button onClick={this.logout}>Logout</button>
                </div>
            </section>
            
        ) :
        (
            <div id="loader" style={{position:'fixed',left:0,top:0,width:'100%',height:'100%',zIndex:100,background:"url('./loader.gif') center no-repeat #fff"}}></div>
        )
    }
}