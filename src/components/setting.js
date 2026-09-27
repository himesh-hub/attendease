import React from "react";

class Setting extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showNotifications: true,
      compactView: false,
      darkMode: true,
      message: ""
    };
  }

  handleNotifications = (event) => {
    this.setState({
      showNotifications: event.target.checked
    });
  };

  handleCompactView = (event) => {
    this.setState({
      compactView: event.target.checked
    });
  };

  handleDarkMode = (event) => {
    this.setState({
      darkMode: event.target.checked
    });
  };

  saveSettings = () => {
    this.setState({
      message: "Settings saved successfully."
    });

    setTimeout(() => {
      this.setState({
        message: ""
      });
    }, 2000);
  };

  render() {
    return (
      <div className="settings-page">

        <section className="settings-header">
          <p className="page-tag">PREFERENCES</p>

          <h1>Settings</h1>

          <p>
            Manage your application preferences.
          </p>
        </section>

        <section className="settings-card">

          <div className="setting-row">

            <div>
              <h3>Notifications</h3>
              <p>
                Show attendance alerts and important updates.
              </p>
            </div>

            <input
              type="checkbox"
              checked={this.state.showNotifications}
              onChange={this.handleNotifications}
            />

          </div>

          <div className="setting-row">

            <div>
              <h3>Compact View</h3>
              <p>
                Use a more compact layout for records and tables.
              </p>
            </div>

            <input
              type="checkbox"
              checked={this.state.compactView}
              onChange={this.handleCompactView}
            />

          </div>

          <div className="setting-row">

            <div>
              <h3>Dark Mode</h3>
              <p>
                Use the dark interface for the application.
              </p>
            </div>

            <input
              type="checkbox"
              checked={this.state.darkMode}
              onChange={this.handleDarkMode}
            />

          </div>

          <button
            className="settings-save-button"
            onClick={this.saveSettings}
          >
            Save Settings
          </button>

          {this.state.message && (
            <p className="settings-message">
              {this.state.message}
            </p>
          )}

        </section>

      </div>
    );
  }
}

export default Setting;