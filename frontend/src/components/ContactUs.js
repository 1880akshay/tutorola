import React, {Component} from "react";
import $ from 'jquery';
import { toast } from "react-toastify";

const api='https://backend.tutorola.com';

class Contact extends Component {

	state = {
		name: '',
		email: '',
		message: ''
	}

	submitHandler = (e) => {
		e.preventDefault();
		$('form button').attr('disabled', 'true');

		fetch(api+'/contact', {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify(this.state)
		})
		.then(res => res.json())
		.then(data => {
			$('form button').removeAttr('disabled');
			if(data.status === 'success') {
				//if(!alert('Message sent successfully!')) window.location.reload();
				toast.info('✔ Message sent successfully!');
			}
			else {
				//if(!alert('An error occurred')) window.location.reload();
				toast.info('✖ An error occurred');
			}
			this.setState({name: '', email: '', message: ''});
			$(this).blur();
		})
	}

	render() {
		return (
			<div className="site-section bg-light" id="contact">
				<div className="container">
					<h2 className="section-title mb-3 text-center">Contact Us</h2>
						<p className="mb-5 text-center">
							Feel free to reach out to us in case of any queries, suggestions or feedback!
						</p>
					<div className="row justify-content-center">
						<div className="col-md-7">
							
	
							<form data-aos="fade" onSubmit={this.submitHandler}>
								<div className="form-group row">
									<div className="col-md-12">
										<input
											type="text"
											className="form-control"
											placeholder="Name"
											required
											value={this.state.name}
											onChange={(e) => this.setState({name: e.target.value})}
										/>
									</div>
								</div>
	
								<div className="form-group row">
									<div className="col-md-12">
										<input
											type="email"
											className="form-control"
											placeholder="Email Address"
											required
											value={this.state.email}
											onChange={(e) => this.setState({email: e.target.value})}
										/>
									</div>
								</div>
								<div className="form-group row mb-4">
									<div className="col-md-12">
										<textarea
											className="form-control"
											rows="6"
											placeholder="Write your message here."
											style={{resize: 'none'}}
											required
											value={this.state.message}
											onChange={(e) => this.setState({message: e.target.value})}
										></textarea>
									</div>
								</div>
	
								<div className="form-group row justify-content-center mb-0">
									<div className="col-md-12">
										<button
											type="submit"
											className="btn btn-primary py-3 px-5 btn-block btn-pill"
										>Send Message</button>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
export default Contact;
