import { Fragment, useRef } from "react";
import { MongoClient } from "mongodb";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSession, signIn, signOut } from "next-auth/react";
import { BsTelephone } from "react-icons/Bs";
import { FiMail } from "react-icons/Fi";
import { TiSocialTwitter, TiSocialLinkedin } from "react-icons/Ti";
import { SiFiverr, SiUpwork } from "react-icons/Si";
import { RiDeleteBin6Line } from "react-icons/Ri";
import classes from "./contacts.module.css";

async function sendMessageData(details) {
  const response = await fetch("api/messagedetails", {
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

async function deleteMessage(idreceived) {
  const body = { id: idreceived };
  const response = await fetch("api/messagedetails", {
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

function Contacts(props) {
  const storedMessages = JSON.parse(props.messagedetailsdata);

  const { data: session } = useSession();

  const nameRef = useRef();
  const emailRef = useRef();
  const messageRef = useRef();

  const router = useRouter();

  async function submitHandler(event) {
    event.preventDefault();
    const enteredName = nameRef.current.value;
    const enteredEmail = emailRef.current.value;
    const enteredMessage = messageRef.current.value;

    const messageDetails = {
      name: enteredName,
      email: enteredEmail,
      message: enteredMessage,
    };

    try {
      await sendMessageData(messageDetails);
    } catch (error) {}

    nameRef.current.value = "";
    emailRef.current.value = "";
    messageRef.current.value = "";
  }

  return (
    <Fragment>
      <section>
        <div className={classes.contact}>
          <div className={classes.title}>
            <h2>Contact me</h2>
          </div>
          <div className={classes.contacts}>
            <div className={classes.phone}>
              <BsTelephone /> <p>+254113270070</p>
            </div>
            <div className={classes.email}>
              <FiMail />
              <p>jespermoseti93@gmail.com</p>
            </div>
          </div>

          <div className={classes.social}>
            <Link href="https://twitter.com/MosetiJesper">
              <a>
                <TiSocialTwitter />
              </a>
            </Link>
            <Link href="https://linkedin.com/in/moseti-jesper-530710a0">
              <a>
                <TiSocialLinkedin />
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
          </div>
          <h3>Leave a message</h3>
          <div className={classes.message}>
            <form onSubmit={submitHandler}>
              <div className={classes.control}>
                <label htmlFor="title">Name</label>
                <input type="name" id="title" required ref={nameRef} />
              </div>
              <div className={classes.control}>
                <label htmlFor="title">Email</label>
                <input type="email" id="title" required ref={emailRef} />
              </div>
              <div className={classes.control}>
                <label htmlFor="description">Message</label>
                <textarea
                  rows="10"
                  id="description"
                  required
                  ref={messageRef}
                />
              </div>
              <button className={classes.btn}>Send</button>
            </form>
          </div>
        </div>
      </section>
      {session && (
        <section className={classes.messages}>
          <h3>Messages</h3>

          {storedMessages.map((message) => (
            <div className={classes.details} key={message._id}>
              <div className={classes.detail}>
                <h4>{`${message.name}(${message.email})`}</h4>
              </div>
              <div className={classes.detail}>{message.message}</div>
              <div
                className={classes.deletebtn}
                onClick={() => (
                  deleteMessage(message._id), router.push("/contacts")
                )}
              >
                <RiDeleteBin6Line />
              </div>
            </div>
          ))}
        </section>
      )}
    </Fragment>
  );
}

export async function getStaticProps(context) {
  // const client = await MongoClient.connect(
  //   "mongodb+srv://<username>:<password>@<clustername>.ibpnt47.mongodb.net/<database>?retryWrites=true&w=majority"
  // );
  const connectionString = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.ibpnt47.mongodb.net/${process.env.mongodb_database}?retryWrites=true&w=majority`;
  const client = await MongoClient.connect(connectionString);

  const db = client.db();

  const messagedetailsarray = await db
    .collection("messagedetails")
    .find()
    .toArray();

  const messageDetails = JSON.stringify(messagedetailsarray);

  client.close();

  return {
    props: {
      messagedetailsdata: messageDetails,
    },
    revalidate: 60,
  };
}

export default Contacts;
