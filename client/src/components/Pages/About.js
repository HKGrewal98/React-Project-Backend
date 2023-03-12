import React from "react";
import classes from "./About.module.css";
import AboutContent from "../../store/AboutContext";

const About = () => {
  return (
    <div className={classes.card + " " + classes.aboutImage}>
      <p className={classes.title}>About Us</p>
      <AboutContent />
    </div>
  );
};

export default About;
