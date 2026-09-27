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

        let students = [...this.state.students];

        /* Search */
        if (this.props.search) {

            const searchText =
                this.props.search.toLowerCase();

            students = students.filter((student) =>
                student.name.toLowerCase().includes(searchText) ||
                String(student.rollNo).includes(searchText)
            );
        }


        /* Course Filter */
        if (this.props.course !== "All") {

            students = students.filter(
                (student) =>
                    student.course === this.props.course
            );
        }


        /* Sort */
        if (this.props.sort === "nameAsc") {

            students.sort((a, b) =>
                a.name.localeCompare(b.name)
            );

        } else if (this.props.sort === "nameDesc") {

            students.sort((a, b) =>
                b.name.localeCompare(a.name)
            );

        } else if (this.props.sort === "rollAsc") {

            students.sort((a, b) =>
                a.rollNo - b.rollNo
            );

        } else if (this.props.sort === "rollDesc") {

            students.sort((a, b) =>
                b.rollNo - a.rollNo
            );
        }

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
                            onViewProfile={this.props.onViewProfile}
                            onEditStudent={this.props.onEditStudent}
                        />
                    ))}
                </div>
            </div>
        );
    }
}

export default StudentList;