import React from "react";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      students: [],
      subjects: [],
      todayAttendance: [],
      reports: [],
      history: [],
      loading: true
    };
  }

  componentDidMount() {
    this.loadDashboard();
  }

  getToday = () => {
    const today = new Date();

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    return year + "-" + month + "-" + day;
  };

  loadDashboard = async () => {
    try {
      const today = this.getToday();

      const [
        studentsResponse,
        subjectsResponse,
        attendanceResponse,
        reportsResponse,
        historyResponse
      ] = await Promise.all([
        fetch("http://localhost:5000/students"),
        fetch("http://localhost:5000/subjects"),
        fetch(
          "http://localhost:5000/attendance?date=" + today
        ),
        fetch("http://localhost:5000/reports/attendance"),
        fetch("http://localhost:5000/attendance/history")
      ]);

      const students = await studentsResponse.json();
      const subjects = await subjectsResponse.json();
      const todayAttendance = await attendanceResponse.json();
      const reports = await reportsResponse.json();
      const history = await historyResponse.json();

      this.setState({
        students: students,
        subjects: subjects,
        todayAttendance: todayAttendance,
        reports: reports,
        history: history,
        loading: false
      });

    } catch (error) {
      console.error("DASHBOARD ERROR:", error);

      this.setState({
        loading: false
      });
    }
  };

  calculateTodayPercentage = () => {
    const attendance = this.state.todayAttendance;

    if (attendance.length === 0) {
      return 0;
    }

    const present = attendance.filter(
      (record) => record.present === true
    ).length;

    return (present / attendance.length) * 100;
  };

  calculateOverallPercentage = () => {
    const reports = this.state.reports;

    if (reports.length === 0) {
      return 0;
    }

    let totalClasses = 0;
    let totalPresent = 0;

    reports.forEach((report) => {
      totalClasses += report.totalClasses;
      totalPresent += report.presentClasses;
    });

    if (totalClasses === 0) {
      return 0;
    }

    return (totalPresent / totalClasses) * 100;
  };

  render() {
    const todayPercentage =
      this.calculateTodayPercentage();

    const overallPercentage =
      this.calculateOverallPercentage();

    if (this.state.loading) {
      return (
        <div className="dashboard-page">
          <h2>Loading Dashboard...</h2>
        </div>
      );
    }

    return (
      <div className="dashboard-page">

        {/* HEADER */}

        <section className="dashboard-header">

          <div>
            <p className="page-tag">OVERVIEW</p>

            <h1>Dashboard</h1>

            <p>
              Welcome to the Student Attendance
              Management & Analytics System.
            </p>
          </div>

        </section>


        {/* MAIN STATISTICS */}

        <section className="dashboard-stats">

          <div className="dashboard-card">

            <p>Total Students</p>

            <h2>
              {this.state.students.length}
            </h2>

            <span>Registered students</span>

          </div>


          <div className="dashboard-card">

            <p>Total Subjects</p>

            <h2>
              {this.state.subjects.length}
            </h2>

            <span>Available subjects</span>

          </div>


          <div className="dashboard-card">

            <p>Today's Attendance</p>

            <h2>
              {todayPercentage.toFixed(1)}%
            </h2>

            <span>
              {this.state.todayAttendance.length} records marked today
            </span>

          </div>


          <div className="dashboard-card">

            <p>Overall Attendance</p>

            <h2>
              {overallPercentage.toFixed(1)}%
            </h2>

            <span>Based on recorded attendance</span>

          </div>

        </section>


        {/* QUICK ACTIONS */}

        <section className="dashboard-section">

          <div className="dashboard-section-header">

            <div>
              <p className="page-tag">ACTIONS</p>

              <h2>Quick Actions</h2>
            </div>

          </div>


          <div className="quick-actions">

            <button
              onClick={() =>
                this.props.changePage("students")
              }
            >
              <strong>Students</strong>
              <span>Add or manage students</span>
            </button>


            <button
              onClick={() =>
                this.props.changePage("subjects")
              }
            >
              <strong>Subjects</strong>
              <span>Manage academic subjects</span>
            </button>


            <button
              onClick={() =>
                this.props.changePage("attendance")
              }
            >
              <strong>Mark Attendance</strong>
              <span>Record today's attendance</span>
            </button>


            <button
              onClick={() =>
                this.props.changePage("reports")
              }
            >
              <strong>Reports</strong>
              <span>View attendance analytics</span>
            </button>

          </div>

        </section>


        {/* RECENT ATTENDANCE */}

        <section className="dashboard-section">

          <div className="dashboard-section-header">

            <div>
              <p className="page-tag">RECENT</p>

              <h2>Recent Attendance</h2>
            </div>

            <button
              className="dashboard-link-button"
              onClick={() =>
                this.props.changePage("history")
              }
            >
              View History
            </button>

          </div>


          <div className="dashboard-table-wrapper">

            <table className="dashboard-table">

              <thead>

                <tr>
                  <th>Student</th>
                  <th>Roll No</th>
                  <th>Subject</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>

              </thead>


              <tbody>

                {this.state.history.length === 0 ? (

                  <tr>
                    <td colSpan="5">
                      No attendance records available.
                    </td>
                  </tr>

                ) : (

                  this.state.history
                    .slice(0, 5)
                    .map((record) => (

                      <tr key={record._id}>

                        <td>
                          {record.studentName}
                        </td>

                        <td>
                          {record.rollNo}
                        </td>

                        <td>
                          {record.subjectName}
                        </td>

                        <td>
                          {record.date}
                        </td>

                        <td>

                          <span
                            className={
                              record.present
                                ? "dashboard-present"
                                : "dashboard-absent"
                            }
                          >
                            {record.present
                              ? "Present"
                              : "Absent"}
                          </span>

                        </td>

                      </tr>

                    ))

                )}

              </tbody>

            </table>

          </div>

        </section>


        {/* SYSTEM OVERVIEW */}

        <section className="dashboard-section">

          <div className="dashboard-section-header">

            <div>
              <p className="page-tag">SYSTEM</p>

              <h2>System Overview</h2>
            </div>

          </div>


          <div className="dashboard-overview">

            <div>
              <h3>Students</h3>
              <p>
                Manage student records, search students,
                edit information and view student profiles.
              </p>
            </div>


            <div>
              <h3>Subjects</h3>
              <p>
                Create and manage the subjects used for
                attendance recording.
              </p>
            </div>


            <div>
              <h3>Attendance</h3>
              <p>
                Mark daily student attendance and store
                attendance records in MongoDB.
              </p>
            </div>


            <div>
              <h3>Analytics</h3>
              <p>
                Generate attendance history, percentages,
                reports and notifications.
              </p>
            </div>

          </div>

        </section>

      </div>
    );
  }
}

export default Dashboard;