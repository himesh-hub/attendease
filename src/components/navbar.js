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
                        onClick={() => this.props.changePage("dashboard")}
                    >
                        Dashboard
                    </button>
                    
                    <button
                        onClick={() => this.props.changePage("students")}
                    >
                        Students
                    </button>

                </div>

            </nav>
        );
    }
}

export default Navbar;