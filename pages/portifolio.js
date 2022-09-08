import Link from "next/link";
import classes from "./portifolio.module.css";

function Portifolio() {
  return (
    <div className={classes.portifoliopage}>
      <h3>Visit</h3>
      <Link href="https://www.techonsolutions.com">
        <a>
          <h1>Techonsolutions</h1>
        </a>
      </Link>
    </div>
  );
}

export default Portifolio;
