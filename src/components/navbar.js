import React from "react";

class Navbar extends React.Component {
  render() {
    const user = this.props.user;

    return (
      <nav className="navbar">

        <div
          className="nav-logo"
          onClick={() => this.props.changePage(
            user.role === "teacher"
              ? "dashboard"
              : "studentreport"
          )}
        >
          Attendance System
        </div>

        <div className="nav-links">

          {user.role === "teacher" ? (

            <>
              <button
                onClick={() => this.props.changePage("dashboard")}
              >
                Dashboard
              </button>

              <button
                onClick={() => this.props.changePage("students")}
              >
                Students
              </button>

              <button
                onClick={() => this.props.changePage("subjects")}
              >
                Subjects
              </button>

              <button
                onClick={() => this.props.changePage("attendance")}
              >
                Attendance
              </button>

              <button
                onClick={() => this.props.changePage("history")}
              >
                History
              </button>

              <button
                onClick={() => this.props.changePage("reports")}
              >
                Reports
              </button>

              <button
                onClick={() => this.props.changePage("notifications")}
              >
                Notifications
              </button>

              <button
                onClick={() => this.props.changePage("settings")}
              >
                Settings
              </button>

              <button
                onClick={() => this.props.changePage("profilepage")}
              >
                Profile
              </button>
            </>

          ) : (

            <>
              <button
                onClick={() => this.props.changePage("studentreport")}
              >
                My Attendance
              </button>

              <button
                onClick={() => this.props.changePage("profilepage")}
              >
                Profile
              </button>
            </>

          )}

          <button
            className="nav-logout"
            onClick={this.props.onLogout}
          >
            Logout
          </button>

        </div>

      </nav>
    );
  }
}

export default Navbar;