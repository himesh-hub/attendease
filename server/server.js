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

async function connectDB() {
    try {
        await client.connect();

        console.log("MongoDB Atlas Connected Successfully");

        const db = client.db("attendanceDB");

        console.log("Database selected:", db.databaseName);

        students = db.collection("students");

        console.log("Students collection selected");

        const studentsList = [
            {
                name: "Himesh",
                rollNo: 101,
                present: true,
                attendancePercentage: 85.5,
                subjects: ["MongoDB", "React"],
                address: {
                    city: "Vadodara",
                    state: "Gujarat"
                }
            },
            {
                name: "Rahul",
                rollNo: 102,
                present: true,
                attendancePercentage: 78.5,
                subjects: ["MongoDB", "React"],
                address: {
                    city: "Surat",
                    state: "Gujarat"
                }
            },
            {
                name: "Priya",
                rollNo: 103,
                present: false,
                attendancePercentage: 92.0,
                subjects: ["MongoDB", "React"],
                address: {
                    city: "Ahmedabad",
                    state: "Gujarat"
                }
            },
            {
                name: "Amit",
                rollNo: 104,
                present: true,
                attendancePercentage: 68.5,
                subjects: ["MongoDB", "React"],
                address: {
                    city: "Rajkot",
                    state: "Gujarat"
                }
            }
        ];

        for (const student of studentsList) {
            const existingStudent = await students.findOne({
                rollNo: student.rollNo
            });

            if (existingStudent) {
                console.log(student.name + " already exists");
            } else {
                await students.insertOne(student);
                console.log(student.name + " inserted successfully");
            }
        }

        const studentsData = await students.find({}).toArray();

        console.log("Students:");
        console.log(studentsData);

        const highAttendanceStudents = await students.find({
            attendancePercentage: { $gt: 80 }
        }).toArray();

        console.log("Students with attendance above 80%:");
        console.log(highAttendanceStudents);

        const lowAttendanceStudents = await students.find({
            attendancePercentage: { $lt: 80 }
        }).toArray();

        console.log("Students with attendance below 80%:");
        console.log(lowAttendanceStudents);

    } catch (error) {
        console.log("MongoDB connection failed");
        console.log(error);
    }
}

connectDB();