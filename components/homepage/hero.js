import Image from "next/image";
import classes from "./hero.module.css";
function Hero(props) {
  const title = "Hi, I'm Jesper";
  return (
    <section className={classes.hero}>
      <div className={classes.image}>
        <Image
          src="/images/jesper-image.JPG"
          alt="an image showing jes"
          width={300}
          height={300}
        />
      </div>
      <h1>{title}</h1>

      {props.aboutdata.map((item) => (
        <p key={item._id}>{item.description}</p>
      ))}
    </section>
  );
}

export default Hero;
