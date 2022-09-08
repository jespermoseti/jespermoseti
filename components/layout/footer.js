import { Fragment } from "react";
import Link from "next/link";
import { TiSocialTwitter, TiSocialLinkedin } from "react-icons/Ti";
import { BsTelephone } from "react-icons/Bs";
import { FiMail } from "react-icons/Fi";
import { SiFiverr, SiUpwork } from "react-icons/Si";
import classes from "./footer.module.css";
function Footer() {
  const d = new Date();
  let Year = d.getFullYear();

  return (
    <Fragment>
      <footer className={classes.footer}>
        <div className={classes.personality}>
          <h4>Jesper Moseti Onsoti</h4>
          <p>
            A technology specialist, founder and consultant at techonsolutions
          </p>
        </div>
        <div className={classes.navlinks}>
          <ul>
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              <Link href="/skills">Skills</Link>
            </li>
            <li>
              <Link href="/portifolio">Portifolio</Link>
            </li>
            <li>
              <Link href="/contacts">Contacts</Link>
            </li>
          </ul>
        </div>
        <div className={classes.contacts}>
          <div className={classes.contact}>
            <p>
              <BsTelephone />
              <span> </span>Call me: +254113270070
            </p>
            <p>
              <FiMail />
              <span> </span>Email me: jespermoseti93@gmail.com
            </p>
          </div>
          <div className={classes.social}>
            <Link href="https://twitter.com/MosetiJesper">
              <a>
                <TiSocialTwitter />
              </a>
            </Link>
            <Link href="https://www.fiverr.com/jespermoseti">
              <a>
                <SiFiverr />
              </a>
            </Link>
            <Link href="https://www.upwork.com/freelancers/~018e6bb22c6a4ec72c">
              <a>
                <SiUpwork />
              </a>
            </Link>
            <Link href="linkedin.com/in/moseti-jesper-530710a0">
              <a>
                <TiSocialLinkedin />
              </a>
            </Link>
          </div>
        </div>
      </footer>
      <div>
        <div className={classes.legal}>
          <p>Copyright @{Year} Jesper Moseti Onsoti</p>
        </div>
        <div className={classes.scrollup}></div>
      </div>
    </Fragment>
  );
}

export default Footer;
