import React from "react";

class Notification extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      reports: [],
      notifications: []
    };
  }

  componentDidMount() {
    this.loadNotifications();
  }

  loadNotifications = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/reports/attendance"
      );

      const data = await response.json();

      const notifications = [];

      data.forEach((report) => {
        if (report.attendancePercentage < 75) {
          notifications.push({
            type: "warning",
            title: "Low Attendance",
            message:
              report.studentName +
              " has " +
              report.attendancePercentage.toFixed(2) +
              "% attendance in " +
              report.subjectName +
              "."
          });
        }

        if (report.attendancePercentage === 100) {
          notifications.push({
            type: "success",
            title: "Perfect Attendance",
            message:
              report.studentName +
              " has 100% attendance in " +
              report.subjectName +
              "."
          });
        }
      });

      if (notifications.length === 0) {
        notifications.push({
          type: "info",
          title: "No Notifications",
          message: "There are no attendance alerts at the moment."
        });
      }

      this.setState({
        reports: data,
        notifications: notifications
      });

    } catch (error) {
      console.error("NOTIFICATION ERROR:", error);
    }
  };

  render() {
    return (
      <div className="notifications-page">

        <section className="notifications-header">
          <p className="page-tag">UPDATES</p>

          <h1>Notifications</h1>

          <p>
            Attendance alerts and important student updates.
          </p>
        </section>

        <section className="notifications-list">

          {this.state.notifications.map((notification, index) => (

            <div
              className={
                "notification-card " +
                notification.type
              }
              key={index}
            >

              <div className="notification-icon">
                {notification.type === "warning" && "!"}
                {notification.type === "success" && "✓"}
                {notification.type === "info" && "i"}
              </div>

              <div className="notification-content">

                <h3>{notification.title}</h3>

                <p>{notification.message}</p>

              </div>

            </div>

          ))}

        </section>

        <div className="notifications-actions">

          <button
            onClick={() => this.props.changePage("reports")}
          >
            View Reports
          </button>

          <button
            onClick={() => this.props.changePage("attendance")}
          >
            Mark Attendance
          </button>

        </div>

      </div>
    );
  }
}

export default Notification;