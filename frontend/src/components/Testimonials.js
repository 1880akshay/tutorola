import React, { Component } from "react";
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';

export default class Testimonials extends Component {

	render() {
		const options = {
			items: 1,
			nav: false,
			autoplay: true,
			autoplayTimeout: 5000,
			autoplayHoverPause: true,
			loop: true,
			dots: true,
		}
		return (
			<div className="slide-2 py-3">
				<div className="container py-5">
					<h2 className="section-title mb-5" style={{color: '#fff', zIndex: 1, textAlign: 'center', position: 'relative'}}>What our Students say...</h2>
					<div className="row justify-content-center align-items-center">	
						<div className="col-md-9">
							<OwlCarousel {...options}>
								<div className="col-md-12 text-center testimony">
									<img src="images/avatar.png" alt="" className="img-fluid mb-4 rounded-circle testimonial-img" />
									<div className="mb-4" style={{color: '#fff', fontSize: 'larger', fontWeight: 600}}>Jerome Jensen</div>
									<blockquote>
									<p>&ldquo; Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum rem soluta sit eius necessitatibus voluptate excepturi beatae ad eveniet sapiente impedit quae modi quo provident odit molestias! Rem reprehenderit assumenda &rdquo;</p>
									</blockquote>
								</div>
								<div className="col-md-12 text-center testimony">
									<img src="images/avatar.png" alt="" className="img-fluid mb-4 rounded-circle testimonial-img" />
									<div className="mb-4" style={{color: '#fff', fontSize: 'larger', fontWeight: 600}}>Jerome Jensen</div>
									<blockquote>
									<p>&ldquo; Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum rem soluta sit eius necessitatibus voluptate excepturi beatae ad eveniet sapiente impedit quae modi quo provident odit molestias! Rem reprehenderit assumenda &rdquo;</p>
									</blockquote>
								</div>
								<div className="col-md-12 text-center testimony">
									<img src="images/avatar.png" alt="" className="img-fluid mb-4 rounded-circle testimonial-img" />
									<div className="mb-4" style={{color: '#fff', fontSize: 'larger', fontWeight: 600}}>Jerome Jensen</div>
									<blockquote>
									<p>&ldquo; Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum rem soluta sit eius necessitatibus voluptate excepturi beatae ad eveniet sapiente impedit quae modi quo provident odit molestias! Rem reprehenderit assumenda &rdquo;</p>
									</blockquote>
								</div>
								<div className="col-md-12 text-center testimony">
									<img src="images/avatar.png" alt="" className="img-fluid mb-4 rounded-circle testimonial-img" />
									<div className="mb-4" style={{color: '#fff', fontSize: 'larger', fontWeight: 600}}>Jerome Jensen</div>
									<blockquote>
									<p>&ldquo; Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum rem soluta sit eius necessitatibus voluptate excepturi beatae ad eveniet sapiente impedit quae modi quo provident odit molestias! Rem reprehenderit assumenda &rdquo;</p>
									</blockquote>
								</div>
							</OwlCarousel>
						</div>					
						
						
					</div>
				</div>
			</div>
		);
	}
}
