import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/Gi";
import { RiCloseLine } from "react-icons/Ri";
import classes from "./hamburger.module.css";

function Hamburger(props) {
  return (
    <div className={classes.hamburger}>
      <div onClick={props.navLinkHandler}>
        {props.showNavLinks ? <RiCloseLine /> : <GiHamburgerMenu />}
      </div>
    </div>
  );
}

export default Hamburger;
