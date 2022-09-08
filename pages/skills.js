import { MongoClient } from "mongodb";
import Skill from "../components/skillspage/skill";
import classes from "./skills.module.css";

function Skills(props) {
  const skillsdata = JSON.parse(props.data);

  return (
    <div className={classes.skillspage}>
      {skillsdata.map((skillitem) => (
        <div key={skillitem._id}>
          <Skill skillitem={skillitem} />
        </div>
      ))}
    </div>
  );
}

export async function getStaticProps(context) {
  // const client = await MongoClient.connect(
  //   "mongodb+srv://<username>:<password>@<clustername>.ibpnt47.mongodb.net/<database>?retryWrites=true&w=majority"
  // );

  const connectionString = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.ibpnt47.mongodb.net/${process.env.mongodb_database}?retryWrites=true&w=majority`;
  const client = await MongoClient.connect(connectionString);

  const db = client.db();

  const dataarray = await db.collection("personalskills").find().toArray();

  const array = JSON.stringify(dataarray);

  client.close();

  return {
    props: {
      data: array,
    },
    revalidate: 60,
  };
}

export default Skills;
