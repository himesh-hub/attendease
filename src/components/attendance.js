import React from "react";

class Attendance extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      history: []
    };
  }

  componentDidMount() {
    this.loadHistory();
  }

  loadHistory = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/attendance/history"
      );

      const data = await response.json();

      this.setState({
        history: data
      });
    } catch (error) {
      console.error("HISTORY ERROR:", error);
    }
  };

  render() {
    return (
      <div className="history-page">

        <section className="history-header">
          <p className="page-tag">ATTENDANCE</p>

          <h1>Attendance History</h1>

          <p>
            View previously recorded attendance of all students and subjects.
          </p>
        </section>

        <section className="history-table-section">

          <div className="history-table-wrapper">

            <table className="history-table">

              <thead>
                <tr>
                  <th>Student</th>
                  <th>Roll No</th>
                  <th>Subject</th>
                  <th>Code</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>

                {this.state.history.length === 0 ? (

                  <tr>
                    <td colSpan="6">
                      No attendance records found.
                    </td>
                  </tr>

                ) : (

                  this.state.history.map((record) => (

                    <tr key={record._id}>

                      <td>{record.studentName}</td>

                      <td>{record.rollNo}</td>

                      <td>{record.subjectName}</td>

                      <td>{record.subjectCode}</td>

                      <td>{record.date}</td>

                      <td>
                        <span
                          className={
                            record.present
                              ? "history-present"
                              : "history-absent"
                          }
                        >
                          {record.present ? "Present" : "Absent"}
                        </span>
                      </td>

                    </tr>

                  ))

                )}

              </tbody>

            </table>

          </div>

        </section>

        <div className="history-actions">

          <button
            onClick={() => this.props.changePage("attendance")}
          >
            Mark Attendance
          </button>

          <button
            onClick={() => this.props.changePage("dashboard")}
          >
            Back to Dashboard
          </button>

        </div>

      </div>
    );
  }
}

export default Attendance;