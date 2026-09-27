import React from "react";
import Navbar from "./components/navbar";
import Home from "./components/home";
import About from "./components/about";
import StudentProfile from "./components/studentprofile";
import Studentpage from "./components/studentpage";
import EditStudent from "./components/editstudent";
import SubjectPage from "./components/subjectpage";
import AttendancePage from "./components/attendancepage";
import Attendance from "./components/attendance";
import Report from "./components/report";
import Notification from "./components/notification";
import Setting from "./components/setting";
import Profile from "./components/profile";
import Dashboard from "./components/dashboard";
import Login from "./components/login";
import StudentReport from "./components/studentreport";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      refresh: 0,
      page: "home",
      selectedStudent: null,
      loggedIn: false,
      user: null
    };
  }

  handleLogin = (user) => {
    this.setState({
      loggedIn: true,
      user: user,
      selectedStudent: user.role === "student"
        ? {
          _id: user.studentId,
          name: user.studentName,
          rollNo: user.rollNo
        }
        : null,
      page: user.role === "teacher"
        ? "dashboard"
        : "studentreport"
    });
  };

  viewStudent = (student) => {
    this.setState({
      selectedStudent: student,
      page: "profile"
    });
  };

  studentAdded = () => {
    this.setState({
      refresh: this.state.refresh + 1
    });
  };

  changePage = (page) => {
    this.setState({
      page: page
    });
  };

  editStudent = (student) => {
    this.setState({
      selectedStudent: student,
      page: "editstudent"
    });
  };

  render() {

    if (!this.state.loggedIn) {
      return (
        <Login
          onLogin={this.handleLogin}
        />
      );
    }

    return (


      <div className="app">

        <Navbar changePage={this.changePage} />


        {/* Main Content */}
        <main className="main">

          {
            this.state.page === "home" && (
              <Home changePage={this.changePage} />
            )
          }

          {this.state.page === "about" && (
            <About changePage={this.changePage} />
          )}

          {this.state.page === "profile" && (
            <StudentProfile
              student={this.state.selectedStudent}
              changePage={this.changePage}
            />
          )}

          {this.state.page === "students" && (
            <Studentpage
              changePage={this.changePage}
              refresh={this.state.refresh}
              onStudentAdded={this.studentAdded}
              onStudentChanged={this.studentAdded}
              onViewProfile={this.viewStudent}
              onEditStudent={this.editStudent}
            />
          )}

          {this.state.page === "editstudent" && (
            <EditStudent
              student={this.state.selectedStudent}
              changePage={this.changePage}
              onStudentUpdated={this.studentAdded}
            />
          )}

          {this.state.page === "subjects" && (
            <SubjectPage
              changePage={this.changePage}
            />
          )}

          {this.state.page === "attendance" && (
            <AttendancePage
              changePage={this.changePage}
            />
          )}

          {this.state.page === "history" && (
            <Attendance
              changePage={this.changePage}
            />
          )}

          {this.state.page === "reports" && (
            <Report
              changePage={this.changePage}
            />
          )}

          {this.state.page === "notifications" && (
            <Notification
              changePage={this.changePage}
            />
          )}

          {this.state.page === "settings" && (
            <Setting
              changePage={this.changePage}
            />
          )}

          {this.state.page === "profilepage" && (
            <Profile
              changePage={this.changePage}
            />
          )}

          {this.state.page === "studentreport" && (
            <StudentReport
              student={this.state.selectedStudent}
            />
          )}

          {this.state.page === "dashboard" && (
            <Dashboard
              changePage={this.changePage}
            />
          )}
        </main>

      </div>
    );
  }
}

export default App;