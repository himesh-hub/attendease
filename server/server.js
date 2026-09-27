const dns = require("dns");

dns.setServers(["8.8.8.8", "8.8.4.4"]);

require("dotenv").config();

const express = require("express");
const cors = require("cors");

const { MongoClient, ObjectId } = require("mongodb");

const app = express();

app.use(express.json());
app.use(cors());

const client = new MongoClient(process.env.MONGO_URI);

let students;
let subjects;
let attendance;

app.post("/login", async (req, res) => {
  try {
    const { username, password, role } = req.body;

    if (role === "teacher") {
      if (
        username === process.env.TEACHER_USERNAME &&
        password === process.env.TEACHER_PASSWORD
      ) {
        res.json({
          success: true,
          role: "teacher",
          message: "Teacher login successful"
        });
      } else {
        res.status(401).json({
          success: false,
          message: "Invalid teacher username or password"
        });
      }

      return;
    }

    res.status(400).json({
      success: false,
      message: "Invalid role"
    });

  } catch (error) {
    console.error("LOGIN ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Login failed"
    });
  }
});

app.get("/student-report/:id", async (req, res) => {
  try {
    const studentId = new ObjectId(req.params.id);

    const report = await attendance.aggregate([
      {
        $match: {
          studentId: studentId
        }
      },

      {
        $lookup: {
          from: "subjects",
          localField: "subjectId",
          foreignField: "_id",
          as: "subject"
        }
      },

      {
        $unwind: "$subject"
      },

      {
        $group: {
          _id: "$subjectId",

          subjectName: {
            $first: "$subject.name"
          },

          subjectCode: {
            $first: "$subject.code"
          },

          totalClasses: {
            $sum: 1
          },

          presentClasses: {
            $sum: {
              $cond: ["$present", 1, 0]
            }
          }
        }
      },

      {
        $project: {
          _id: 0,
          subjectName: 1,
          subjectCode: 1,
          totalClasses: 1,
          presentClasses: 1,

          attendancePercentage: {
            $multiply: [
              {
                $divide: [
                  "$presentClasses",
                  "$totalClasses"
                ]
              },
              100
            ]
          }
        }
      },

      {
        $sort: {
          subjectName: 1
        }
      }
    ]).toArray();

    res.json(report);

  } catch (error) {
    console.error("GET STUDENT REPORT ERROR:", error);

    res.status(500).json({
      message: "Failed to fetch student report"
    });
  }
});

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
    const updateData = {};

    if (req.body.name !== undefined) {
      updateData.name = req.body.name;
    }

    if (req.body.rollNo !== undefined) {
      updateData.rollNo = Number(req.body.rollNo);
    }

    if (req.body.course !== undefined) {
      updateData.course = req.body.course;
    }

    if (req.body.present !== undefined) {
      updateData.present = req.body.present;
    }

    await students.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
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

app.get("/subjects", async (req, res) => {
  try {
    const subjectsData = await subjects.find({}).toArray();

    res.json(subjectsData);

  } catch (error) {
    console.error("GET SUBJECTS ERROR:", error);

    res.status(500).json({
      message: "Failed to fetch subjects"
    });
  }
});

app.post("/subjects", async (req, res) => {
  try {

    const subject = {
      name: req.body.name,
      code: req.body.code
    };

    const result = await subjects.insertOne(subject);

    res.json({
      message: "Subject added successfully",
      id: result.insertedId
    });

  } catch (error) {
    console.error("POST SUBJECT ERROR:", error);

    res.status(500).json({
      message: "Failed to add subject"
    });
  }
});

app.delete("/subjects/:id", async (req, res) => {
  try {

    const id = req.params.id;

    await subjects.deleteOne({
      _id: new ObjectId(id)
    });

    res.json({
      message: "Subject deleted successfully"
    });

  } catch (error) {
    console.error("DELETE SUBJECT ERROR:", error);

    res.status(500).json({
      message: "Failed to delete subject"
    });
  }
});

app.get("/attendance", async (req, res) => {
  try {

    const subjectId = req.query.subjectId;
    const date = req.query.date;

    const query = {};

    if (subjectId) {
      query.subjectId = new ObjectId(subjectId);
    }

    if (date) {
      query.date = date;
    }

    const attendanceData = await attendance
      .find(query)
      .toArray();

    res.json(attendanceData);

  } catch (error) {

    console.error("GET ATTENDANCE ERROR:", error);

    res.status(500).json({
      message: "Failed to fetch attendance"
    });
  }
});

app.post("/attendance", async (req, res) => {
  try {

    const {
      studentId,
      subjectId,
      date,
      present
    } = req.body;

    await attendance.updateOne(
      {
        studentId: new ObjectId(studentId),
        subjectId: new ObjectId(subjectId),
        date: date
      },
      {
        $set: {
          studentId: new ObjectId(studentId),
          subjectId: new ObjectId(subjectId),
          date: date,
          present: present
        }
      },
      {
        upsert: true
      }
    );

    res.json({
      message: "Attendance saved successfully"
    });

  } catch (error) {

    console.error("POST ATTENDANCE ERROR:", error);

    res.status(500).json({
      message: "Failed to save attendance"
    });
  }
});

app.get("/attendance/history", async (req, res) => {
  try {
    const history = await attendance.aggregate([
      {
        $lookup: {
          from: "students",
          localField: "studentId",
          foreignField: "_id",
          as: "student"
        }
      },
      {
        $lookup: {
          from: "subjects",
          localField: "subjectId",
          foreignField: "_id",
          as: "subject"
        }
      },
      {
        $unwind: "$student"
      },
      {
        $unwind: "$subject"
      },
      {
        $project: {
          _id: 1,
          studentName: "$student.name",
          rollNo: "$student.rollNo",
          subjectName: "$subject.name",
          subjectCode: "$subject.code",
          date: 1,
          present: 1
        }
      },
      {
        $sort: {
          date: -1
        }
      }
    ]).toArray();

    res.json(history);
  } catch (error) {
    console.error("GET ATTENDANCE HISTORY ERROR:", error);
    res.status(500).json({
      message: "Failed to fetch attendance history"
    });
  }
});

app.get("/reports/attendance", async (req, res) => {
  try {
    const report = await attendance.aggregate([
      {
        $lookup: {
          from: "students",
          localField: "studentId",
          foreignField: "_id",
          as: "student"
        }
      },
      {
        $lookup: {
          from: "subjects",
          localField: "subjectId",
          foreignField: "_id",
          as: "subject"
        }
      },
      {
        $unwind: "$student"
      },
      {
        $unwind: "$subject"
      },
      {
        $group: {
          _id: {
            studentId: "$studentId",
            subjectId: "$subjectId"
          },

          studentName: {
            $first: "$student.name"
          },

          rollNo: {
            $first: "$student.rollNo"
          },

          subjectName: {
            $first: "$subject.name"
          },

          subjectCode: {
            $first: "$subject.code"
          },

          totalClasses: {
            $sum: 1
          },

          presentClasses: {
            $sum: {
              $cond: ["$present", 1, 0]
            }
          }
        }
      },
      {
        $project: {
          _id: 0,
          studentName: 1,
          rollNo: 1,
          subjectName: 1,
          subjectCode: 1,
          totalClasses: 1,
          presentClasses: 1,

          attendancePercentage: {
            $multiply: [
              {
                $divide: [
                  "$presentClasses",
                  "$totalClasses"
                ]
              },
              100
            ]
          }
        }
      },
      {
        $sort: {
          studentName: 1
        }
      }
    ]).toArray();

    res.json(report);

  } catch (error) {
    console.error("GET ATTENDANCE REPORT ERROR:", error);

    res.status(500).json({
      message: "Failed to generate attendance report"
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
    subjects = db.collection("subjects");
    attendance = db.collection("attendance");

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