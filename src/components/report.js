import React from "react";

class Report extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      reports: []
    };
  }

  componentDidMount() {
    this.loadReports();
  }

  loadReports = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/reports/attendance"
      );

      const data = await response.json();

      this.setState({
        reports: data
      });
    } catch (error) {
      console.error("REPORT ERROR:", error);
    }
  };

  render() {
    return (
      <div className="reports-page">

        <section className="reports-header">
          <p className="page-tag">ANALYTICS</p>

          <h1>Attendance Reports</h1>

          <p>
            View attendance performance of students by subject.
          </p>
        </section>

        <section className="report-summary">

          <div className="report-summary-card">
            <h3>Total Records</h3>
            <p>{this.state.reports.length}</p>
          </div>

          <div className="report-summary-card">
            <h3>Students</h3>
            <p>
              {
                new Set(
                  this.state.reports.map(
                    (report) => report.rollNo
                  )
                ).size
              }
            </p>
          </div>

          <div className="report-summary-card">
            <h3>Subjects</h3>
            <p>
              {
                new Set(
                  this.state.reports.map(
                    (report) => report.subjectCode
                  )
                ).size
              }
            </p>
          </div>

        </section>

        <section className="reports-table-section">

          <div className="reports-table-wrapper">

            <table className="reports-table">

              <thead>
                <tr>
                  <th>Student</th>
                  <th>Roll No</th>
                  <th>Subject</th>
                  <th>Code</th>
                  <th>Total Classes</th>
                  <th>Present</th>
                  <th>Attendance %</th>
                </tr>
              </thead>

              <tbody>

                {this.state.reports.length === 0 ? (

                  <tr>
                    <td colSpan="7">
                      No attendance report available.
                    </td>
                  </tr>

                ) : (

                  this.state.reports.map((report, index) => (

                    <tr key={index}>

                      <td>{report.studentName}</td>

                      <td>{report.rollNo}</td>

                      <td>{report.subjectName}</td>

                      <td>{report.subjectCode}</td>

                      <td>{report.totalClasses}</td>

                      <td>{report.presentClasses}</td>

                      <td>
                        <span
                          className={
                            report.attendancePercentage >= 75
                              ? "report-good"
                              : "report-low"
                          }
                        >
                          {report.attendancePercentage.toFixed(2)}%
                        </span>
                      </td>

                    </tr>

                  ))

                )}

              </tbody>

            </table>

          </div>

        </section>

        <div className="reports-actions">

          <button
            onClick={() => this.props.changePage("attendance")}
          >
            Mark Attendance
          </button>

          <button
            onClick={() => this.props.changePage("history")}
          >
            Attendance History
          </button>

        </div>

      </div>
    );
  }
}

export default Report;