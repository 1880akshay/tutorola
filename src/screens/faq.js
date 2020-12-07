import React, { Component } from "react";
import $ from 'jquery';
import '../css/faq.css';

export default class FAQ extends Component {
    componentDidMount() {
        $('.faq-group').click(function() {
            if($(this).next().next().css('display') === 'none') {
                $(this).next().next().slideDown('fast');
                $(this).find('.faq-arrow').css('transform', 'rotate(90deg)');
            }
            else {
                $(this).next().next().slideUp('fast');
                $(this).find('.faq-arrow').css('transform', 'rotate(0deg)');
            }
        });
    }

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
                                <h1 data-aos="fade-up" data-aos-delay="0">Frequently Asked Questions (FAQs)</h1>
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
                <div className="bg-light pt-5 pb-5 faq-main-wrapper">
                    <img src="images/faq.png" alt="" className="faq-img" />
                    <img src="images/faq2.png" alt="" className="faq-img2" />
                    <div className="container pt-3 pb-3">
                        <div className="faq-group">
                            <div className="faq-ques">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ut turpis dignissim metus feugiat euismod?</div>
                            <div className="fa fa-angle-right faq-arrow"></div>
                        </div>
                        <hr />
                        <div className="faq-ans mt-2 mb-3">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ut turpis dignissim metus feugiat euismod. Nullam tempus nunc vel ligula vehicula cursus. Suspendisse potenti. Ut vitae enim maximus, sollicitudin sapien vitae, sollicitudin odio. Mauris convallis lorem eu eros blandit porttitor. In sed magna vitae nisl posuere pulvinar quis in tellus.
                        </div>
                        <div className="faq-group">
                            <div className="faq-ques">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ut turpis dignissim metus feugiat euismod?</div>
                            <div className="fa fa-angle-right faq-arrow"></div>
                        </div>
                        <hr />
                        <div className="faq-ans mt-2 mb-3">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ut turpis dignissim metus feugiat euismod. Nullam tempus nunc vel ligula vehicula cursus. Suspendisse potenti. Ut vitae enim maximus, sollicitudin sapien vitae, sollicitudin odio. Mauris convallis lorem eu eros blandit porttitor. In sed magna vitae nisl posuere pulvinar quis in tellus.
                        </div>
                        <div className="faq-group">
                            <div className="faq-ques">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ut turpis dignissim metus feugiat euismod?</div>
                            <div className="fa fa-angle-right faq-arrow"></div>
                        </div>
                        <hr />
                        <div className="faq-ans mt-2 mb-3">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ut turpis dignissim metus feugiat euismod. Nullam tempus nunc vel ligula vehicula cursus. Suspendisse potenti. Ut vitae enim maximus, sollicitudin sapien vitae, sollicitudin odio. Mauris convallis lorem eu eros blandit porttitor. In sed magna vitae nisl posuere pulvinar quis in tellus.
                        </div>
                        <div className="faq-group">
                            <div className="faq-ques">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ut turpis dignissim metus feugiat euismod?</div>
                            <div className="fa fa-angle-right faq-arrow"></div>
                        </div>
                        <hr />
                        <div className="faq-ans mt-2 mb-3">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ut turpis dignissim metus feugiat euismod. Nullam tempus nunc vel ligula vehicula cursus. Suspendisse potenti. Ut vitae enim maximus, sollicitudin sapien vitae, sollicitudin odio. Mauris convallis lorem eu eros blandit porttitor. In sed magna vitae nisl posuere pulvinar quis in tellus.
                        </div>
                        <div className="faq-group">
                            <div className="faq-ques">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ut turpis dignissim metus feugiat euismod?</div>
                            <div className="fa fa-angle-right faq-arrow"></div>
                        </div>
                        <hr />
                        <div className="faq-ans mt-2 mb-3">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ut turpis dignissim metus feugiat euismod. Nullam tempus nunc vel ligula vehicula cursus. Suspendisse potenti. Ut vitae enim maximus, sollicitudin sapien vitae, sollicitudin odio. Mauris convallis lorem eu eros blandit porttitor. In sed magna vitae nisl posuere pulvinar quis in tellus.
                        </div>
                        <div className="faq-group">
                            <div className="faq-ques">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ut turpis dignissim metus feugiat euismod?</div>
                            <div className="fa fa-angle-right faq-arrow"></div>
                        </div>
                        <hr />
                        <div className="faq-ans mt-2 mb-3">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ut turpis dignissim metus feugiat euismod. Nullam tempus nunc vel ligula vehicula cursus. Suspendisse potenti. Ut vitae enim maximus, sollicitudin sapien vitae, sollicitudin odio. Mauris convallis lorem eu eros blandit porttitor. In sed magna vitae nisl posuere pulvinar quis in tellus.
                        </div>
                        <div className="faq-group">
                            <div className="faq-ques">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ut turpis dignissim metus feugiat euismod?</div>
                            <div className="fa fa-angle-right faq-arrow"></div>
                        </div>
                        <hr />
                        <div className="faq-ans mt-2 mb-3">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ut turpis dignissim metus feugiat euismod. Nullam tempus nunc vel ligula vehicula cursus. Suspendisse potenti. Ut vitae enim maximus, sollicitudin sapien vitae, sollicitudin odio. Mauris convallis lorem eu eros blandit porttitor. In sed magna vitae nisl posuere pulvinar quis in tellus.
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}