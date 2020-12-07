import React, { Component } from "react";
import $ from 'jquery';
import Sidebar from '../components/studentDashboard/sidebar';
import Topnav from "../components/studentDashboard/topnav";
import '../css/studentDashboard.css';

export default class StudentDashboard extends Component {

    state = {
        loaded: false,
        name: '',
        profileImage: ''
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
                    this.setState({loaded: true, name: data.info.name, profileImage: data.info.profileImage});
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
        
        return (this.state.loaded) ? (
            <section>
                <Sidebar image={this.state.profileImage} />
                <div className="bodyContent" id="main-content-wrapper">
                    <Topnav activeLink="DASHBOARD" name={this.state.name} image={this.state.profileImage} />
                    <div style={{padding: '1.3rem'}}>
                        <h1>Student Dashboard</h1>
                        <br /><br />
                        <br /><br />
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ut sodales libero. Quisque nulla felis, tristique venenatis
                            mi id, accumsan tempus sapien. Nam eu elit quis orci elementum lobortis ac eget felis. Maecenas vulputate
                            ligula nulla, a ultrices ex consectetur eu. Phasellus fringilla risus eget nulla vestibulum, et dapibus tortor
                            ullamcorper. Phasellus non nibh nec dolor sollicitudin porttitor sed id lectus. Etiam ultricies ligula a
                            libero malesuada tristique. Nam nunc nisl, varius sit amet finibus sit amet, blandit consequat odio. Quisque
                            eu mi ac nunc placerat consequat. Mauris ut metus eget dui pretium ornare at nec risus. Lorem ipsum dolor
                            sit amet, consectetur adipiscing elit. Curabitur varius pulvinar ipsum, nec pretium metus tristique interdum.
                        </p>
                        
                        
                    </div>
                </div>
            </section>
            
        ) :
        (
            <div id="loader" style={{position:'fixed',left:0,top:0,width:'100%',height:'100%',zIndex:100,background:"url('./loader.gif') center no-repeat #fff"}}></div>
        )
    }
}