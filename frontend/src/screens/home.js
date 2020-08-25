import React, { Component } from "react";
import { Link } from 'react-router-dom';

export default class Home extends Component {
    render() {
        return (
            <section>
                <h1>Home</h1>
                <br /><br />
                <Link to="/studentSignup">Student Signup</Link>
                <br /><br />
                <Link to="/teacherSignup">Teacher Signup</Link>
            </section>
        )
    }
}