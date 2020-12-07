import React from "react";
function Footer() {
	return (
		<footer className="footer-section bg-white">
			<div className="container">
				<div className="row justify-content-center">
					<div className="col-md-5">
						<h3>About Us</h3>
						<p className="mb-4">
							Tutorola is an EdTech startup founded by students of IIT Kharagpur with a strong vision of establishing a platform where affordable and quality education is provided to all with the help of one on one personalized tutors. 
						</p>
					</div>

					{/* <div className="col-md-3 ml-auto">
						<h3>Links</h3>
						<ul className="list-unstyled footer-links">
							<li>
								<a href="#">Home</a>
							</li>
							<li>
								<a href="#">Courses</a>
							</li>
							<li>
								<a href="#">Programs</a>
							</li>
							<li>
								<a href="#">Teachers</a>
							</li>
						</ul>
					</div> */}
					<div className="col-md-1"></div>
					<div className="col-md-5">
						<a href="mailto:support@tutorola.com"><i className="fa fa-envelope"></i>&emsp;support@tutorola.com</a><br />
						<a href="tel:6204264344"><i className="fa fa-phone"></i>&emsp;&nbsp;7479183592</a><br />
						<span className="text-footer">&nbsp;<i className="fa fa-map-marker"></i>&emsp;&nbsp;IIT Kharagpur, West Bengal</span><br /><hr />
						<a href="https://www.facebook.com/tutorola" className="fa fa-facebook social-icons ml-0"></a>
						<a href="#" className="fa fa-linkedin social-icons"></a>
						<a href="https://www.quora.com/q/nmtqlzmdrjdfgeml" className="fa fa-quora social-icons"></a>
					</div>
				</div>

				{/* <div className="row pt-5 mt-5 text-center">
					<div className="col-md-12">
						<div className="border-top pt-5">
							<p>
								Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0.
								Copyright &copy;
								<script>
									document.write(new Date().getFullYear());
								</script>{" "}
								All rights reserved | This template is made with{" "}
								<i
									className="icon-heart"
									aria-hidden="true"
								></i>{" "}
								by{" "}
								<a href="https://colorlib.com" target="_blank">
									Colorlib
								</a>
								Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0.
							</p>
						</div>
					</div>
				</div> */}
			</div>
		</footer>
	);
}
export default Footer;
