import React from "react";

class About extends React.Component {

  render() {
    return (
      <div className="about-page">

        {/* About Hero */}
        <section className="about-hero">

          <p className="section-label">
            ABOUT THE PROJECT
          </p>

          <h1>
            Student Attendance
            <br />
            <span>Management System</span>
          </h1>

          <p className="about-intro">
            A web-based application designed to organize student records,
            manage attendance and provide a simple digital platform for
            monitoring student attendance information.
          </p>

        </section>


        {/* Project Overview */}
        <section className="about-section">

          <div className="about-card">

            <p className="section-label">
              PROJECT OVERVIEW
            </p>

            <h2>
              Why We Built This System
            </h2>

            <p>
              Traditional attendance management can involve maintaining
              records manually and updating them repeatedly. This project
              provides a digital system where student information and
              attendance can be managed through a single web interface.
            </p>

          </div>


          <div className="about-card">

            <p className="section-label">
              OUR APPROACH
            </p>

            <h2>
              Simple, Organized and Scalable
            </h2>

            <p>
              The system separates the frontend, backend and database.
              React handles the user interface, Express handles API
              requests, and MongoDB stores the student information.
            </p>

          </div>

        </section>


        {/* Objectives */}
        <section className="objectives-section">

          <div className="section-heading">

            <p className="section-label">
              OBJECTIVES
            </p>

            <h2>
              What This Project Aims To Achieve
            </h2>

          </div>


          <div className="objectives-grid">

            <div className="objective-card">
              <span>01</span>
              <h3>Student Management</h3>
              <p>
                Maintain student records in an organized digital system.
              </p>
            </div>

            <div className="objective-card">
              <span>02</span>
              <h3>Attendance Tracking</h3>
              <p>
                Record Present and Absent status for individual students.
              </p>
            </div>

            <div className="objective-card">
              <span>03</span>
              <h3>Database Management</h3>
              <p>
                Store student information using MongoDB documents.
              </p>
            </div>

            <div className="objective-card">
              <span>04</span>
              <h3>Easy Access</h3>
              <p>
                Provide a simple interface for viewing and managing data.
              </p>
            </div>

          </div>

        </section>


        {/* Technology */}
        <section className="technology-section">

          <div className="section-heading">

            <p className="section-label">
              TECHNOLOGY STACK
            </p>

            <h2>
              Technologies Used
            </h2>

          </div>


          <div className="technology-grid">

            <div className="technology-card">
              <h3>React.js</h3>
              <p>
                Used to build the interactive frontend using
                class components, props, state and events.
              </p>
            </div>

            <div className="technology-card">
              <h3>Node.js</h3>
              <p>
                Provides the JavaScript runtime used for the backend.
              </p>
            </div>

            <div className="technology-card">
              <h3>Express.js</h3>
              <p>
                Provides the API routes that connect the frontend
                with MongoDB.
              </p>
            </div>

            <div className="technology-card">
              <h3>MongoDB Atlas</h3>
              <p>
                Stores student records as documents inside the
                students collection.
              </p>
            </div>

            <div className="technology-card">
              <h3>JavaScript / JSX</h3>
              <p>
                Used for application logic, events, data handling
                and React components.
              </p>
            </div>

            <div className="technology-card">
              <h3>Core CSS</h3>
              <p>
                Used to create the interface design, layout and
                responsive appearance.
              </p>
            </div>

          </div>

        </section>


        {/* Call To Action */}
        <section className="about-cta">

          <h2>
            Explore the Attendance System
          </h2>

          <p>
            View students, manage attendance and explore the dashboard.
          </p>

          <button
            className="primary-button"
            onClick={() => this.props.changePage("login")}
          >
            Go to Dashboard
          </button>

        </section>

      </div>
    );
  }
}

export default About;