import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Hamburger from "./hamburger";
import Logo from "./logo";
import Overlay from "./overlay";
import { useSession, signIn, signOut } from "next-auth/react";

import classes from "./main-navigation.module.css";

function MainNavigation() {
  const [showNavLinks, setShowNavLinks] = useState(false);

  const router = useRouter();

  const { data: session } = useSession();

  function navLinkHandler() {
    // setShowNavLinks((prevState) => !prevState);//more elegant alternative

    showNavLinks ? setShowNavLinks(false) : setShowNavLinks(true);
  }
  return (
    <header className={classes.header}>
      <div className={classes.headcontent}>
        <div className={classes.headitems}>
          <Link href="/">
            <a>
              <Logo />
            </a>
          </Link>
          <Hamburger
            showNavLinks={showNavLinks}
            navLinkHandler={navLinkHandler}
          />
        </div>
      </div>
      <nav
        className={showNavLinks ? classes.navigation : classes.hidenavigation}
      >
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
            <Link href="https://blog.techonsolutions.com/">Blog</Link>
          </li>
          <li>
            <Link href="/contacts">Contacts</Link>
          </li>
          {session && (
            <li>
              <Link href="/dashboard">Dashboard</Link>
            </li>
          )}

          <button
            className={classes.signbtn}
            onClick={session ? () => signOut() : () => router.push("/auth")}
          >
            {session ? "Sign Out" : "Login"}
          </button>
        </ul>
      </nav>
      {showNavLinks ? <Overlay navLinkHandler={navLinkHandler} /> : ""}
    </header>
  );
}

export default MainNavigation;
