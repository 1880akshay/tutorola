import React from "react";
function Home() {
	return (
		<div className="intro-section " id="home-section">
			<div className="slide-1" data-stellar-background-ratio="0.5">
				<video
					src="images/video_2.mp4"
					autoplay="true"
					loop="true"
					class="back_video"
				></video>
				<div className="container">
					<div className="row align-items-center">
						<div className="col-12">
							<div className="row align-items-center">
								<div className="col-lg-6 mb-4">
									<h1 data-aos="fade-up" data-aos-delay="100">
										Learn From The Expert
									</h1>
									<p
										className="mb-4"
										data-aos="fade-up"
										data-aos-delay="200"
									>
										Lorem ipsum dolor sit amet consectetur
										adipisicing elit. Maxime ipsa nulla sed
										quis rerum amet natus quas
										necessitatibus.
									</p>
									<p data-aos="fade-up" data-aos-delay="300">
										<a
											href="#"
											className="btn btn-primary py-3 px-5 btn-pill"
										>
											Admission Now
										</a>
									</p>
								</div>

								<div
									className="col-lg-5 ml-auto"
									data-aos="fade-up"
									data-aos-delay="500"
								>
									<div className="form-box">
										<h3 className="h4 text-black mb-4">
											Webinar
										</h3>
										<div className="form-group">
											Lorem ipsum dolor sit amet
											consectetur adipisicing elit. Maxime
											ipsa nulla sed quis rerum amet natus
											quas necessitatibus.
										</div>
										<div className="form-group">
											Lorem ipsum dolor sit amet
											consectetur adipisicing elit. Maxime
											ipsa nulla sed quis rerum amet natus
											quas necessitatibus.
										</div>

										<div className="form-group">
											<input
												type="submit"
												className="btn btn-primary btn-pill"
												value="Resistor"
											/>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
export default Home;
