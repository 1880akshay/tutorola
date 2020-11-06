import React, { Component } from "react";
import $ from 'jquery';

export default class HomePage extends Component {

	state = {
		subject: '',
		topic: '',

		loaded: false
	}

	componentDidMount() {
		/* var checkbox = $('ul.ks-cboxtags input');
		checkbox.change(() => {
			if(checkbox.is(':checked')) {
				checkbox.removeAttr('required');
			}
			else {
				checkbox.attr('required', 'required');
			}
		}); */
		fetch('/api/topicRequest/getSubjects')
		.then(res => res.json())
		.then(data => {
			this.setState({loaded: true});
			for(var i=0; i<data.length; i++) {
				$('.subject-dropdown').append('<option value="'+data[i].name+'" data-sub-id="'+data[i].id+'">'+data[i].name+'</option>');
			}
		})
	}

	topicRequestFormSubmit = (e) => {
		e.preventDefault();
		$('form button').attr('disabled', 'true');
		fetch('/api/topicRequest/submit', {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify(this.state)
		})
		.then(res => res.json())
		.then(data => {
			$('form button').removeAttr('disabled');
			if(data.status === 'success') {
				if(!alert('Request successful!')) window.location.reload();
			}
			else {
				if(!alert('An error occurred!')) window.location.reload();
			}
		})
	}

	subjectChange = (e) => {
		this.setState({subject: e.target.value});
		var subId = Number($('.subject-dropdown option:selected').attr('data-sub-id'));
		if(subId) {
			fetch('/api/topicRequest/getTopics', {
				method: 'POST',
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify({subId})
			})
			.then(res => res.json())
			.then(data => {
				data.sort((a, b) => (a.name > b.name) ? 1 : -1);
				$('.topic-dropdown').empty();
				$('.topic-dropdown').append('<option value="">Topic</option>');
				for(var i=0; i<data.length; i++) {
					$('.topic-dropdown').append('<option value="'+data[i].name+'">'+data[i].name+'</option>');
				}
			})
		}
		else {
			$('.topic-dropdown').empty();
			$('.topic-dropdown').append('<option value="">Select Topic</option>');
		}

	}

	render() {
		return (this.state.loaded) ? (
			<div className="intro-section" id="home">
		  
			<div className="slide-1" style={{backgroundImage: 'url("images/hero_1.jpg")'}} data-stellar-background-ratio="0.5">
				<div className="container">
				<div className="row align-items-center">
					<div className="col-12">
					<div className="row align-items-center">
						<div className="col-lg-6 mb-4">
						<h1  data-aos="fade-up" data-aos-delay="100" style={{fontWeight: 800, fontSize: 45}}>Stuck Somewhere ?</h1>
						<p className="mb-4"  data-aos="fade-up" data-aos-delay="200">Get a chance to interact with students of IIT Kharagpur and listen to their success stories to get proper guidance and mentorship.</p>
						{/* <p data-aos="fade-up" data-aos-delay="300"><a href="#" className="btn btn-primary py-3 px-5 btn-pill">Admission Now</a></p> */}
						<div className="container-fluid">
						<form onSubmit={this.topicRequestFormSubmit} className="row topic-form" data-aos="fade-up">
							{/* <h3 className="h4 text-black mb-4">Sign Up</h3> */}
							
							<div className="form-group col-md-4 col-6">
								<select id="custom-select" className="subject-dropdown" required value={this.state.subject} onChange={this.subjectChange}>
									<option value="" data-sub-id="0">Subject</option>
								</select>
								<i className="fa fa-angle-down" id="custom-select-icon-2"></i>
							</div>
							<div className="form-group col-md-4 col-6">
								<select id="custom-select" className="topic-dropdown" required value={this.state.topic} onChange={(e) => this.setState({topic: e.target.value})}>
									<option value="">Topic</option>
								</select>
								<i className="fa fa-angle-down" id="custom-select-icon-2"></i>
							</div>
							{/* <div className="jee-neet-checkbox-wrapper mb-4">
								<ul className="ks-cboxtags row justify-content-center pl-0">
									<div className="col-6"><li><input type="checkbox" id="jee-check" value="jee" required onChange={(e) => {if(!this.state.jee) this.setState({jee: true}); else this.setState({jee: false});}} /><label htmlFor="jee-check">JEE</label></li></div>
									<div className="col-6"><li><input type="checkbox" id="neet-check" value="neet" required onChange={(e) => {if(!this.state.neet) this.setState({neet: true}); else this.setState({neet: false});}} /><label htmlFor="neet-check">NEET</label></li></div>
								</ul>
							</div> */}
							<div className="form-group col-md-4 col-12">
							<button type="submit" className="btn btn-primary w-100" style={{borderRadius: 0, height: 45, padding: 0}}>Book free class</button>
							</div>
						</form>
						</div>


						</div>
	
						<div className="col-lg-6 ml-auto" data-aos="fade-up" data-aos-delay="400" style={{display:'flex', justifyContent: 'center'}}>
							<img src="./images/teacher.png" style={{width: '85%'}} alt="" />
	
						</div>
					</div>
					</div>
					
				</div>
				</div>
			</div>
			</div>
		) : (
			<div id="loader" style={{position:'fixed',left:0,top:0,width:'100%',height:'100%',zIndex:100,background:"url('./loader.gif') center no-repeat #fff"}}></div>
		)
	}
	
}
