import React from "react";

class AddStudent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      rollNo: "",
      course: ""
    };
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    const student = {
      name: this.state.name,
      rollNo: Number(this.state.rollNo),
      course: this.state.course
    };

    const response = await fetch("http://localhost:5000/students", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(student)
    });

    const data = await response.json();

    console.log(data);

    this.props.onStudentAdded();
  };

  render() {
  return (
    <form className="student-form" onSubmit={this.handleSubmit}>

      <input
        type="text"
        name="name"
        placeholder="Student Name"
        value={this.state.name}
        onChange={this.handleChange}
      />

      <input
        type="number"
        name="rollNo"
        placeholder="Roll Number"
        value={this.state.rollNo}
        onChange={this.handleChange}
      />

      <input
        type="text"
        name="course"
        placeholder="Course"
        value={this.state.course}
        onChange={this.handleChange}
      />

      <button type="submit">
        + Add Student
      </button>

    </form>
  );
}
}

export default AddStudent;