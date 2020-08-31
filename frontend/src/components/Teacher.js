import React from "react";
function Teacher() {
	return (
		<div className="site-section" id="teachers-section">
			<div className="container">
				<div className="row mb-5 justify-content-center">
					<div
						className="col-lg-7 mb-5 text-center"
						data-aos="fade-up"
						data-aos-delay=""
					>
						<h2 className="section-title">Our Teachers</h2>
						<p className="mb-5">
							Lorem ipsum dolor sit amet, consectetur adipisicing
							elit. Magnam repellat aut neque! Doloribus sunt non
							aut reiciendis, vel recusandae obcaecati hic dicta
							repudiandae in quas quibusdam ullam, illum sed
							veniam!
						</p>
					</div>
				</div>

				<div className="row">
					<div
						className="col-md-6 col-lg-4 mb-4"
						data-aos="fade-up"
						data-aos-delay="100"
					>
						<div className="teacher text-center">
							<img
								src="images/person_1.jpg"
								alt="Image"
								className="img-fluid w-50 rounded-circle mx-auto mb-4"
							/>
							<div className="py-2">
								<h3 className="text-black">Benjamin Stone</h3>
								<p className="position">Physics Teacher</p>
								<p>
									Lorem ipsum dolor sit amet, consectetur
									adipisicing elit. Porro eius suscipit
									delectus enim iusto tempora, adipisci at
									provident.
								</p>
							</div>
						</div>
					</div>

					<div
						className="col-md-6 col-lg-4 mb-4"
						data-aos="fade-up"
						data-aos-delay="200"
					>
						<div className="teacher text-center">
							<img
								src="images/person_2.jpg"
								alt="Image"
								className="img-fluid w-50 rounded-circle mx-auto mb-4"
							/>
							<div className="py-2">
								<h3 className="text-black">Katleen Stone</h3>
								<p className="position">Physics Teacher</p>
								<p>
									Lorem ipsum dolor sit amet, consectetur
									adipisicing elit. Porro eius suscipit
									delectus enim iusto tempora, adipisci at
									provident.
								</p>
							</div>
						</div>
					</div>

					<div
						className="col-md-6 col-lg-4 mb-4"
						data-aos="fade-up"
						data-aos-delay="300"
					>
						<div className="teacher text-center">
							<img
								src="images/person_3.jpg"
								alt="Image"
								className="img-fluid w-50 rounded-circle mx-auto mb-4"
							/>
							<div className="py-2">
								<h3 className="text-black">Sadie White</h3>
								<p className="position">Physics Teacher</p>
								<p>
									Lorem ipsum dolor sit amet, consectetur
									adipisicing elit. Porro eius suscipit
									delectus enim iusto tempora, adipisci at
									provident.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
export default Teacher;
