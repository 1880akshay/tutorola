import React, { Component } from "react";
import Navbar from "../components/Navbar";
import HomePage from "../components/Home";
import Courses from "../components/Courses";
import Program from "../components/Program";
import Teacher from "../components/Teacher";
import Review from "../components/Review";
import ChooseUs from "../components/ChooseUs";
import ContactUs from "../components/ContactUs";
import Footer from "../components/Footer";

export default class Home extends Component {

    render() {
        return (
            <div className="site-wrap">
                <Navbar />
                <HomePage />
                <Courses />
                <Program />
                <Teacher />
                <Review />
                <ChooseUs />
                <ContactUs />
                <Footer />
            </div>
        )
    }
}