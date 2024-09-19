import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhoneAlt,
  faEnvelope,
  faCopyright,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebookF,
  faTwitter,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";
import logo from "../../assets/img/LOGO.png";
import footer from "../../assets/img/bg/footer-bg-2-1.jpg";
import campus from "../../assets/img/about/contact-1.jpg";

const Footer = () => {
  return (
    <footer
      className="footer-wrapper footer-layout2"
      style={{
        backgroundImage: `url(${footer})`,
        marginTop: "auto",
        padding: "10px",
        overflow: "hidden",
      }}
    >
      <div className="widget-area">
        <div style={{ marginLeft: "10%", marginRight: "10%" }}>
          <div className="row justify-content-between">
            <div className="col-md-6 col-xl-3">
              <div className="widget footer-widget">
                <div className="vs-widget-about">
                  <div className="footer-logo">
                    <a href="index.html">
                      <img src={logo} alt="logo" />
                    </a>
                  </div>
                  <p className="footer-text">
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                    Donec commodo ligula in dolor lacinia, ut imperdiet sapien
                    dictum.
                  </p>
                  <div className="footer-media">
                    <div className="media-icon">
                      <FontAwesomeIcon icon={faPhoneAlt} />
                    </div>
                    <div className="media-body">
                      <span className="media-title">University Prospects</span>
                      <a href="#">Download.pdf</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-xl-3">
              <div className="widget footer-widget">
                <h3 className="widget_title">Find Campus</h3>
                <div className="footer-campus">
                  <div className="campus-img mega-hover">
                    <a href="#">
                      <img className="w-100" src={campus} alt="Campus Image" />
                    </a>
                  </div>
                  <p className="campus-address">
                    <FontAwesomeIcon icon={faAngleRight} /> 1309 Beacon Street,
                    Suite 300, Brookline, MA, 02446
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-xl-3">
              <div className="widget nav_menu footer-widget">
                <h3 className="widget_title">Popular Subjects</h3>
                <div className="menu-all-pages-container footer-menu">
                  <ul className="menu">
                    <li>
                      <a href="course.html">
                        <FontAwesomeIcon icon={faAngleRight} /> Business and
                        Management
                      </a>
                    </li>
                    <li>
                      <a href="course.html">
                        <FontAwesomeIcon icon={faAngleRight} /> Healthcare and
                        Medicine
                      </a>
                    </li>
                    <li>
                      <a href="course.html">
                        <FontAwesomeIcon icon={faAngleRight} /> Teaching
                      </a>
                    </li>
                    <li>
                      <a href="course.html">
                        <FontAwesomeIcon icon={faAngleRight} /> Psychology and
                        Mental Health
                      </a>
                    </li>
                    <li>
                      <a href="course.html">
                        <FontAwesomeIcon icon={faAngleRight} /> IT and Computer
                        Science
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-xl-3">
              <div className="widget footer-widget">
                <div className="contact-style1">
                  <h4 className="contact-title">Looking to study with us?</h4>
                  <p className="contact-text">Speak to an adviser</p>
                  <a href="tel:+00123456789" className="contact-number h5">
                    <FontAwesomeIcon icon={faPhoneAlt} /> (+216) 23 456 789
                  </a>
                  <a href="tel:+88123555787" className="contact-number h5">
                    <FontAwesomeIcon icon={faPhoneAlt} /> (+216) 23 555 787
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="copyright-wrap">
        <div className="container">
          <div className="row justify-content-between align-items-center">
            <div className="text-center col-lg-auto">
              <p className="copyright-text">
                Copyright <FontAwesomeIcon icon={faCopyright} /> 2023{" "}
                <a href="index.html">Educino</a>. All Rights Reserved By{" "}
                <a href="https://themeforest.net/user/vecuro_themes">Vecuro</a>
              </p>
            </div>
            <div className="col-auto d-none d-lg-block">
              <div className="social-style1">
                <a
                  href="https://www.facebook.com/profile.php?id=61561551282308"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon icon={faFacebookF} /> Facebook
                </a>
                <a href="#">
                  <FontAwesomeIcon icon={faTwitter} /> Twitter
                </a>
                <a
                  href="https://www.linkedin.com/company/profeel-tn/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon icon={faLinkedinIn} /> LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
