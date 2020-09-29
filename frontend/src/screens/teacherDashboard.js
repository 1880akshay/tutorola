import React, { Component } from "react";

const api = "https://backend.tutorola.com";

export default class TeacherDashboard extends Component {

    state = {
        loaded: false
    }

    componentWillMount() {
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
                    this.setState({loaded: true});
                }
                else {
                    this.props.history.push('/teacherSignup');
                }
            })
        }
        else {
            this.props.history.push('/teacherSignup');
        }
    }

    componentWillUnmount() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }

    logout = () => {
        var token = localStorage.getItem('teacherToken');
        fetch(api+'/login/teacherLogout', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({token})
        })
        .then(res => res.json())
        .then(data => {
            if(data.status === 'success') {
                localStorage.removeItem('teacherToken');
                this.props.history.push('/teacherSignup');
            }
            else {
                alert('An error occurred');
            }
        })
    }

    render() {
        
        return (this.state.loaded) ? (
            <div style={{paddingTop: 200}}>
                <h1>Teacher Dashboard</h1>
                <br /><br />
                <button onClick={this.logout}>Logout</button>
            </div>
        ) :
        (
            <div id="loader" style={{position:'fixed',left:0,top:0,width:'100%',height:'100%',zIndex:100,background:"url('./loader.gif') center no-repeat #fff"}}></div>
        )
    }
}