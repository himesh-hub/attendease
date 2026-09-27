import React from "react";

class Home extends React.Component {

  render() {
    return (
      <div className="home-page">

        {/* Hero Section */}
        <section className="hero-section">

          <div className="hero-content">

            <p className="hero-label">
              STUDENT ATTENDANCE MANAGEMENT SYSTEM
            </p>

            <h1>
              Manage Students.
              <br />
              Track Attendance.
              <br />
              <span>Understand Performance.</span>
            </h1>

            <p className="hero-text">
              A smart and organized system for managing student records,
              tracking attendance and viewing attendance information
              through a simple web interface.
            </p>

            <div className="hero-buttons">

              <button
                className="primary-button"
                onClick={() => this.props.changePage("login")}
              >
                Get Started
              </button>

            </div>

          </div>

        </section>


        {/* Introduction Section */}
        <section className="intro-section">

          <div className="section-heading">
            <p className="section-label">WHY THIS SYSTEM?</p>

            <h2>
              Simple Attendance Management
              <br />
              With a Complete Digital Workflow
            </h2>

            <p>
              The system combines student management, attendance tracking,
              database storage and reporting into one application.
            </p>
          </div>

        </section>


        {/* Features Preview */}
        <section className="home-features">

          <div className="feature-box">
            <h3>Student Management</h3>
            <p>
              Add, view and manage student records using the React interface.
            </p>
          </div>

          <div className="feature-box">
            <h3>Attendance Tracking</h3>
            <p>
              Mark students as Present or Absent and keep attendance information.
            </p>
          </div>

          <div className="feature-box">
            <h3>MongoDB Storage</h3>
            <p>
              Store student information in MongoDB Atlas using a document-based
              database.
            </p>
          </div>

          <div className="feature-box">
            <h3>Reports & Analytics</h3>
            <p>
              View attendance information and later analyze student performance.
            </p>
          </div>

        </section>


        {/* How It Works Preview */}
        <section className="workflow-section">

          <div className="section-heading">

            <p className="section-label">HOW IT WORKS</p>

            <h2>From Student Entry to Attendance Report</h2>

          </div>

          <div className="workflow">

            <div className="workflow-step">
              <span>01</span>
              <h3>Add Student</h3>
              <p>
                Enter student name, roll number and course.
              </p>
            </div>

            <div className="workflow-step">
              <span>02</span>
              <h3>Store Data</h3>
              <p>
                Student information is stored in MongoDB.
              </p>
            </div>

            <div className="workflow-step">
              <span>03</span>
              <h3>Mark Attendance</h3>
              <p>
                Record Present or Absent status.
              </p>
            </div>

            <div className="workflow-step">
              <span>04</span>
              <h3>View Reports</h3>
              <p>
                Analyze attendance information.
              </p>
            </div>

          </div>

        </section>


        {/* Call to Action */}
        <section className="cta-section">

          <h2>
            Start Managing Student Attendance
          </h2>

          <p>
            Organized student records and attendance management in one place.
          </p>

          <button
            className="primary-button"
            onClick={() => this.props.changePage("dashboard")}
          >
            Open Dashboard
          </button>

          <button
            className="secondary-button"
            onClick={() => this.props.changePage("about")}
          >
            About Us
          </button>

        </section>

      </div>
    );
  }
}

export default Home;