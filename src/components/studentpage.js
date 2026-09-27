import React from "react";
import AddStudent from "./addStudent";
import StudentList from "./studentList";

class Studentpage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      search: "",
      course: "All",
      sort: "nameAsc"
    };
  }

  render() {
    return (
      <div className="students-page">

        {/* Header */}
        <div className="students-page-header">

          <div>
            <p className="section-label">
              STUDENT MANAGEMENT
            </p>

            <h1>Students</h1>

            <p>
              Manage student records and attendance from one place.
            </p>
          </div>

          <button
            className="secondary-button"
            onClick={() => this.props.changePage("dashboard")}
          >
            Back to Dashboard
          </button>

        </div>

        {/* Add Student */}
        <section className="students-add-section">

          <h2>Add New Student</h2>

          <p>
            Enter the student's basic information.
          </p>

          <AddStudent
            onStudentAdded={this.props.onStudentAdded}
          />

        </section>


        {/* Student List */}
        <section className="students-list-section">

          <p className="section-label">
            STUDENT DATABASE
          </p>

          <h2>All Students</h2>

          <StudentList
            refresh={this.props.refresh}
            onStudentChanged={this.props.onStudentChanged}
            search={this.state.search}
            course={this.state.course}
            sort={this.state.sort}
            onViewProfile={this.props.onViewProfile}
            onEditStudent={this.props.onEditStudent}
          />

        </section>

      </div>
    );
  }
}

export default Studentpage;