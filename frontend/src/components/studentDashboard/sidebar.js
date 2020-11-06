import React, { Component } from 'react';
import $ from 'jquery';
import { NavLink, Link } from 'react-router-dom';

export default class Sidebar extends Component {
    componentDidMount() {
        $("#toggler").click(function () {
            if($('.list-container').hasClass('list-toggler')) {
                $(".list-container").removeClass("list-toggler");
            }
            else {
                $(".list-container").addClass("list-toggler");
            }
        });
        $(window).resize(() => {
            $('.list-container').removeClass('list-toggler');
        })
        document.getElementById('sidebar-wrapper').addEventListener('mousedown', this.handleClickOutside, false);
    }

    toggleDropdown = () => {
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

    handleClickOutside = (e) => {
        if(this.node.contains(e.target)) return;
        else this.closeDropdown();
    }

    componentWillUnmount() {
        document.getElementById('sidebar-wrapper').removeEventListener('mousedown', this.handleClickOutside, false);
    }

    render() {

        const pathname = window.location.pathname;

        return (
            <div className="side-bar" id="sidebar-wrapper">
                <nav className="navbar navbar-inverse">

                    
                    <button className="navbar-toggler hidden-lg-up" type="button" id="toggler" aria-controls="list-container" aria-label="Toggle side-bar">
                        <span className="fa fa-bars"></span>
                    </button>
                    <div className="navbar-brand">
                        <Link to="/">
                            <img src="./images/logotutorola.png" className="brand-logo-img" style={{margin: 0}} alt="tutorola" />
                        </Link>
                    </div>
                    <img src={`./profile_images/${this.props.image}`} alt="" className="mobile-avatar" onClick={this.toggleDropdown} ref={node => this.node=node} />
                    <div className="list-container">
                        <ul>                    
                            
                            <li><NavLink to="/studentDashboard" className=""><span className="navIcon"><i className="fa fa-desktop" style={{color: '#fb6340'}}></i></span>&nbsp;&nbsp;Dashboard</NavLink></li>
                            <li><NavLink to="/courses" isActive={() => ['/courses', '/courseInfo'].includes(pathname)}><span className="navIcon"><i className="fa fa-book" style={{color: '#5e72e4'}}></i></span>&nbsp;&nbsp;Courses</NavLink></li>
                            <li><NavLink to="/studentProfile"><span className="navIcon"><i className="fa fa-user-o" style={{color: '#f5365c'}}></i></span>&nbsp;&nbsp;Student Profile</NavLink></li>                            
                            <li><NavLink to="/w"><span className="navIcon"><i className="fa fa-pencil-square-o" style={{color: '#ffd600'}}></i></span>&nbsp;&nbsp;Something else</NavLink></li>

                        </ul>
                    </div>
                </nav>
            </div>
        )
    }
}