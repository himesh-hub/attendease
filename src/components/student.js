import React from "react";

class Student extends React.Component {

  markPresent = async () => {
    await fetch(`http://localhost:5000/students/${this.props.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        present: true
      })
    });

    console.log("Student is Present");
  };

  markAbsent = async () => {
    await fetch(`http://localhost:5000/students/${this.props.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        present: false
      })
    });

    console.log("Student is Absent");
  };

  deleteStudent = async () => {
  await fetch(`http://localhost:5000/students/${this.props.id}`, {
    method: "DELETE"
  });

  console.log("Student deleted");
};

  render() {
  return (
    <div className="student-card">

      <div className="student-name">
        {this.props.name}
      </div>

      <p className="student-info">
        Roll No: {this.props.rollNo}
      </p>

      <p className="student-info">
        Course: {this.props.course}
      </p>

      <span
        className={
          this.props.present
            ? "status present"
            : "status absent"
        }
      >
        {this.props.present ? "Present" : "Absent"}
      </span>

      <div className="student-actions">

        <button onClick={this.markPresent}>
          Present
        </button>

        <button onClick={this.markAbsent}>
          Absent
        </button>

        <button
          className="delete-button"
          onClick={this.deleteStudent}
        >
          Delete
        </button>

      </div>

    </div>
  );
}
}

export default Student;