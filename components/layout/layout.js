import { Fragment } from "react";
import Footer from "./footer";
import MainNavigation from "./main-navigation";
import classes from "./layout.module.css";

function Layout(props) {
  return (
    <div className={classes.layout}>
      <MainNavigation />
      <main>{props.children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
