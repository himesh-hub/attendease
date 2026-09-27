import React from "react";

class AttendancePage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      students: [],
      subjects: [],
      selectedSubject: "",
      date: "",
      attendance: {}
    };
  }

  componentDidMount() {
    this.loadStudents();
    this.loadSubjects();
  }

  loadStudents = async () => {
    try {

      const response = await fetch(
        "http://localhost:5000/students"
      );

      const data = await response.json();

      this.setState({
        students: data
      });

    } catch (error) {
      console.error("Error loading students:", error);
    }
  };

  loadSubjects = async () => {
    try {

      const response = await fetch(
        "http://localhost:5000/subjects"
      );

      const data = await response.json();

      this.setState({
        subjects: data
      });

    } catch (error) {
      console.error("Error loading subjects:", error);
    }
  };

  handleSubjectChange = (event) => {

    this.setState(
      {
        selectedSubject: event.target.value
      },
      this.loadExistingAttendance
    );

  };

  handleDateChange = (event) => {

    this.setState(
      {
        date: event.target.value
      },
      this.loadExistingAttendance
    );

  };

  loadExistingAttendance = async () => {

    if (
      !this.state.selectedSubject ||
      !this.state.date
    ) {
      return;
    }

    try {

      const response = await fetch(
        `http://localhost:5000/attendance?subjectId=${this.state.selectedSubject}&date=${this.state.date}`
      );

      const data = await response.json();

      const attendance = {};

      data.forEach((record) => {
        attendance[record.studentId] = record.present;
      });

      this.setState({
        attendance: attendance
      });

    } catch (error) {
      console.error(
        "Error loading attendance:",
        error
      );
    }
  };

  markPresent = (studentId) => {

    this.setState((prevState) => ({
      attendance: {
        ...prevState.attendance,
        [studentId]: true
      }
    }));

  };

  markAbsent = (studentId) => {

    this.setState((prevState) => ({
      attendance: {
        ...prevState.attendance,
        [studentId]: false
      }
    }));

  };

  saveAttendance = async () => {

    if (
      !this.state.selectedSubject ||
      !this.state.date
    ) {
      alert("Please select subject and date.");
      return;
    }

    try {

      for (const student of this.state.students) {

        const present =
          this.state.attendance[student._id];

        if (present === undefined) {
          continue;
        }

        await fetch(
          "http://localhost:5000/attendance",
          {
            method: "POST",

            headers: {
              "Content-Type": "application/json"
            },

            body: JSON.stringify({
              studentId: student._id,
              subjectId: this.state.selectedSubject,
              date: this.state.date,
              present: present
            })
          }
        );
      }

      alert("Attendance saved successfully!");

    } catch (error) {

      console.error(
        "Error saving attendance:",
        error
      );
    }
  };

  render() {

    return (
      <div className="attendance-page">

        {/* Header */}

        <div className="attendance-page-header">

          <div>

            <p className="section-label">
              ATTENDANCE MANAGEMENT
            </p>

            <h1>Mark Attendance</h1>

            <p>
              Select a subject and date, then mark
              attendance for each student.
            </p>

          </div>

          <button
            className="secondary-button"
            onClick={() =>
              this.props.changePage("dashboard")
            }
          >
            Back to Dashboard
          </button>

        </div>


        {/* Selection */}

        <section className="attendance-selection">

          <div className="attendance-field">

            <label>
              Subject
            </label>

            <select
              value={this.state.selectedSubject}
              onChange={this.handleSubjectChange}
            >

              <option value="">
                Select Subject
              </option>

              {this.state.subjects.map((subject) => (

                <option
                  key={subject._id}
                  value={subject._id}
                >
                  {subject.name} ({subject.code})
                </option>

              ))}

            </select>

          </div>


          <div className="attendance-field">

            <label>
              Date
            </label>

            <input
              type="date"
              value={this.state.date}
              onChange={this.handleDateChange}
            />

          </div>

        </section>


        {/* Student Attendance */}

        <section className="attendance-list">

          <div className="attendance-list-header">

            <div>
              <p className="section-label">
                STUDENT ATTENDANCE
              </p>

              <h2>
                Mark Today's Attendance
              </h2>
            </div>

            <span>
              {this.state.students.length} Students
            </span>

          </div>


          {this.state.students.map((student) => {

            const status =
              this.state.attendance[student._id];

            return (

              <div
                className="attendance-row"
                key={student._id}
              >

                <div className="attendance-student">

                  <div className="attendance-avatar">
                    {student.name
                      .charAt(0)
                      .toUpperCase()}
                  </div>

                  <div>

                    <h3>
                      {student.name}
                    </h3>

                    <p>
                      Roll No: {student.rollNo}
                      {" • "}
                      {student.course}
                    </p>

                  </div>

                </div>


                <div className="attendance-buttons">

                  <button
                    className={
                      status === true
                        ? "attendance-present active"
                        : "attendance-present"
                    }
                    onClick={() =>
                      this.markPresent(student._id)
                    }
                  >
                    Present
                  </button>


                  <button
                    className={
                      status === false
                        ? "attendance-absent active"
                        : "attendance-absent"
                    }
                    onClick={() =>
                      this.markAbsent(student._id)
                    }
                  >
                    Absent
                  </button>

                </div>

              </div>

            );
          })}


          {this.state.students.length === 0 && (

            <div className="empty-attendance">
              No students available.
            </div>

          )}

        </section>


        {/* Save */}

        <div className="attendance-save">

          <button
            className="primary-button"
            onClick={this.saveAttendance}
          >
            Save Attendance
          </button>

        </div>

      </div>
    );
  }
}

export default AttendancePage;