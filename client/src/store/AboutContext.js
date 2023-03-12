import React from "react";
import classes from "../components/Pages/About.module.css";

const AboutContent = () => {
  return (
    <div className={classes.desc}>
      <p className={classes.sub_desc}>
        We pride ourselves on serving the freshest ingredients, handpicked by
        our experienced chefs, to create mouth-watering dishes that will leave
        you wanting more. From classic comfort food to modern twists on old
        favorites, we have something for everyone.
      </p>

      <p className={classes.sub_desc}>
        With our easy-to-use online food ordering app, you can browse our
        extensive menu, place your order, and have it delivered right to your
        doorstep. You can also choose to pick up your order at your convenience,
        without having to wait in long lines.
      </p>

      <p className={classes.sub_desc}>
        Our dishes are made with love and care, using only the best quality
        ingredients, ensuring that every bite is bursting with flavor.
      </p>

      <p className={classes.sub_desc}>
        So why wait? Order online and enjoy the convenience of having your
        favorite dishes today!
      </p>
    </div>
  );
};

export default AboutContent;
