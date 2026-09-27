import React from "react";
import Home from "./components/Home";
import StudentList from "./components/studentList";
import AddStudent from "./components/addStudent";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      refresh: 0,
      page: "home"
    };
  }

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

  render() {

    return (


      <div className="app">

        {/* Sidebar */}
        <aside className="sidebar">

          <div className="logo">
            Attend<span>Ease</span>
          </div>

          <div className="nav">
            <div className="nav-item active"> Dashboard</div>
          </div>

          <div className="sidebar-bottom">
            <div className="nav-item"> Settings</div>
          </div>

        </aside>
        {
          this.state.page === "home" && (
            <Home changePage={this.changePage} />
          )
        }

        {this.state.page === "dashboard" && (
          <>
            {/* Main Content */}
            <main className="main">
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
              />
            </main>
          </>
        )}

      </div>
    );
  }
}

export default App;