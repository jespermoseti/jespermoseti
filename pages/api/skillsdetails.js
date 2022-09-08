import { MongoClient } from "mongodb";
import { ObjectId } from "bson";

async function handler(req, res) {
  if (req.method === "POST") {
    const { skill, description } = req.body;

    if (
      !description ||
      !skill ||
      description.trim() === "" ||
      skill.trim() === ""
    ) {
      res.status(422).json({ message: "INVALID INPUT" });
      return;
    }

    const details = { description, skill };

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
      const result = await db.collection("personalskills").insertOne(details);
      details.id = result.insertedId;
    } catch (error) {
      client.close();
      res.status(500).json({ message: "Storing details failed!!" });
      return;
    }

    client.close();

    res.status(201).json({ message: "Successifully stored" });
  }

  //delete request

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
        .collection("personalskills")
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
