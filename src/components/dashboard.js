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

      const studentsData = await studentsResponse.json();
      const subjectsData = await subjectsResponse.json();
      const attendanceData = await attendanceResponse.json();
      const reportsData = await reportsResponse.json();
      const historyData = await historyResponse.json();

      this.setState({
        students: Array.isArray(studentsData)
          ? studentsData
          : [],

        subjects: Array.isArray(subjectsData)
          ? subjectsData
          : [],

        todayAttendance: Array.isArray(attendanceData)
          ? attendanceData
          : [],

        reports: Array.isArray(reportsData)
          ? reportsData
          : [],

        history: Array.isArray(historyData)
          ? historyData
          : [],

        loading: false
      });

    } catch (error) {
      console.error("DASHBOARD ERROR:", error);

      this.setState({
        loading: false
      });
    }
  };

  getPresentToday = () => {
    return this.state.todayAttendance.filter(
      (record) => record.present === true
    ).length;
  };

  getAbsentToday = () => {
    return this.state.todayAttendance.filter(
      (record) => record.present === false
    ).length;
  };

  getNotMarkedToday = () => {
    const totalStudents = this.state.students.length;
    const markedStudents = this.state.todayAttendance.length;

    return Math.max(
      totalStudents - markedStudents,
      0
    );
  };

  calculateTodayPercentage = () => {
    const attendance =
      this.state.todayAttendance;

    if (attendance.length === 0) {
      return 0;
    }

    const present = this.getPresentToday();

    return (
      present / attendance.length
    ) * 100;
  };

  calculateOverallPercentage = () => {
    const reports = this.state.reports;

    if (!Array.isArray(reports) || reports.length === 0) {
      return 0;
    }

    let totalClasses = 0;
    let totalPresent = 0;

    reports.forEach((report) => {
      totalClasses += Number(report.totalClasses) || 0;
      totalPresent += Number(report.presentClasses) || 0;
    });

    if (totalClasses === 0) {
      return 0;
    }

    return (
      totalPresent / totalClasses
    ) * 100;
  };

  getLowAttendanceCount = () => {
    return this.state.reports.filter(
      (report) =>
        Number(report.attendancePercentage) < 75
    ).length;
  };

  render() {
    if (this.state.loading) {
      return (
        <div className="dashboard-page">
          <div className="dashboard-loading">
            Loading Dashboard...
          </div>
        </div>
      );
    }

    const todayPercentage =
      this.calculateTodayPercentage();

    const overallPercentage =
      this.calculateOverallPercentage();

    const presentToday =
      this.getPresentToday();

    const absentToday =
      this.getAbsentToday();

    const notMarkedToday =
      this.getNotMarkedToday();

    const lowAttendance =
      this.getLowAttendanceCount();

    return (
      <div className="dashboard-page">

        {/* HEADER */}

        <section className="dashboard-header">

          <div>
            <p className="page-tag">
              ADMIN OVERVIEW
            </p>

            <h1>
              Dashboard
            </h1>

            <p>
              Manage students, attendance, subjects
              and academic reports from one place.
            </p>
          </div>

          <div className="dashboard-date">

            <span>Today</span>

            <strong>
              {this.getToday()}
            </strong>

          </div>

        </section>


        {/* MAIN STATISTICS */}

        <section className="dashboard-stats">

          <div className="dashboard-card">

            <p>Total Students</p>

            <h2>
              {this.state.students.length}
            </h2>

            <span>
              Registered students
            </span>

          </div>


          <div className="dashboard-card">

            <p>Total Subjects</p>

            <h2>
              {this.state.subjects.length}
            </h2>

            <span>
              Available subjects
            </span>

          </div>


          <div className="dashboard-card">

            <p>Present Today</p>

            <h2>
              {presentToday}
            </h2>

            <span>
              Students marked present
            </span>

          </div>


          <div className="dashboard-card">

            <p>Absent Today</p>

            <h2>
              {absentToday}
            </h2>

            <span>
              Students marked absent
            </span>

          </div>

        </section>


        {/* ATTENDANCE OVERVIEW */}

        <section className="dashboard-section">

          <div className="dashboard-section-header">

            <div>
              <p className="page-tag">
                ATTENDANCE
              </p>

              <h2>
                Attendance Overview
              </h2>
            </div>

            <button
              className="dashboard-link-button"
              onClick={() =>
                this.props.changePage("reports")
              }
            >
              View Reports
            </button>

          </div>


          <div className="attendance-overview-grid">

            <div className="attendance-overview-card">

              <div className="overview-card-top">

                <span>
                  Today's Attendance
                </span>

                <strong>
                  {todayPercentage.toFixed(1)}%
                </strong>

              </div>

              <div className="progress-bar">

                <div
                  className="progress-fill"
                  style={{
                    width:
                      todayPercentage + "%"
                  }}
                ></div>

              </div>

              <p>
                {presentToday} present /{" "}
                {this.state.todayAttendance.length}{" "}
                marked
              </p>

            </div>


            <div className="attendance-overview-card">

              <div className="overview-card-top">

                <span>
                  Overall Attendance
                </span>

                <strong>
                  {overallPercentage.toFixed(1)}%
                </strong>

              </div>

              <div className="progress-bar">

                <div
                  className="progress-fill"
                  style={{
                    width:
                      overallPercentage + "%"
                  }}
                ></div>

              </div>

              <p>
                Based on all recorded classes
              </p>

            </div>


            <div className="attendance-overview-card">

              <div className="overview-card-top">

                <span>
                  Need Attention
                </span>

                <strong>
                  {lowAttendance}
                </strong>

              </div>

              <p>
                Student-subject records below
                75% attendance
              </p>

            </div>


            <div className="attendance-overview-card">

              <div className="overview-card-top">

                <span>
                  Not Marked Today
                </span>

                <strong>
                  {notMarkedToday}
                </strong>

              </div>

              <p>
                Students without an attendance
                record today
              </p>

            </div>

          </div>

        </section>


        {/* QUICK ACTIONS */}

        <section className="dashboard-section">

          <div className="dashboard-section-header">

            <div>

              <p className="page-tag">
                ACTIONS
              </p>

              <h2>
                Quick Actions
              </h2>

            </div>

          </div>


          <div className="quick-actions">

            <button
              onClick={() =>
                this.props.changePage("students")
              }
            >
              <strong>
                Manage Students
              </strong>

              <span>
                Add, edit, search and view students
              </span>
            </button>


            <button
              onClick={() =>
                this.props.changePage("subjects")
              }
            >
              <strong>
                Manage Subjects
              </strong>

              <span>
                Add or remove academic subjects
              </span>
            </button>


            <button
              onClick={() =>
                this.props.changePage("attendance")
              }
            >
              <strong>
                Mark Attendance
              </strong>

              <span>
                Record today's attendance
              </span>
            </button>


            <button
              onClick={() =>
                this.props.changePage("history")
              }
            >
              <strong>
                Attendance History
              </strong>

              <span>
                View previously recorded attendance
              </span>
            </button>

          </div>

        </section>


        {/* RECENT STUDENTS */}

        <section className="dashboard-section">

          <div className="dashboard-section-header">

            <div>

              <p className="page-tag">
                STUDENTS
              </p>

              <h2>
                Recent Students
              </h2>

            </div>

            <button
              className="dashboard-link-button"
              onClick={() =>
                this.props.changePage("students")
              }
            >
              View All
            </button>

          </div>


          <div className="dashboard-student-list">

            {this.state.students.length === 0 ? (

              <div className="dashboard-empty">
                No students registered yet.
              </div>

            ) : (

              this.state.students
                .slice(-5)
                .reverse()
                .map((student) => (

                  <div
                    className="dashboard-student-card"
                    key={student._id}
                  >

                    <div className="dashboard-student-avatar">

                      {student.name
                        .charAt(0)
                        .toUpperCase()}

                    </div>

                    <div>

                      <h3>
                        {student.name}
                      </h3>

                      <p>
                        Roll No: {student.rollNo}
                      </p>

                    </div>

                    <span>
                      {student.course}
                    </span>

                  </div>

                ))

            )}

          </div>

        </section>


        {/* RECENT ATTENDANCE */}

        <section className="dashboard-section">

          <div className="dashboard-section-header">

            <div>

              <p className="page-tag">
                RECENT
              </p>

              <h2>
                Recent Attendance
              </h2>

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

      </div>
    );
  }
}

export default Dashboard;