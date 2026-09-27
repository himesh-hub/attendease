import React from "react";

class Profile extends React.Component {
  constructor(props) {
    super(props);

    const isStudent =
      props.user && props.user.role === "student";

    this.state = {
      name: isStudent
        ? props.student.name
        : "Attendance Administrator",

      email: isStudent
        ? "student@example.com"
        : "admin@example.com",

      role: isStudent
        ? "Student / User"
        : "Teacher / Administrator",

      department: isStudent
        ? props.student.course
        : "Computer Department",

      rollNo: isStudent
        ? props.student.rollNo
        : "",

      editing: false,
      message: ""
    };
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  startEditing = () => {
    this.setState({
      editing: true,
      message: ""
    });
  };

  saveProfile = () => {
    this.setState({
      editing: false,
      message: "Profile updated successfully."
    });

    setTimeout(() => {
      this.setState({
        message: ""
      });
    }, 2000);
  };

  render() {
    const isStudent =
      this.props.user &&
      this.props.user.role === "student";

    return (
      <div className="profile-page">

        <section className="profile-page-header">

          <p className="page-tag">ACCOUNT</p>

          <h1>Profile</h1>

          <p>
            {isStudent
              ? "View your student account information."
              : "Manage your administrator account information."}
          </p>

        </section>

        <section className="profile-account-card">

          <div className="profile-account-top">

            <div className="profile-account-avatar">
              {this.state.name.charAt(0).toUpperCase()}
            </div>

            <div>

              <h2>
                {this.state.name}
              </h2>

              <p>
                {this.state.role}
              </p>

            </div>

          </div>

          <div className="profile-form">

            <div className="profile-field">

              <label>Name</label>

              <input
                type="text"
                name="name"
                value={this.state.name}
                onChange={this.handleChange}
                disabled={!this.state.editing}
              />

            </div>

            <div className="profile-field">

              <label>Email</label>

              <input
                type="email"
                name="email"
                value={this.state.email}
                onChange={this.handleChange}
                disabled={!this.state.editing}
              />

            </div>

            <div className="profile-field">

              <label>Role</label>

              <input
                type="text"
                value={this.state.role}
                disabled
              />

            </div>

            {isStudent ? (

              <div className="profile-field">

                <label>Roll Number</label>

                <input
                  type="text"
                  value={this.state.rollNo}
                  disabled
                />

              </div>

            ) : (

              <div className="profile-field">

                <label>Department</label>

                <input
                  type="text"
                  name="department"
                  value={this.state.department}
                  onChange={this.handleChange}
                  disabled={!this.state.editing}
                />

              </div>

            )}

            {isStudent && (

              <div className="profile-field">

                <label>Course</label>

                <input
                  type="text"
                  value={this.state.department}
                  disabled
                />

              </div>

            )}

          </div>

          <div className="profile-buttons">

            {!this.state.editing ? (

              <button onClick={this.startEditing}>
                Edit Profile
              </button>

            ) : (

              <button onClick={this.saveProfile}>
                Save Changes
              </button>

            )}

            {!isStudent && (
              <button
                onClick={() =>
                  this.props.changePage("settings")
                }
              >
                Settings
              </button>
            )}

          </div>

          {this.state.message && (
            <p className="profile-message">
              {this.state.message}
            </p>
          )}

        </section>

      </div>
    );
  }
}

export default Profile;