import React, { Component } from "react";
import $ from 'jquery';
import Sidebar from '../components/studentDashboard/sidebar';
import Topnav from "../components/studentDashboard/topnav";
import CourseCard from "../components/studentDashboard/courseCard";
import ContentLoader from "react-content-loader";
import Sort from '../components/studentDashboard/sort';
import { Slider, Handles, Tracks, Rail, Ticks } from 'react-compound-slider';
import {Handle, Track, Tick} from '../components/studentDashboard/sliderComponents';

const railStyle = {
    width: '100%',
    height: 10,
    borderRadius: 5,
    backgroundColor: '#e7e7e7',
    marginTop: 40,
    position: 'absolute',
    cursor: 'pointer'
}

export default class Courses extends Component {
    state = {
        loaded: false,
        profileImage: '',
        name: '',

        courses: [],
        sortBy: '',
        sortName: 'Most Relevant',
        search: '',

        priceFilterMin: 0,
        priceFilterMax: 2000,
        ratingFilterMin: 0,
        ratingFilterMax: 5,
        subFiltDefault: [],
        subjectFilter: [],
        subjects: [],

        priceFilter: [],
        ratingFilter: []
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
                    this.setState({loaded: true, profileImage: data.info.profileImage, name: data.info.name});
                }
                else {
                    this.props.history.push('/studentSignup');
                }
            })
            fetch('/api/topicRequest/getSubjects')
            .then(res => res.json())
            .then(data => {
                this.setState({subjects: data});
                var a=[];
                for(var i=0; i<data.length; i++) {
                    a.push(Number(data[i].id));
                }
                this.setState({subjectFilter: a, subFiltDefault: a});
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
        fetch('/api/courses/getCourses')
        .then(res => res.json())
        .then(data => {
            this.setState({courses: data});
        })
    }

    selectSort = (e) => {
        $('.sort-active').removeClass('sort-active');
        $(e.target).addClass('sort-active');
        var sortName = e.target.innerHTML;
        this.setState({sortName});
        if(sortName==='Most Relevant') this.setState({sortBy: ''});
        else if(sortName==='Price: Low to High') this.setState({sortBy: 'pricel2h'});
        else if(sortName==='Price: High to Low') this.setState({sortBy: 'priceh2l'});
        else if(sortName==='Rating: High to Low') this.setState({sortBy: 'ratingh2l'});
        else if(sortName==='Rating: Low to High') this.setState({sortBy: 'ratingl2h'});
        else if(sortName==='Title: A to Z') this.setState({sortBy: 'titlea2z'});
        else if(sortName==='Title: Z to A') this.setState({sortBy: 'titlez2a'});
    }

    applyFilters = (e) => {
        e.preventDefault();
        $('#filter-modal .close').click();
        this.setState({priceFilter: [this.state.priceFilterMin, this.state.priceFilterMax], ratingFilter: [this.state.ratingFilterMin, this.state.ratingFilterMax]});
        var a=[];
        $('.filter-option-checkbox').each((i, elem) => {
            if($(elem).find('input').is(':checked')) {
                a.push(Number($(elem).find('input').attr('data-id')));
            }
        });
        if(a.length) this.setState({subjectFilter: a});
        else this.setState({subjectFilter: this.state.subFiltDefault});
    }

    render() {

        const CourseList = this.state.courses.filter(item => {
            if(this.state.subjectFilter.includes(Number(item.subjectId))) {
                if(this.state.search==='') {
                    if(this.state.ratingFilter.length && this.state.priceFilter.length) {
                        if(item.price>=this.state.priceFilter[0] && item.price<=this.state.priceFilter[1] && item.rating>=this.state.ratingFilter[0] && item.rating<=this.state.ratingFilter[1]) {
                            return true;
                        }
                        else return false;
                    }
                    else if(!this.state.ratingFilter.length && this.state.priceFilter.length) {
                        if(item.price>=this.state.priceFilter[0] && item.price<=this.state.priceFilter[1]) {
                            return true;
                        }
                        else return false;
                    }
                    else if(this.state.ratingFilter.length && !this.state.priceFilter.length) {
                        if(item.rating>=this.state.ratingFilter[0] && item.rating<=this.state.ratingFilter[1]) {
                            return true;
                        }
                        else return false;
                    }
                    return true;
                }
                else {
                    var keywords = JSON.parse(item.keywords);
                    for(var i=0; i<keywords.length; i++) {
                        if(keywords[i].toLowerCase().includes(this.state.search.toLowerCase())) {
                            if(this.state.ratingFilter.length && this.state.priceFilter.length) {
                                if(item.price>=this.state.priceFilter[0] && item.price<=this.state.priceFilter[1] && item.rating>=this.state.ratingFilter[0] && item.rating<=this.state.ratingFilter[1]) {
                                    return true;
                                }
                                else return false;
                            }
                            else if(!this.state.ratingFilter.length && this.state.priceFilter.length) {
                                if(item.price>=this.state.priceFilter[0] && item.price<=this.state.priceFilter[1]) {
                                    return true;
                                }
                                else return false;
                            }
                            else if(this.state.ratingFilter.length && !this.state.priceFilter.length) {
                                if(item.rating>=this.state.ratingFilter[0] && item.rating<=this.state.ratingFilter[1]) {
                                    return true;
                                }
                                else return false;
                            }
                            return true;
                        }
                    }
                }
            }
            return false;
        })
        .map(item => {
            return (
                <CourseCard key={item.id} courseInfo={item} courseId={item.id} />
            )
        });

        const SubjectList = this.state.subjects.map(sub => {
            return (
                <div className="col-6 d-flex filter-option-wrapper" key={sub.id}>
                    <div className="filter-option-checkbox"><input type="checkbox" id={sub.name} data-id={sub.id} /></div>
                    <div className="filter-option-label"><label htmlFor={sub.name} className="no-select">{sub.name}</label></div>
                </div>
            )
        })

        return (this.state.loaded) ? (
            <section className="bg-light">
                <Sidebar image={this.state.profileImage} />
                <div className="bodyContent" id="main-content-wrapper">
                    <Topnav activeLink="COURSES" name={this.state.name} image={this.state.profileImage} />
                    <div className="courses-hero">
                        <h1 className="hello-name mt-4" data-aos="fade-up">Courses</h1>
                    </div>
                    <div className="container py-5">
                        <div className="topbar-wrapper">
                            <div className="course-search-wrapper">
                                <form onSubmit={
                                    (e) => {
                                        e.preventDefault();
                                        $('.course-search-input').blur(); 
                                        this.setState({search: $('.course-search-input').val()});
                                        if($('.course-search-input').val()) {
                                            $('.search-results-text').show();
                                        }
                                        else {
                                            $('.search-results-text').hide();
                                        }
                                    }
                                }>
                                    <input type="text" placeholder="Search..." className="course-search-input" />
                                    <button className="fa fa-search"></button>
                                </form>
                            </div>
                            <div className="course-sort-filter-wrapper">
                                <button className="course-filter-main" data-toggle="modal" data-target="#filter-modal" data-backdrop="static" data-keyboard="false"><span className="fa fa-filter"></span>&nbsp;&nbsp;Filters</button>
                                <button className="course-filter-mobile" data-toggle="modal" data-target="#filter-modal" data-backdrop="static" data-keyboard="false"><span className="fa fa-filter"></span></button>
                                <div className="dropdown">
                                    <button className="course-sort-main" data-toggle="dropdown">&#8645;&nbsp;&nbsp;Sort - {this.state.sortName}&nbsp;&nbsp;<span className="fa fa-angle-down"></span></button>
                                    <button className="course-sort-mobile" data-toggle="dropdown"><span style={{fontWeight: 'bolder'}}>&#8645;</span></button>
                                    <div className="dropdown-menu dropdown-menu-right">
                                        <div className="dropdown-item sort-active" onClick={this.selectSort}>Most Relevant</div>
                                        <div className="dropdown-item" onClick={this.selectSort}>Price: Low to High</div>
                                        <div className="dropdown-item" onClick={this.selectSort}>Price: High to Low</div>
                                        <div className="dropdown-item" onClick={this.selectSort}>Rating: High to Low</div>
                                        <div className="dropdown-item" onClick={this.selectSort}>Rating: Low to High</div>
                                        <div className="dropdown-item" onClick={this.selectSort}>Title: A to Z</div>
                                        <div className="dropdown-item" onClick={this.selectSort}>Title: Z to A</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="search-results-text">Search Results for "{this.state.search}" :</div>
                        <div className="row justify-content-center" style={{alignItems: 'center'}}>
                            {(this.state.courses.length && CourseList.length) ? <Sort by={this.state.sortBy}>{CourseList}</Sort> : (this.state.courses.length && !CourseList.length) ? <div className="mt-4">
                                <div className="px-2 text-center"><span className="fa fa-frown-o no-result-icon"></span></div>
                                <div style={{fontSize: 22, fontWeight: 700, textAlign: 'center'}} className="px-2">No results found</div>
                                <div style={{textAlign: 'center'}} className="px-2">Try using different keywords or filters</div>
                            </div> : <ContentLoader /> }
                        </div>
                    </div>
                    
                </div>
                <div className="modal fade" id="filter-modal">
                    <div className="modal-dialog modal-dialog-scrollable my-3">
                        <div className="modal-content">

                        {/*Modal Header*/}
                        <div className="modal-header">
                            <h4 className="modal-title text-dark">Apply Filters</h4>
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                        </div>

                        {/*Modal body*/}
                        <div className="modal-body px-3 pb-4">
                        <form onSubmit={this.applyFilters}>
                            <div className="filter-name">Subject</div>
                            <div className="container-fluid">
                                <div className="row">
                                    {/* <div className="col-6 d-flex filter-option-wrapper">
                                        <div className="filter-option-checkbox"><input type="checkbox" id="physics" /></div>
                                        <div className="filter-option-label"><label htmlFor="physics">Physics</label></div>
                                    </div>
                                    <div className="col-6 d-flex filter-option-wrapper">
                                        <div className="filter-option-checkbox"><input type="checkbox" id="chemistry" /></div>
                                        <div className="filter-option-label"><label htmlFor="chemistry">Chemistry</label></div>
                                    </div>
                                    <div className="col-6 d-flex filter-option-wrapper">
                                        <div className="filter-option-checkbox"><input type="checkbox" id="mathematics" /></div>
                                        <div className="filter-option-label"><label htmlFor="mathematics">Mathematics</label></div>
                                    </div>
                                    <div className="col-6 d-flex filter-option-wrapper">
                                        <div className="filter-option-checkbox"><input type="checkbox" id="biology" /></div>
                                        <div className="filter-option-label"><label htmlFor="biology">Biology</label></div>
                                    </div> */}
                                    {SubjectList}
                                </div>
                            </div>
                            <div className="filter-name">Price Range</div>
                            <div className="container-fluid">
                                <center>
                                <div className="price-range">
                                    <div style={{flex: 2}}>&#8377; {this.state.priceFilterMin} <span style={{fontSize: 10, color: '#343a40', fontWeight: 400}}>/ hr</span></div>
                                    <div style={{flex: 1}}>-</div>
                                    <div style={{flex: 2}}>&#8377; {this.state.priceFilterMax} <span style={{fontSize: 10, color: '#343a40', fontWeight: 400}}>/ hr</span></div>
                                </div>
                                </center>
                                <Slider
                                    rootStyle={{width: '90%', position: 'relative', height: 90, margin: '0 auto'} /* inline styles for the outer div. Can also use className prop. */}
                                    domain={[0, 2000]}
                                    values={[this.state.priceFilterMin, this.state.priceFilterMax]}
                                    step={100}
                                    mode={2}
                                    onUpdate={(values) => {this.setState({priceFilterMin: values[0], priceFilterMax: values[1]})}}
                                >
                                    <Rail>
                                        {({ getRailProps }) => (
                                            <div style={railStyle} {...getRailProps()} />
                                        )}
                                    </Rail>
                                    <Handles>
                                        {({ handles, getHandleProps }) => (
                                            <div className="slider-handles">
                                            {handles.map(handle => (
                                                <Handle
                                                key={handle.id}
                                                handle={handle}
                                                getHandleProps={getHandleProps}
                                                />
                                            ))}
                                            </div>
                                        )}
                                    </Handles>
                                    <Tracks left={false} right={false}>
                                        {({ tracks, getTrackProps }) => (
                                            <div className="slider-tracks">
                                            {tracks.map(({ id, source, target }) => (
                                                <Track
                                                key={id}
                                                source={source}
                                                target={target}
                                                getTrackProps={getTrackProps}
                                                />
                                            ))}
                                            </div>
                                        )}
                                    </Tracks>
                                    <Ticks count={5 /* generate approximately 15 ticks within the domain */}>
                                        {({ ticks }) => (
                                            <div className="slider-ticks">
                                            {ticks.map(tick => (
                                                <Tick key={tick.id} tick={tick} count={ticks.length} />
                                            ))}
                                            </div>
                                        )}
                                    </Ticks>
                                </Slider>
                            </div>
                            <div className="filter-name">Course Rating</div>
                            <div className="container-fluid">
                            <center>
                            <div className="rating-range">
                                <div className="Stars" style={{'--rating': this.state.ratingFilterMin, flex: 2}}></div>
                                <div style={{flex: 1}}>-</div>
                                <div className="Stars" style={{'--rating': this.state.ratingFilterMax, flex: 2}}></div>
                            </div>
                            </center>
                                <Slider
                                    rootStyle={{width: '90%', position: 'relative', height: 90, margin: '0 auto'} /* inline styles for the outer div. Can also use className prop. */}
                                    domain={[0, 5]}
                                    values={[this.state.ratingFilterMin, this.state.ratingFilterMax]}
                                    step={0.5}
                                    mode={2}
                                    onUpdate={(values) => this.setState({ratingFilterMin: values[0], ratingFilterMax: values[1]})}
                                >
                                    <Rail>
                                        {({ getRailProps }) => (
                                            <div style={railStyle} {...getRailProps()} />
                                        )}
                                    </Rail>
                                    <Handles>
                                        {({ handles, getHandleProps }) => (
                                            <div className="slider-handles">
                                            {handles.map(handle => (
                                                <Handle
                                                key={handle.id}
                                                handle={handle}
                                                getHandleProps={getHandleProps}
                                                />
                                            ))}
                                            </div>
                                        )}
                                    </Handles>
                                    <Tracks left={false} right={false}>
                                        {({ tracks, getTrackProps }) => (
                                            <div className="slider-tracks">
                                            {tracks.map(({ id, source, target }) => (
                                                <Track
                                                key={id}
                                                source={source}
                                                target={target}
                                                getTrackProps={getTrackProps}
                                                />
                                            ))}
                                            </div>
                                        )}
                                    </Tracks>
                                    <Ticks count={5}>
                                        {({ ticks }) => (
                                            <div className="slider-ticks">
                                            {ticks.map(tick => (
                                                <Tick key={tick.id} tick={tick} count={ticks.length} />
                                            ))}
                                            </div>
                                        )}
                                    </Ticks>
                                </Slider>
                            </div>
                            
                            <div className="container-fluid mt-4 pt-2">
                                <div className="row">
                                    <div className="col-6 pl-0">
                                        <button type="button" className="btn-danger-bs w-100" data-dismiss="modal" style={{height: 40}} onClick={() => {
                                            this.setState({
                                                priceFilter: [], 
                                                ratingFilter: [],
                                                priceFilterMin: 0,
                                                priceFilterMax: 2000,
                                                ratingFilterMin: 0,
                                                ratingFilterMax: 5,
                                                subjectFilter: this.state.subFiltDefault
                                            });
                                            $('.filter-option-checkbox').each((i, elem) => {
                                                $(elem).find('input').prop('checked', false);
                                            })
                                        }}><span className="fa fa-times"></span>&nbsp;&nbsp;Clear All</button>
                                    </div>
                                    <div className="col-6 pr-0">
                                        <button type="submit" className="btn-success-bs w-100" style={{height: 40}}><span className="fa fa-check"></span>&nbsp;&nbsp;Apply</button>
                                    </div>
                                </div>
                            </div>
                        </form>   
                        </div>

                        {/* Modal footer
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                        </div> */}

                        </div>
                    </div>
                </div>
            </section>
        ) : (
            <div id="loader" style={{position:'fixed',left:0,top:0,width:'100%',height:'100%',zIndex:100,background:"url('./loader.gif') center no-repeat #fff"}}></div>
        )
    }
}