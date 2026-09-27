import React from "react";

class StudentProfile extends React.Component {

  render() {

    const student = this.props.student;

    if (!student) {
      return (
        <div className="student-profile-page">
          <h2>Student not found</h2>

          <button
            className="primary-button"
            onClick={() => this.props.changePage("students")}
          >
            Back to Students
          </button>
        </div>
      );
    }

    return (
      <div className="student-profile-page">

        <section className="profile-header">

          <div>
            <p className="section-label">
              STUDENT PROFILE
            </p>

            <h1>{student.name}</h1>

            <p>
              Complete information about this student.
            </p>
          </div>

          <button
            className="secondary-button"
            onClick={() => this.props.changePage("students")}
          >
            Back to Students
          </button>

        </section>


        <section className="profile-main">

          <div className="profile-card">

            <div className="profile-avatar">
              {student.name.charAt(0).toUpperCase()}
            </div>

            <h2>{student.name}</h2>

            <p className="profile-course">
              {student.course}
            </p>

          </div>


          <div className="profile-details">

            <div className="detail-box">
              <span>Roll Number</span>
              <strong>{student.rollNo}</strong>
            </div>

            <div className="detail-box">
              <span>Course</span>
              <strong>{student.course}</strong>
            </div>

            <div className="detail-box">
              <span>Attendance Status</span>

              <strong
                className={
                  student.present
                    ? "profile-present"
                    : "profile-absent"
                }
              >
                {student.present ? "Present" : "Absent"}
              </strong>
            </div>

            <div className="detail-box">
              <span>Student ID</span>
              <strong>{student._id}</strong>
            </div>

          </div>

        </section>


        <section className="profile-info-section">

          <p className="section-label">
            ATTENDANCE
          </p>

          <h2>Current Attendance</h2>

          <div className="attendance-status-card">

            <div>
              <span>Today's Status</span>

              <h3>
                {student.present
                  ? "Present"
                  : "Absent"}
              </h3>
            </div>

            <div
              className={
                student.present
                  ? "large-status present-status"
                  : "large-status absent-status"
              }
            >
              {student.present ? "P" : "A"}
            </div>

          </div>

        </section>


        <section className="profile-actions">

          <button
            className="primary-button"
            onClick={() => this.props.changePage("attendance")}
          >
            Manage Attendance
          </button>

          <button
            className="secondary-button"
            onClick={() => this.props.changePage("students")}
          >
            View All Students
          </button>

        </section>

      </div>
    );
  }
}

export default StudentProfile;