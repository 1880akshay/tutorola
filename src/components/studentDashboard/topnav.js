import React, { Component } from 'react';
import $ from 'jquery';
import '../../css/studentDashboard.css';
import { Link, Redirect } from 'react-router-dom';

export default class Topnav extends Component {

    state = {
        loggedIn: true
    }

    toggleDropdown = (e) => {
        e.preventDefault();
        var dropdown = $('.profile-dropdown-container');
        if(dropdown.css('display')==='none') {
            dropdown.show();
        }
        else {
            dropdown.hide();
        }
    }
    
    closeDropdown = () => {
        var dropdown = $('.profile-dropdown-container');
        if(dropdown.css('display')!=='none') {
            dropdown.hide();
        }
    }

    logout = () => {
        this.closeDropdown();
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
                this.setState({loggedIn: false});
            }
            else {
                alert('An error occurred');
            }
        })
    }

    componentDidMount() {
        $(window).scroll(() => {
            this.closeDropdown();
        })
        document.getElementById('main-content-wrapper').addEventListener('mousedown', this.handleClickOutside, false);
    }

    handleClickOutside = (e) => {
        if(this.node1.contains(e.target) || this.node2.contains(e.target) || this.node3.contains(e.target)) return;
        else this.closeDropdown();
    }

    componentWillUnmount() {
        document.getElementById('main-content-wrapper').addEventListener('mousedown', this.handleClickOutside, false);
    }

    render() {
        return (this.state.loggedIn) ? (
            <div className="topnav-container">
                <div className="container-fluid">
                    <div className="main-container container-fluid">
                        <div style={{color: 'white', fontWeight: 400, fontSize: 14}}>{this.props.activeLink}</div>
                        
                        <div className="avatar-container">
                            <form className="search-container">
                                <input type="text" className="search-box" placeholder="Search..." />
                                <button type="submit" className="fa fa-search" id="search-icon"></button>
                            </form>
                            <div><img src={`./profile_images/students/${this.props.image}`} className="pc-avatar" alt="" onClick={this.toggleDropdown} ref={node => this.node2=node} /></div>
                            <div style={{color: '#fff', marginLeft: 10, fontSize: 14}} onClick={this.toggleDropdown} ref={node => this.node3=node}>{this.props.name}</div>
                        </div>
                    </div>
                </div>
                <div className="profile-dropdown-container" ref={node => this.node1=node}>
                    <span className="profile-dropdown" style={{color: '#333'}}>
                        <div style={{fontSize:10, fontWeight: 600, padding: '0 15px', cursor: 'pointer'}} className="mb-2">WELCOME!</div>
                        <Link to="/studentProfile">
                            <div className="dropdown-options d-flex w-100" onClick={this.closeDropdown}>
                                <span className="fa fa-user" style={{flex: 1}}></span><span style={{flex: 5}}>Edit Profile</span>
                            </div>
                        </Link>
                        <div className="dropdown-options d-flex w-100" onClick={this.closeDropdown} data-toggle="modal" data-target="#password-modal">
                            <span className="fa fa-lock" style={{flex: 1}}></span><span style={{flex: 5}}>Change Password</span>
                        </div>
                        <hr style={{margin: 5}} />
                        <div className="dropdown-options d-flex w-100" onClick={this.logout}>
                            <span className="fa fa-sign-out" style={{flex: 1}}></span><span style={{flex: 5}}>Logout</span>
                        </div>
                    </span>
                    <span className="dropdown-triangle"></span>
                </div>
                
            </div>
        ) : (
            <Redirect to="/studentSignup" />
        )
    }
}