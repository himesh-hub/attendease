import React from "react";

class Navbar extends React.Component {

    render() {
        return (
            <nav className="navbar">

                <div
                    className="nav-logo"
                    onClick={() => this.props.changePage("home")}
                >
                    AttendEase
                </div>

                <div className="nav-links">

                    <button
                        onClick={() => this.props.changePage("home")}
                    >
                        Home
                    </button>

                    <button
                        onClick={() => this.props.changePage("about")}
                    >
                        About
                    </button>

                    <button
                        onClick={() => this.props.changePage("contact")}
                    >
                        Contact
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

                    <button onClick={() => this.props.changePage("history")}>
                        History
                    </button>

                    <button onClick={() => this.props.changePage("reports")}>
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

                    <button
                        onClick={() => this.props.changePage("students")}
                    >
                        Students
                    </button>

                    <button
                        onClick={() => this.props.changePage("dashboard")}
                    >
                        Dashboard
                    </button>
                </div>

            </nav>
        );
    }
}

export default Navbar;