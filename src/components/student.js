import React from "react";
import { Pencil } from 'lucide-react'
import { Trash } from 'lucide-react'
import { Eye } from 'lucide-react'

class Student extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      present: props.present,
      deleted: false
    };
  }

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

        <div className="student-actions">

          <button 
          className="view-button"
          onClick={this.viewProfile}>
            <Eye size={20}/>
          </button>

          <button
            className="delete-button"
            onClick={this.deleteStudent}
          >
            <Trash size={20}/>
          </button>

          <button
          className="edit-button"
           onClick={this.editStudent}>
            <Pencil size={20}/>
          </button>

        </div>

      </div>
    );
  }
}

export default Student;