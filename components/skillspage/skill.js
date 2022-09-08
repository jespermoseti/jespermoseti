import classes from "./skill.module.css";
function Skill(props) {
  return (
    <div className={classes.skill}>
      <h2>{props.skillitem.skill}</h2>
      <p>{props.skillitem.description}</p>
    </div>
  );
}
export default Skill;
