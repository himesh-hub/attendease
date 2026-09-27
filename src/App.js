import React from "react";
import Navbar from "./components/navbar";
import Home from "./components/home";
import About from "./components/about";
import StudentList from "./components/studentList";
import AddStudent from "./components/addStudent";
import StudentProfile from "./components/studentprofile";
import Studentpage from "./components/studentpage";
import EditStudent from "./components/editstudent";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      refresh: 0,
      page: "home",
      selectedStudent: null
    };
  }

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

          {this.state.page === "dashboard" && (
            <>
              {/* Topbar */}
              <div className="topbar">
                <div className="welcome">
                  <h1>Welcome back 👋</h1>
                  <p>Here's your student attendance overview</p>
                </div>
                <div className="top-actions">
                  <button className="icon-button">🔔</button>
                  <button className="icon-button">⚙</button>
                </div>
              </div>

              {/* Add Student */}
              <div className="add-card">
                <h2 className="section-title">Add New Student</h2>

                <AddStudent onStudentAdded={this.studentAdded} />


              </div>

              {/* Students */}
              <div className="list-header">
                <h2 className="section-title">Students</h2>
              </div>

              <StudentList
                refresh={this.state.refresh}
                onViewProfile={this.viewStudent}
              />
            </>
          )}
        </main>

      </div>
    );
  }
}

export default App;