import React, { Component } from "react";
import HomePage from "../components/Home";
//import Courses from "../components/Courses";
import Services from "../components/Service";
import WhyUs from "../components/WhyUs";
import Testimonials from "../components/Testimonials";
//import ChooseUs from "../components/ChooseUs";
import ContactUs from "../components/ContactUs";

export default class Home extends Component {

    componentWillUnmount() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }

    render() {
        return (
            <div className="site-wrap">
                <HomePage />
                {/* <Courses /> */}
                <Services />
                <WhyUs />
                <Testimonials />
                {/* <ChooseUs /> */}
                <ContactUs />
            </div>
        )
    }
}