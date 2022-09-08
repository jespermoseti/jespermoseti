import { Fragment, useRef } from "react";
import { MongoClient } from "mongodb";
import { useRouter } from "next/router";
import { useSession, signIn, signOut } from "next-auth/react";
import { getSession } from "next-auth/react";
import classes from "./dashboard.module.css";
import { RiDeleteBin6Line } from "react-icons/ri";

async function sendBriefDescriptionData(details) {
  const response = await fetch("api/descriptiondetails", {
    method: "POST",
    body: JSON.stringify(details),
    headers: { "Content-Type": "application/json" },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "something went wrong!!");
  }

  alert(data.message);
  //return data
}

async function sendAboutData(details) {
  const response = await fetch("api/aboutdetails", {
    method: "POST",
    body: JSON.stringify(details),
    headers: { "Content-Type": "application/json" },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "something went wrong!!");
  }

  alert(data.message);

  //return data
}

async function sendSkillsData(details) {
  const response = await fetch("api/skillsdetails", {
    method: "POST",
    body: JSON.stringify(details),
    headers: { "Content-Type": "application/json" },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "something went wrong!!");
  }

  alert(data.message);

  //return data
}

async function deleteDescription(idreceived) {
  const body = { id: idreceived };
  const response = await fetch("api/descriptiondetails", {
    method: "DELETE",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "something went wrong!!");
  }

  alert(data.message);
  //return data
}

async function deleteAbout(idreceived) {
  const body = { id: idreceived };
  const response = await fetch("api/aboutdetails", {
    method: "DELETE",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "something went wrong!!");
  }

  alert(data.message);
  //return data
}

async function deleteSkill(idreceived) {
  const body = { id: idreceived };
  const response = await fetch("api/skillsdetails", {
    method: "DELETE",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "something went wrong!!");
  }

  alert(data.message);
  //return data
}

function Dashboard(props) {
  const storeddescriptions = JSON.parse(props.descriptiondata);
  const storedabouts = JSON.parse(props.aboutdata);
  const storedskills = JSON.parse(props.skillsdata);

  const descriptionInputRef = useRef();
  const aboutInputRef = useRef();
  const skillInputRef = useRef();
  const skillDescriptionInputRef = useRef();

  const { data: session } = useSession();

  const router = useRouter();

  async function briefDescriptionDataHandler(event) {
    event.preventDefault();

    //optional:add client-side validation

    const enteredDescription = descriptionInputRef.current.value;

    try {
      await sendBriefDescriptionData({
        description: enteredDescription,
      });
    } catch (error) {}
    descriptionInputRef.current.value = "";
    aboutInputRef.current.value = "";
    router.push("/dashboard");
  }

  async function aboutDataHandler(event) {
    event.preventDefault();

    //optional:add client-side validation

    const enteredAbout = aboutInputRef.current.value;

    try {
      await sendAboutData({
        about: enteredAbout,
      });
    } catch (error) {}
    descriptionInputRef.current.value = "";
    aboutInputRef.current.value = "";
    router.push("/dashboard");
  }

  async function skillsDataHandler(event) {
    event.preventDefault();

    //optional:add client-side validation

    const enteredSkillDescription = skillDescriptionInputRef.current.value;
    const enteredSkill = skillInputRef.current.value;

    try {
      await sendSkillsData({
        description: enteredSkillDescription,
        skill: enteredSkill,
      });
    } catch (error) {}
    skillDescriptionInputRef.current.value = "";
    skillInputRef.current.value = "";
    router.push("/dashboard");
  }

  return (
    <Fragment>
      <section className={classes.dashboard}>
        <form className={classes.form} onSubmit={briefDescriptionDataHandler}>
          <div className={classes.controls}>
            <div className={classes.control}>
              <label htmlFor="description">Brief description</label>
              <textarea
                rows="5"
                id="description"
                ref={descriptionInputRef}
                required
              />
            </div>
          </div>

          <button className={classes.btn}>Submit</button>
        </form>
        <form onSubmit={aboutDataHandler}>
          <div className={classes.controls}>
            <div className={classes.control}>
              <label htmlFor="description">About</label>
              <textarea
                rows="10"
                id="description"
                ref={aboutInputRef}
                required
              />
            </div>
          </div>
          <button className={classes.btn}>Submit</button>
        </form>
        <form className={classes.form} onSubmit={skillsDataHandler}>
          <div className={classes.control}>
            <label htmlFor="title">Skill</label>
            <input type="name" id="title" required ref={skillInputRef} />
          </div>
          <div className={classes.control}>
            <label htmlFor="description">Description</label>
            <textarea
              rows="10"
              id="description"
              required
              ref={skillDescriptionInputRef}
            />
          </div>
          <button className={classes.btn}>Add</button>
        </form>
      </section>
      <section className={classes.description}>
        <h3>Description Details</h3>

        {storeddescriptions.map((description) => (
          <div className={classes.details} key={description._id}>
            <div className={classes.detail}>{description.description}</div>
            <div
              className={classes.deletebtn}
              onClick={() => (
                deleteDescription(description._id), router.push("/dashboard")
              )}
            >
              <RiDeleteBin6Line />
            </div>
          </div>
        ))}
      </section>
      <section className={classes.description}>
        <h3>About Details</h3>

        {storedabouts.map((about) => (
          <div className={classes.details} key={about._id}>
            <div className={classes.detail}>{about.about}</div>
            <div
              className={classes.deletebtn}
              onClick={() => (
                deleteAbout(about._id), router.push("/dashboard")
              )}
            >
              <RiDeleteBin6Line />
            </div>
          </div>
        ))}
      </section>
      <section className={classes.description}>
        <h3>Skills Details</h3>

        {storedskills.map((skill) => (
          <div key={skill._id}>
            <div className={classes.detail}>
              <h4>{skill.skill}</h4>
            </div>
            <div className={classes.details}>
              <div className={classes.detail}>{skill.description}</div>
              <div
                className={classes.deletebtn}
                onClick={() => (
                  deleteSkill(skill._id), router.push("/dashboard")
                )}
              >
                <RiDeleteBin6Line />
              </div>
            </div>
          </div>
        ))}
      </section>
    </Fragment>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  // const client = await MongoClient.connect(
  //   "mongodb+srv://<username>:<password>@<clustername>.ibpnt47.mongodb.net/<database>?retryWrites=true&w=majority"
  // );

  const connectionString = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.ibpnt47.mongodb.net/${process.env.mongodb_database}?retryWrites=true&w=majority`;
  const client = await MongoClient.connect(connectionString);

  const db = client.db();

  const descriptionarray = await db
    .collection("descriptiondetails")
    .find()
    .toArray();

  const aboutarray = await db.collection("aboutdetails").find().toArray();

  const skillsarray = await db.collection("personalskills").find().toArray();

  const description = JSON.stringify(descriptionarray);

  const about = JSON.stringify(aboutarray);

  const skills = JSON.stringify(skillsarray);

  client.close();

  return {
    props: {
      session: session,
      descriptiondata: description,
      aboutdata: about,
      skillsdata: skills,
    },
  };
}

export default Dashboard;
