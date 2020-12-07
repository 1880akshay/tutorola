import React, { Component } from "react";
import $ from 'jquery';

export default class About extends Component {

    componentWillMount() {
        $("html, body").animate({ scrollTop: 0 }, 100);
    }

    componentWillUnmount() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }

    render() {
        return (
            <section>
                <div className="intro-section single-cover" id="home-section">
                    <div className="slide-1 " style={{backgroundImage: 'url("images/cover.jpg")'}}>
                        <div className="container">
                        <div className="row align-items-center">
                            <div className="col-12">
                            <div className="row justify-content-center align-items-center text-center">
                                <div className="col-lg-6">
                                <h1 data-aos="fade-up" data-aos-delay="0">About Us</h1>
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}