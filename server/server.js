const dns = require("dns");

dns.setServers(["8.8.8.8", "8.8.4.4"]);

require("dotenv").config();

const express = require("express");
const cors = require("cors");

const { MongoClient } = require("mongodb");

const app = express();

app.use(express.json());
app.use(cors());

const client = new MongoClient(process.env.MONGO_URI);

let students;

app.post("/students", async (req, res) => {
  try {
    const student = req.body;

    const result = await students.insertOne(student);
    console.log(students)

    res.json({
      message: "Student added successfully",
      id: result.insertedId
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to add student"
    });
  }
});

app.get("/students", async (req, res) => {
  try {
    const studentsData = await students.find({}).toArray();

    res.json(studentsData);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch students"
    });
  }
});

app.put("/students/:id", async (req, res) => {
  try {
    const { ObjectId } = require("mongodb");

    const id = req.params.id;
    const present = req.body.present;

    await students.updateOne(
      { _id: new ObjectId(id) },
      { $set: { present: present } }
    );

    res.json({
      message: "Attendance updated successfully"
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to update attendance"
    });
  }
});

app.delete("/students/:id", async (req, res) => {
  try {
    const { ObjectId } = require("mongodb");

    const id = req.params.id;

    await students.deleteOne({
      _id: new ObjectId(id)
    });

    res.json({
      message: "Student deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to delete student"
    });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});

