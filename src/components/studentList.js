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
        this.getStudents();
    }

    getStudents = async () => {
        const response = await fetch("http://localhost:5000/students");
        const data = await response.json();

        this.setState({
            students: data
        });
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
                        />
                    ))}
                </div>
            </div>
        );
    }
}

export default StudentList;