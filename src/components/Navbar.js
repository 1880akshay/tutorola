import React, { Component } from "react";
import { Link, NavLink } from 'react-router-dom';
import $ from 'jquery';

class Nav extends Component {

	hideMenu = () => {
		if ( $('body').hasClass('offcanvas-menu') ) {
			$('body').removeClass('offcanvas-menu');
		} else {
			$('body').addClass('offcanvas-menu');
		}
	}
	
	render() {
		return (
			<div id="navbar-container">
				<div className="site-mobile-menu site-navbar-target">
					<div className="site-mobile-menu-header">
						<div className="site-mobile-menu-close mt-3">
							<span className="icon-close2 js-menu-toggle"></span>
						</div>
					</div>
					<div className="site-mobile-menu-body">
						<ul className="site-nav-wrap">
							<li><NavLink exact className="nav-link" to="/" onClick={this.hideMenu}>Home</NavLink></li>
							<li><NavLink exact className="nav-link" to="/about" onClick={this.hideMenu}>About Us</NavLink></li>
							<li><NavLink exact className="nav-link" to="/downloads" onClick={this.hideMenu}>Downloads</NavLink></li>
							<li><NavLink exact className="nav-link" to="/faq" onClick={this.hideMenu}>FAQs</NavLink></li>
							<li><NavLink exact className="nav-link" to="/teacherSignup" onClick={this.hideMenu}>Become a Teacher</NavLink></li>
						</ul>
						<ul className="site-nav-wrap">
							<li className="cta"><Link exact="true" className="nav-link contact-button" to="/studentSignup" onClick={this.hideMenu}><span>Login / Signup</span></Link></li>
						</ul>
					</div>
				</div>
				<header
					className="site-navbar py-4 js-sticky-header site-navbar-target"
					role="banner"
				>
					<div className="container-fluid">
						<div className="d-flex align-items-center">
							<div className="site-logo mr-auto w-25">
								<Link to="/"><img src="./images/logotutorola.png" className="brand-logo-img" alt="tutorola" /></Link>
							</div>
							<div className="mx-auto text-center">
								<nav
									className="site-navigation position-relative text-right"
								>
									<ul className="site-menu main-menu js-clone-nav mx-auto d-none d-lg-block  m-0 p-0">
										<li>
											<NavLink
												exact
												to="/"
												className="nav-link"
											>
												Home
											</NavLink>
										</li>
										<li>
											<NavLink
												exact
												to="/about"
												className="nav-link"
											>
												About Us
											</NavLink>
										</li>
										<li>
											<NavLink
												exact
												to="/downloads"
												className="nav-link"
											>
												Downloads
											</NavLink>
										</li>
										<li>
											<NavLink
												exact
												to="/faq"
												className="nav-link"
											>
												FAQs
											</NavLink>
										</li>
										<li>
											<NavLink
												exact
												to="/teacherSignup"
												className="nav-link"
											>
												Become a Teacher
											</NavLink>
										</li>
										{/* <li>
											<a
												href="#contact"
												className="nav-link"
											>
												Contact
											</a>
										</li> */}
									</ul>
								</nav>
							</div>
							<div className="ml-auto w-25">
								<nav
									className="site-navigation position-relative text-right"
								>
									<ul className="site-menu main-menu site-menu-dark js-clone-nav mr-auto d-none d-lg-block m-0 p-0">
										<li className="cta">
											<Link
												exact="true"
												to="/studentSignup"
												className="nav-link contact-button"
											>
												<span>Login / Signup</span>
											</Link>
										</li>
									</ul>
								</nav>
								<button
									className="d-inline-block d-lg-none site-menu-toggle js-menu-toggle float-right"
									style={{border: 'none', background: 'none', outline: 'none', cursor: 'pointer'}}
								>
									<span className="icon-menu h3"></span>
								</button>
							</div>
						</div>
					</div>
				</header>
			</div>
		);
	}
}
export default Nav;
