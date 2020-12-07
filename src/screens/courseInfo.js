import React, { Component } from "react";
import $ from 'jquery';
import Sidebar from '../components/studentDashboard/sidebar';
import Topnav from "../components/studentDashboard/topnav";
import ReactTooltip from 'react-tooltip';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

var courseId;

export default class CourseInfo extends Component {

    state = {
        loaded1: false,
        loaded2: false,
        loaded3: false,
        studentId: '',
        name: '',
        profileImage: '',

        courseName: '',
        subject: '',
        rating: '',
        teacherName: '',

        ratingDist: {
            'total': 0,
            '5star': 0,
            '4star': 0,
            '3star': 0,
            '2star': 0,
            '1star': 0
        },
        ratingDistBool: false,
        reviewsTotal: 0,
        reviews: [],

        addReviewRating: 0,
        addReviewReview: ''
    }

    componentWillMount() {
        var urlParams = (window.location.search);
        if(urlParams) {
            if(urlParams.slice(0, 4)==='?id=') {
                courseId = Number(urlParams.slice(4));
                //console.log(courseId);
                if(isNaN(courseId)) {
                    this.props.history.push('/courses');
                }
                fetch('/api/courses/getCourseInfo', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({courseId})
                })
                .then(res => res.json())
                .then(data => {
                    if(data.status==='success') {
                        var keywords = JSON.parse(data.courseInfo.keywords);
                        this.setState({
                            courseName: keywords[0], 
                            subject: keywords[1], 
                            rating: data.courseInfo.rating, 
                            teacherName: data.courseInfo.teacherName,
                            loaded2: true
                        });
                    }
                    else {
                        this.props.history.push('/courses');
                        //console.log(data);
                    }
                });
                fetch('/api/reviews/getReviews', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({courseId})
                })
                .then(res => res.json())
                .then(data => {
                    if(data.status==='success') {
                        var reviews=data.reviews;
                        this.setState({reviews});
                        var totalRatings=reviews.length;
                        var ratingDist = {
                            '5star': 0,
                            '4star': 0,
                            '3star': 0,
                            '2star': 0,
                            '1star': 0
                        };
                        var reviewsTotal=0;
                        for(var i=0; i<totalRatings; i++) {
                            ratingDist[reviews[i].rating+'star']+=1;
                            if(reviews[i].review!=='') reviewsTotal+=1;
                        }
                        this.setState({
                            ratingDist: {
                                'total': totalRatings,
                                '5star': ratingDist['5star'],
                                '4star': ratingDist['4star'],
                                '3star': ratingDist['3star'],
                                '2star': ratingDist['2star'],
                                '1star': ratingDist['1star']
                            },
                            reviewsTotal,
                            ratingDistBool: true
                        });
                    }
                    this.setState({loaded3: true});
                })
            }
            else {
                this.props.history.push('/courses');
            }
        }
        else {
            this.props.history.push('/courses');
        }

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
                    this.setState({loaded1: true, studentId: data.info.id, name: data.info.name, profileImage: data.info.profileImage});
                }
                else {
                    this.props.history.push('/studentSignup');
                }
            });

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

    starHover = (e) => {
        var starId=Number($(e.target).attr('data-star-id'));
        //console.log(starId);
        $('.add-review-stars span').css('color', '#c9c9c9');
        for(var i=1; i<=starId; i++) {
            $('.add-review-stars span[data-star-id='+i+']').css('color', '#7971ea');
        }
    }
    starHoverLeave = () => {
        $('.add-review-stars span').css('color', '#c9c9c9');
        if(this.state.addReviewRating) {
            for(var i=1; i<=this.state.addReviewRating; i++) {
                $('.add-review-stars span[data-star-id='+i+']').css('color', '#7971ea');
            }
        }
    }
    ratingSelect = (e) => {
        var starId=Number($(e.target).attr('data-star-id'));
        for(var i=1; i<=starId; i++) {
            $('.add-review-stars span[data-star-id='+i+']').css('color', '#7971ea');
        }
        this.setState({addReviewRating: starId});
        $('#pseudo-rating').val(starId);
        $('#pseudo-rating').removeAttr('required');
        document.getElementById('pseudo-rating').setCustomValidity('');
    }

    reviewSubmit = (e) => {
        e.preventDefault();
        $('#add-review-modal .modal-header button').click();
        var data = {
            courseId,
            studentId: this.state.studentId,
            studentName: this.state.name,
            profileImage: this.state.profileImage,
            rating: this.state.addReviewRating,
            review: this.state.addReviewReview,
            prevRating: (this.state.rating) ? this.state.rating : 0,
            totalRatings: this.state.ratingDist.total
        }
        fetch('/api/reviews/addReview', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(data => {
            if(data.status==='success') {
                if(!alert('Review added successfully!')) window.location.reload();
            }
            else {
                if(!alert('An error occurred')) window.location.reload();
            }
        })
    }

    render() {
        var onlyReviews = (this.state.reviews.length) ? this.state.reviews.filter(item => {
            return item.review;
        }) : [];
        var lessReviews = (onlyReviews.length<=3) ? onlyReviews : onlyReviews.slice(0, 3);
        const displayReviews = (lessReviews.length) ? lessReviews.map(item => {
            return (
                <div className="bg-white review-main-container item" key={item.id}>
                    <div>
                        <center>
                            <img src={`./profile_images/students/${item.profileImage}`} className="reviewer-img" />
                            <div style={{lineHeight: 1, marginTop: 10}}>
                                <div className="Stars" style={{'--rating': item.rating}}></div>
                            </div>    
                        </center>
                    </div>
                    <center>
                        <div className="review-wrapper">
                            <div style={{textAlign: 'left'}}>
                                <span className="fa fa-quote-left" style={{fontSize: 12}}></span>
                            </div>
                            <div className="review-text">
                                {item.review}
                            </div>
                            <div style={{textAlign: 'right'}}>
                                <span className="fa fa-quote-right" style={{fontSize: 12}}></span>
                            </div>
                        </div>
                    </center>
                    <div style={{textAlign: 'right', fontWeight: 400, fontSize: 16}}>-{item.studentName}</div>
                </div>
            );
        }) : [];

        const allReviews = (onlyReviews.length) ? onlyReviews.map(item => {
            return (
                <div className="review-card d-flex row mx-lg-3 mx-1 mb-3 bg-light pt-3 pb-2" key={item.id}>
                    <div className="col-lg-3 col-12" id="main-reviewer-img">
                        <center>
                            <div style={{width: 'max-content', textAlign: 'center'}}>
                                <img src={`./profile_images/students/${item.profileImage}`} className="reviewer-img" />
                                <div className="mb-lg-3" style={{fontWeight: 400, fontSize: 16}}>{item.studentName}</div>
                            </div>
                        </center>
                    </div>
                    <div className="col-lg-9 col-12">
                        <div style={{width: 'max-content'}}>
                            <div className="Stars" style={{'--rating': item.rating}}></div>
                        </div>
                        <div className="review-wrapper">
                            <div style={{textAlign: 'left'}}>
                                <span className="fa fa-quote-left" style={{fontSize: 12}}></span>
                            </div>
                            <div className="review-text">
                                {item.review} 
                            </div>
                            <div style={{textAlign: 'right'}}>
                                <span className="fa fa-quote-right" style={{fontSize: 12}}></span>
                            </div>
                        </div>
                        
                    </div>
                </div>
            )
        }) : [];
        
        return (this.state.loaded1 && this.state.loaded2 && this.state.loaded3) ? (
            <section>
                <Sidebar image={this.state.profileImage} />
                <div className="bodyContent" id="main-content-wrapper">
                    <Topnav activeLink="COURSE INFO" name={this.state.name} image={this.state.profileImage} />
                    <div className="courseInfo-hero">
                        <h1 className="hello-name mt-4 mb-0 mt-md-4 mt-0 text-center w-100" style={{lineHeight: 1}} data-aos="fade-up">{this.state.courseName}</h1>
                        <h5 className="text-center text-white w-100 mt-2" data-aos="fade-up">({this.state.subject})</h5>
                    </div>
                    <div className="container py-5">
                        <div className="row justify-content-center mb-5">
                            <div className="col-sm-4 mb-4">                                
                                {(this.state.rating) ? (
                                    <div>
                                        <div className="Stars Stars__big" style={{'--rating': this.state.rating}}></div>
                                        <div className="course-rating-review"><b>{this.state.ratingDist.total}</b> ratings, <b>{this.state.reviewsTotal}</b> reviews</div>
                                    </div>
                                ) : (
                                    <div style={{fontSize: 18, color: 'gray'}}>No ratings yet</div>
                                )}                                                                                 
                            </div>
                            <div className="col-sm-8 d-flex course-teacher-info">
                                <div style={{width: 'max-content', paddingRight: 15}}>
                                    <div style={{color: '#333', fontWeight: 700, fontSize: 20}} className="mb-2">Course Teacher</div>
                                    <div className="d-flex" style={{alignItems: 'center'}}>
                                        <div>
                                            <img src="./profile_images/students/avatar.png" className="course-teacher-img" />        
                                        </div>
                                        <div className="ml-3">
                                            <div style={{fontWeight: 'bolder', lineHeight: 1.5}}>{this.state.teacherName}</div>
                                            <div style={{fontSize: 15, lineHeight: 1.3}}>Student, IIT Kharagpur</div>
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                        <div className="mb-md-0 mb-3" style={{fontSize: 20, color: '#333', fontWeight: 'bolder'}}>Student Feedback</div>
                        {(this.state.ratingDistBool) ? (
                            <div className="row justify-content-between" style={{alignItems: 'center'}}>
                                <div className="col-md-6 mb-md-0 mb-5">
                                    <div className="course-rating-main-wrapper d-flex" style={{alignItems: 'center'}}>
                                        <div style={{flex: 1}}>
                                            <div style={{width: 'max-content', textAlign: 'center'}}>
                                                <div className="rating-main-lg">{this.state.rating}</div>
                                                <div style={{fontSize: 14, lineHeight: 1.3}}><b>{this.state.ratingDist.total}</b> ratings<br /><b>{this.state.reviewsTotal}</b> reviews</div>
                                            </div>
                                        </div>
                                        <div style={{flex: 3}}>
                                            <ReactTooltip 
                                                effect='solid'
                                            />
                                            <div className="d-flex" style={{justifyContent: 'space-between', alignItems: 'center', lineHeight: 1.4}}>                                            
                                                <div className="progress" data-tip={(this.state.ratingDist['5star']/this.state.ratingDist.total*100).toFixed(1)+'%'}>
                                                    <div className="progress-bar" style={{'--total': this.state.ratingDist.total, '--number': this.state.ratingDist['5star']}}></div>
                                                </div> 
                                                <div>
                                                    <div className="Stars" style={{'--rating': 5}}></div>
                                                </div>
                                            </div>
                                            <div className="d-flex" style={{justifyContent: 'space-between', alignItems: 'center', lineHeight: 1.4}}>
                                                <div className="progress" data-tip={(this.state.ratingDist['4star']/this.state.ratingDist.total*100).toFixed(1)+'%'}>
                                                    <div className="progress-bar" style={{'--total': this.state.ratingDist.total, '--number': this.state.ratingDist['4star']}}></div>
                                                </div>
                                                <div>
                                                    <div className="Stars" style={{'--rating': 4}}></div>
                                                </div>
                                            </div>
                                            <div className="d-flex" style={{justifyContent: 'space-between', alignItems: 'center', lineHeight: 1.4}}>
                                                <div className="progress" data-tip={(this.state.ratingDist['3star']/this.state.ratingDist.total*100).toFixed(1)+'%'}>
                                                    <div className="progress-bar" style={{'--total': this.state.ratingDist.total, '--number': this.state.ratingDist['3star']}}></div>
                                                </div>
                                                <div>
                                                    <div className="Stars" style={{'--rating': 3}}></div>
                                                </div>
                                            </div>
                                            <div className="d-flex" style={{justifyContent: 'space-between', alignItems: 'center', lineHeight: 1.4}}>
                                                <div className="progress" data-tip={(this.state.ratingDist['2star']/this.state.ratingDist.total*100).toFixed(1)+'%'}>
                                                    <div className="progress-bar" style={{'--total': this.state.ratingDist.total, '--number': this.state.ratingDist['2star']}}></div>
                                                </div>
                                                <div>
                                                    <div className="Stars" style={{'--rating': 2}}></div>
                                                </div>
                                            </div>
                                            <div className="d-flex" style={{justifyContent: 'space-between', alignItems: 'center', lineHeight: 1.4}}>
                                                <div className="progress" data-tip={(this.state.ratingDist['1star']/this.state.ratingDist.total*100).toFixed(1)+'%'}>
                                                    <div className="progress-bar" style={{'--total': this.state.ratingDist.total, '--number': this.state.ratingDist['1star']}}></div>
                                                </div>
                                                <div>
                                                    <div className="Stars" style={{'--rating': 1}}></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {(this.state.reviewsTotal) ? (
                                        <div className="row justify-content-center mt-4 review-btn-grp">
                                            <div className="col-6 col-lg-6 col-xl-5 col-md-12 mb-lg-0 mb-md-3 mb-0">
                                                <button className="add-review-btn" data-toggle="modal" data-target="#add-review-modal">Add Review</button>
                                            </div>
                                            <div className="col-6 col-lg-6 col-xl-5 col-md-12">
                                                <button className="add-review-btn" data-toggle="modal" data-target="#all-reviews-modal">See All Reviews</button>
                                            </div>
                                        </div>
                                    ) : false}
                                </div>
                                <div className="col-lg-5 col-md-6" id="review-carousel">
                                    {(this.state.reviewsTotal) ? (
                                        <OwlCarousel
                                            className="owl-theme"
                                            loop
                                            items={1}
                                            nav={false}
                                            dots={true}
                                            autoplay={true}
                                            autoplayHoverPause={true}
                                        >
                                            {displayReviews}
                                        </OwlCarousel> 
                                    ) : (
                                        <div className="row justify-content-center">
                                            <div className=" col-12 mb-4 text-center">
                                                <div className="px-2 text-center"><span className="fa fa-frown-o no-result-icon"></span></div>
                                                <div style={{fontSize: 18, fontWeight: 400, textAlign: 'center'}} className="px-2">No reviews yet</div>
                                            </div>
                                            <div className="col-8">
                                                <button className="add-review-btn" data-toggle="modal" data-target="#add-review-modal">Add Review</button>
                                            </div>
                                        </div>
                                    )
                                    }                               
                                </div>
                            </div>
                        ) : (
                            <div className="row justify-content-center">
                                <div className=" col-12 mb-4 mt-md-4 mt-0 text-center">
                                    <div className="px-2 text-center"><span className="fa fa-frown-o no-result-icon"></span></div>
                                    <div style={{fontSize: 18, fontWeight: 400, textAlign: 'center'}} className="px-2">No ratings or reviews yet</div>
                                </div>
                                <div className="col-lg-3 col-md-5 col-8">
                                    <button className="add-review-btn" data-toggle="modal" data-target="#add-review-modal">Add Review</button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <div className="modal fade" id="add-review-modal" style={{zIndex: 10000}}>
                    <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                    
                        <div className="modal-header">
                            <h5 className="modal-title text-dark">Add Course Review</h5>
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                        </div>
                        
                        <div className="modal-body">
                            <form onSubmit={this.reviewSubmit}>
                                <div className="filter-name">Rating:</div>
                                <center>
                                    <div className="add-review-stars" onMouseLeave={this.starHoverLeave}>
                                        <span data-star-id="1" onMouseEnter={this.starHover} onClick={this.ratingSelect}>★</span>
                                        <span data-star-id="2" onMouseEnter={this.starHover} onClick={this.ratingSelect}>★</span>
                                        <span data-star-id="3" onMouseEnter={this.starHover} onClick={this.ratingSelect}>★</span>
                                        <span data-star-id="4" onMouseEnter={this.starHover} onClick={this.ratingSelect}>★</span>
                                        <span data-star-id="5" onMouseEnter={this.starHover} onClick={this.ratingSelect}>★</span>
                                    </div>
                                    <input type="number" id="pseudo-rating" onInvalid={(e) => e.target.setCustomValidity('Please select a rating')} required />
                                </center>
                                <div className="filter-name">Review (optional):</div>
                                <textarea className="add-review-textbox" placeholder="Write your review here" onChange={(e) => this.setState({addReviewReview: e.target.value})}></textarea>
                                <button type="submit" className="btn-success-bs w-100 mt-4" style={{height: 40}}><span className="fa fa-check"></span>&nbsp;&nbsp;Submit</button>
                            </form>
                        </div>
                        
                    </div>
                    </div>
                </div>
                <div className="modal fade" id="all-reviews-modal" style={{zIndex: 10000}}>
                    <div className="modal-dialog modal-lg modal-dialog-centered" style={{overflow: 'initial'}}>
                    <div className="modal-content">
                    
                        <div className="modal-header">
                            <h5 className="modal-title text-dark">All Reviews</h5>
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                        </div>
                        
                        <div className="modal-body" style={{overflowY: 'auto', maxHeight: '80vh'}}>
                            {allReviews}                            
                        </div>
                        
                    </div>
                    </div>
                </div>
            </section>
        ) : (
            <div id="loader" style={{position:'fixed',left:0,top:0,width:'100%',height:'100%',zIndex:100,background:"url('./loader.gif') center no-repeat #fff"}}></div>
        )
    }
}