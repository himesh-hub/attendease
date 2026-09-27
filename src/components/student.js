import React from "react";

class Student extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      present: props.present,
      deleted: false
    };
  }

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
    this.setState({
      present: true
    });
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
    this.setState({
      present: false
    });
  };

  viewProfile = () => {
    const student = {
      _id: this.props.id,
      name: this.props.name,
      rollNo: this.props.rollNo,
      course: this.props.course,
      present: this.state.present
    };

    this.props.onViewProfile(student);
  };

  deleteStudent = async () => {
    await fetch(`http://localhost:5000/students/${this.props.id}`, {
      method: "DELETE"
    });

    console.log("Student deleted");
    this.setState({
      deleted: true
    });
  };

  editStudent = () => {

    const student = {
      _id: this.props.id,
      name: this.props.name,
      rollNo: this.props.rollNo,
      course: this.props.course,
      present: this.state.present
    };

    this.props.onEditStudent(student);
  };

  render() {

    if (this.state.deleted) {
      return null;
    }

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
            this.state.present ? "status present" : "status absent"
          }
        >
          {this.state.present ? "Present" : "Absent"}
        </span>

        <div className="student-actions">

          <button onClick={this.markPresent}>
            Present
          </button>

          <button onClick={this.markAbsent}>
            Absent
          </button>

          <button onClick={this.viewProfile}>
            View Student
          </button>

          <button
            className="delete-button"
            onClick={this.deleteStudent}
          >
            Delete
          </button>

          <button onClick={this.editStudent}>
            Edit
          </button>

        </div>

      </div>
    );
  }
}

export default Student;