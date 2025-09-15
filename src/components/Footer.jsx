import React from "react";
import styling from "../styling/footerStyling.module.css";
import { Link } from "react-router-dom";
import { FaFacebook, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <div className={styling.container}>
      <div className={styling.sections}>
        <div className={styling.supoortSec}>
          <p className={styling.title}>Support</p>
          <Link to={"/"} className={styling.link}>
            FAQ
          </Link>
          <Link to={"/"} className={styling.link}>
            Contact Us
          </Link>
          <Link to={"/"} className={styling.link}>
            Privacy Policy
          </Link>
          <Link to={"/"} className={styling.link}>
            Terms of Service
          </Link>
        </div>
        <div className={styling.connectSec}>
          <p className={styling.title}>Connect</p>
          <Link to={"/"}>
            <FaLinkedin className={styling.linkedin} />
          </Link>
          <Link to={"/"}>
            <FaTwitter className={styling.twitter} />
          </Link>
          <Link to={"/"}>
            <FaFacebook className={styling.facebook} />
          </Link>
        </div>
        
      </div>
      <p className={styling.details}>
          &copy; 2025 KinoVerse. All rights reserved. Data sourced from{" "}
          <Link to="https://www.themoviedb.org/" className={styling.tmdb}>
            TMDB
          </Link>
        </p>
    </div>
  );
};

export default Footer;
