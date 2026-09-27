import React from "react";

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
            role: "teacher",
            error: "",
            loading: false
        };
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
            error: ""
        });
    };

    handleLogin = async (event) => {
        event.preventDefault();

        this.setState({
            loading: true,
            error: ""
        });

        try {
            const response = await fetch("http://localhost:5000/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: this.state.username,
                    password: this.state.password,
                    role: this.state.role
                })
            });

            const data = await response.json();

            if (response.ok && data.success) {
                this.props.onLogin({
                    role: data.role,
                    username: this.state.username,
                    studentId: data.studentId,
                    studentName: data.studentName,
                    rollNo: data.rollNo,
                    course: data.course
                });
            } else {
                this.setState({
                    error: data.message || "Invalid login details",
                    loading: false
                });
            }

        } catch (error) {
            console.error("LOGIN ERROR:", error);

            this.setState({
                error: "Unable to connect to server.",
                loading: false
            });
        }
    };

    render() {
        return (
            <div className="login-page">

                <div className="login-card">

                    <div className="login-brand">
                        <div className="login-logo">
                            A
                        </div>

                        <h1>Attendance System</h1>

                        <p>
                            Student Attendance Management & Analytics
                        </p>
                    </div>

                    <form onSubmit={this.handleLogin}>

                        <div className="login-field">
                            <label>Login As</label>

                            <select
                                name="role"
                                value={this.state.role}
                                onChange={this.handleChange}
                            >
                                <option value="teacher">
                                    Teacher / Admin
                                </option>

                                <option value="student">
                                    Student / User
                                </option>
                            </select>
                        </div>

                        <div className="login-field">
                            <label>
                                {this.state.role === "student"
                                    ? "Roll Number"
                                    : "Username"}
                            </label>

                            <input
                                type="text"
                                name="username"
                                value={this.state.username}
                                onChange={this.handleChange}
                                placeholder={this.state.role === "student"
                                    ? "Roll Number"
                                    : "Username"}
                                required
                            />
                        </div>

                        <div className="login-field">
                            <label>Password</label>

                            <input
                                type="password"
                                name="password"
                                value={this.state.password}
                                onChange={this.handleChange}
                                placeholder="Enter password"
                                required
                            />
                        </div>

                        {this.state.error && (
                            <div className="login-error">
                                {this.state.error}
                            </div>
                        )}

                        <button
                            type="submit"
                            className="login-button"
                            disabled={this.state.loading}
                        >
                            {this.state.loading
                                ? "Logging in..."
                                : "Login"}
                        </button>

                    </form>

                    <p className="login-note">
                        Teacher access is currently enabled.
                        Student login will be connected next.
                    </p>

                </div>

            </div>
        );
    }
}

export default Login;