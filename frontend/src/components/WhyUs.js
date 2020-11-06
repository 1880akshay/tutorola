import React from "react";

function WhyUs() {
	return (
		<div className="site-section" id="why-us">
			<div className="container">
				<div className="row mb-5 justify-content-center">
					<div
						className="col-lg-7 mb-5 text-center"
						data-aos="fade-up"
						data-aos-delay=""
					>
						<h2 className="section-title">Why Choose Us ?</h2>
						
					</div>
				</div>

				<div className="row">
					<div
						className="col-md-6 col-lg-3 mb-4"
						data-aos="fade-up"
						data-aos-delay="100"
					>
						<div className="teacher text-center bg-white">
							<img
								src="images/tutor.jpg"
								alt="Expert Tutors"
								className="img-fluid w-40 rounded-circle mx-auto mb-4"
							/>
							<div className="py-2">
								<h3 className="text-black">Expert Tutors</h3>
								<p>
									We provide tutors from IITs & various other top tier colleges
								</p>
								
							</div>
						</div>
					</div>

					<div
						className="col-md-6 col-lg-3 mb-4"
						data-aos="fade-up"
						data-aos-delay="200"
					>
						<div className="teacher text-center bg-white">
							<img
								src="images/profile.jpg"
								alt="Authentic Profiles"
								className="img-fluid w-40 rounded-circle mx-auto mb-4"
							/>
							<div className="py-2">
								<h3 className="text-black">Authentic Profiles</h3>
								<p>
									We carefully check and confirm each tutor's profile
								</p>
								
							</div>
						</div>
					</div>

					<div
						className="col-md-6 col-lg-3 mb-4"
						data-aos="fade-up"
						data-aos-delay="300"
					>
						<div className="teacher text-center bg-white">
							<img
								src="images/timing.jpg"
								alt="Flexible Timings"
								className="img-fluid w-40 rounded-circle mx-auto mb-4"
							/>
							<div className="py-2">
								<h3 className="text-black">Flexible Timings</h3>
								<p>
									Take online classes at the timings which suits you best
								</p>
								
							</div>
						</div>
					</div>
					<div
						className="col-md-6 col-lg-3 mb-4"
						data-aos="fade-up"
						data-aos-delay="300"
					>
						<div className="teacher text-center bg-white">
							<img
								src="images/price.jpg"
								alt="Affordable prices"
								className="img-fluid w-40 rounded-circle mx-auto mb-4"
							/>
							<div className="py-2">
								<h3 className="text-black">Affordable prices</h3>
								<p>
									We provide best quality courses that fits your budget
								</p>
								
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
export default WhyUs;
