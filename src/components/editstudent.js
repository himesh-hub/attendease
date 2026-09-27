import React from "react";

class EditStudent extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      name: props.student ? props.student.name : "",
      rollNo: props.student ? props.student.rollNo : "",
      course: props.student ? props.student.course : ""
    };
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch(
      `http://localhost:5000/students/${this.props.student._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: this.state.name,
          rollNo: Number(this.state.rollNo),
          course: this.state.course
        })
      }
    );

    const data = await response.json();

    console.log(data);

    if (response.ok) {
      alert("Student updated successfully");

      this.props.onStudentUpdated();

      this.props.changePage("students");
    }
  };

  render() {

    if (!this.props.student) {
      return (
        <div>
          <h2>Student not found</h2>

          <button
            onClick={() => this.props.changePage("students")}
          >
            Back to Students
          </button>
        </div>
      );
    }

    return (
      <div className="edit-student-page">

        <div className="edit-student-header">

          <div>
            <p className="section-label">
              EDIT STUDENT
            </p>

            <h1>Edit Student</h1>

            <p>
              Update the student's information.
            </p>
          </div>

          <button
            className="secondary-button"
            onClick={() => this.props.changePage("students")}
          >
            Back to Students
          </button>

        </div>


        <div className="edit-student-card">

          <form
            className="student-form"
            onSubmit={this.handleSubmit}
          >

            <label>
              Student Name
            </label>

            <input
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
            />


            <label>
              Roll Number
            </label>

            <input
              type="number"
              name="rollNo"
              value={this.state.rollNo}
              onChange={this.handleChange}
            />


            <label>
              Course
            </label>

            <input
              type="text"
              name="course"
              value={this.state.course}
              onChange={this.handleChange}
            />


            <button
              type="submit"
              className="primary-button"
            >
              Save Changes
            </button>

          </form>

        </div>

      </div>
    );
  }
}

export default EditStudent;