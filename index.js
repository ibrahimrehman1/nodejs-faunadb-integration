const express = require("express");
const faunadb = require("faunadb");
const dotenv = require("dotenv").config()

const app = express();

app.use(express.json());

let q = faunadb.query;

var client = new faunadb.Client({
  secret: process.env.DATABASE_SECRET,
  domain: "db.fauna.com",
  // NOTE: Use the correct domain for your database's Region Group.
  port: 443,
  scheme: "https",
});

app.post("/", async (req, res) => {
  try {
    var createP = await client.query(
      q.Create(q.Collection("test"), { data: { testField: "testValue3" } })
    );

    console.log(createP);
    res.json({ text: "Hello World!" });
  } catch (e) {
    console.log(e.message);
    res.json({ error: e.message });
  }
});

app.listen(process.env.PORT, () => console.log(`Server running on PORT ${process.env.PORT}`));
