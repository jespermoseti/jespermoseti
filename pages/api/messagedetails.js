import { MongoClient } from "mongodb";
import { ObjectId } from "bson";

async function handler(req, res) {
  //post request
  if (req.method === "POST") {
    const { name, email, message } = req.body;

    if (
      !name ||
      name.trim() === "" ||
      !email ||
      email.trim() === "" ||
      !email.includes("@") ||
      !message ||
      message.trim() === ""
    ) {
      console.log(name);
      res.status(422).json({ message: "INVALID INPUT" });
      return;
    }

    const details = { name, email, message }; //{ name: name, email: email, message: message };

    let client;

    try {
      // const client = await MongoClient.connect(
      //   "mongodb+srv://<username>:<password>@<clustername>.ibpnt47.mongodb.net/<database>?retryWrites=true&w=majority"
      // );
      const connectionString = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.ibpnt47.mongodb.net/${process.env.mongodb_database}?retryWrites=true&w=majority`;
      client = await MongoClient.connect(connectionString);
    } catch (error) {
      res.status(500).json(
        // { message: error.message },
        { message: "could not connect to database" }
      );

      return;
    }

    const db = client.db();

    const messagecount = await db
      .collection("messagedetails")
      .countDocuments({ email: email });

    if (messagecount > 1) {
      res.status(422).json({ message: "Kindly wait for a response" });
      client.close();
      return;
    }

    try {
      const result = await db.collection("messagedetails").insertOne(details);
      details.id = result.insertedId;
    } catch (error) {
      client.close();
      res.status(500).json({ message: "Storing details failed!!" });
      return;
    }

    client.close();

    res.status(201).json({ message: "Successifully stored" });
  }

  if (req.method === "DELETE") {
    const { id } = req.body;

    let client;

    try {
      // const client = await MongoClient.connect(
      //   "mongodb+srv://<username>:<password>@<clustername>.ibpnt47.mongodb.net/<database>?retryWrites=true&w=majority"
      // );
      const connectionString = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.ibpnt47.mongodb.net/${process.env.mongodb_database}?retryWrites=true&w=majority`;
      client = await MongoClient.connect(connectionString);
    } catch (error) {
      res.status(500).json(
        // { message: error.message },
        { message: "could not connect to database" }
      );

      return;
    }

    const db = client.db();
    try {
      const data = await db
        .collection("messagedetails")
        .deleteOne({ _id: ObjectId(id) });

      res.status(200).json({ message: "deleted successfully" });
    } catch (error) {
      client.close();
      res.status(500).json({ message: "deleting failed!!" });
      return;
    }

    client.close();
  }
}
export default handler;
