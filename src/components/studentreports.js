import React from "react";

class StudentReport extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            reports: [],
            loading: true
        };
    }

    componentDidMount() {
        this.loadReport();
    }

    loadReport = async () => {
        try {
            if (!this.props.student) {
                this.setState({
                    loading: false
                });

                return;
            }

            const response = await fetch(
                "http://localhost:5000/student-report/" +
                this.props.student._id
            );

            const data = await response.json();

            console.log("STUDENT REPORT DATA:", data);

            this.setState({
                reports: data,
                loading: false
            });

        } catch (error) {
            console.error("STUDENT REPORT ERROR:", error);

            this.setState({
                loading: false
            });
        }
    };

    calculateOverallPercentage = () => {
        const reports = this.state.reports;

        if (!Array.isArray(reports) || reports.length === 0) {
            return 0;
        }

        let totalClasses = 0;
        let totalPresent = 0;

        reports.forEach((report) => {
            totalClasses += report.totalClasses;
            totalPresent += report.presentClasses;
        });

        if (totalClasses === 0) {
            return 0;
        }

        return (totalPresent / totalClasses) * 100;
    };

    render() {
        const student = this.props.student;
        const overallPercentage =
            this.calculateOverallPercentage();

        if (this.state.loading) {
            return (
                <div className="student-report-page">
                    <h2>Loading Attendance Report...</h2>
                </div>
            );
        }

        if (!student) {
            return (
                <div className="student-report-page">
                    <h2>Student information not available.</h2>
                </div>
            );
        }

        return (
            <div className="student-report-page">

                {/* HEADER */}

                <section className="student-report-header">

                    <p className="page-tag">MY ATTENDANCE</p>

                    <h1>Welcome, {student.name}</h1>

                    <p>
                        Roll Number: {student.rollNo}
                    </p>

                </section>


                {/* ATTENDANCE SUMMARY */}

                <section className="student-report-summary">

                    <div className="student-report-main-card">

                        <p>Overall Attendance</p>

                        <h2>
                            {overallPercentage.toFixed(2)}%
                        </h2>

                        <span>
                            Based on all recorded classes
                        </span>

                    </div>


                    <div className="student-report-info-card">

                        <p>Total Subjects</p>

                        <h2>
                            {this.state.reports.length}
                        </h2>

                    </div>

                </section>


                {/* SUBJECT REPORT */}

                <section className="student-report-section">

                    <div className="student-report-section-header">

                        <div>
                            <p className="page-tag">SUBJECT WISE</p>

                            <h2>Attendance Report</h2>
                        </div>

                    </div>


                    <div className="student-report-table-wrapper">

                        <table className="student-report-table">

                            <thead>

                                <tr>
                                    <th>Subject</th>
                                    <th>Code</th>
                                    <th>Total Classes</th>
                                    <th>Present</th>
                                    <th>Absent</th>
                                    <th>Attendance</th>
                                </tr>

                            </thead>

                            <tbody>

                                {this.state.reports.length === 0 ? (

                                    <tr>
                                        <td colSpan="6">
                                            No attendance records available.
                                        </td>
                                    </tr>

                                ) : (

                                    this.state.reports.map((report, index) => {

                                        const absentClasses =
                                            report.totalClasses -
                                            report.presentClasses;

                                        return (
                                            <tr key={index}>

                                                <td>
                                                    {report.subjectName}
                                                </td>

                                                <td>
                                                    {report.subjectCode}
                                                </td>

                                                <td>
                                                    {report.totalClasses}
                                                </td>

                                                <td>
                                                    {report.presentClasses}
                                                </td>

                                                <td>
                                                    {absentClasses}
                                                </td>

                                                <td>

                                                    <span
                                                        className={
                                                            report.attendancePercentage >= 75
                                                                ? "student-report-good"
                                                                : "student-report-low"
                                                        }
                                                    >
                                                        {report.attendancePercentage.toFixed(2)}%
                                                    </span>

                                                </td>

                                            </tr>
                                        );
                                    })

                                )}

                            </tbody>

                        </table>

                    </div>

                </section>


                {/* ACTIONS */}

                <div className="student-report-actions">

                    <button
                        onClick={() =>
                            this.props.onLogout()
                        }
                    >
                        Logout
                    </button>

                </div>

            </div>
        );
    }
}

export default StudentReport;