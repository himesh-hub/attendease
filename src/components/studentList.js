import React from "react";
import Student from "./student";

class StudentList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            students: []
        };
    }

    componentDidMount() {
        this.loadStudents();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.refresh !== this.props.refresh) {
            this.loadStudents();
        }
    }

    loadStudents = async () => {
        try {
            const response = await fetch(
                "http://localhost:5000/students"
            );

            const data = await response.json();

            this.setState({
                students: data
            });

        } catch (error) {
            console.error(error);
        }
    };

    render() {
        return (
            <div>
                <h2>Student List</h2>

                <div className="student-grid">

                    {this.state.students.map((student) => (
                        <Student
                            key={student._id}
                            id={student._id}
                            name={student.name}
                            rollNo={student.rollNo}
                            course={student.course}
                            present={student.present}
                            onStudentChanged={this.props.onStudentChanged}
                        />
                    ))}
                </div>
            </div>
        );
    }
}

export default StudentList;