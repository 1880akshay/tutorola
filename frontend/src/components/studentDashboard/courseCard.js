import React, { Component } from 'react';
import ContentLoader from 'react-content-loader';
import { Link } from 'react-router-dom';

export default class CourseCard extends Component {

    state= {
        subjectName: '',
        topicName: '',
        subjectLogo: ''
    }

    componentDidMount() {
        fetch('/api/courses/getSubject', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({subjectId: this.props.courseInfo.subjectId})
        })
        .then(res => res.json())
        .then(data => {
            this.setState({subjectName: data.name, subjectLogo: data.logo});
        })

        fetch('/api/courses/getTopic', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({subjectId: this.props.courseInfo.subjectId, topicId: this.props.courseInfo.topicId})
        })
        .then(res => res.json())
        .then(data => {
            this.setState({topicName: data.name});
        })
    }

    render() {
        return (
            <div className="col-lg-4 col-md-6 my-3">
                
                <div className="course-card-wrapper">
                    {
                        (this.state.subjectName && this.state.subjectLogo && this.state.topicName) ? (
                            <div>
                                <Link to={`/courseInfo?id=${this.props.courseId}`} target="_blank">
                                    <div className="course-topic">{this.state.topicName}</div>
                                    <div className="course-subject">({this.state.subjectName})</div>
                                    <div className="course-teacher">By: {this.props.courseInfo.teacherName}</div>
                                    <img src={`./images/${this.state.subjectLogo}`} className="course-logo" alt="" />
                                    <hr />
                                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 13}}>
                                        {(this.props.courseInfo.rating) ? (
                                            <div className="Stars" style={{'--rating': this.props.courseInfo.rating}}></div>
                                        ) : (
                                            <div style={{fontSize: 14, color: 'gray'}}>No ratings yet</div>
                                        )}
                                        <div className="course-price" style={{textAlign: 'right'}}>&#8377; {this.props.courseInfo.price}<span style={{fontSize: 10, fontWeight: 400, color: '#343a40'}}> / hr</span></div>
                                    </div>
                                </Link>
                                <div className="button-group">
                                    <div className="button-group-button">Enroll Now</div>
                                    <div className="button-group-button">View Details</div>
                                </div>
                            </div>
                        ) : (
                            <ContentLoader />
                        )
                    }
                </div>
            </div>
        )
    }
}