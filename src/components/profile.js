import React from "react";

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "Attendance Administrator",
      email: "admin@example.com",
      role: "Administrator",
      department: "Computer Department",
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
    return (
      <div className="profile-page">

        <section className="profile-page-header">
          <p className="page-tag">ACCOUNT</p>

          <h1>Profile</h1>

          <p>
            Manage your application profile and account information.
          </p>
        </section>

        <section className="profile-account-card">

          <div className="profile-account-top">

            <div className="profile-account-avatar">
              {this.state.name.charAt(0).toUpperCase()}
            </div>

            <div>
              <h2>{this.state.name}</h2>
              <p>{this.state.role}</p>
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

            <button
              onClick={() => this.props.changePage("settings")}
            >
              Settings
            </button>

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