import React from "react";

class SubjectPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      subjects: [],
      name: "",
      code: ""
    };
  }

  componentDidMount() {
    this.loadSubjects();
  }

  loadSubjects = async () => {
    try {

      const response = await fetch(
        "http://localhost:5000/subjects"
      );

      const data = await response.json();

      this.setState({
        subjects: data
      });

    } catch (error) {
      console.error("Error loading subjects:", error);
    }
  };

  handleChange = (event) => {

    this.setState({
      [event.target.name]: event.target.value
    });

  };

  handleSubmit = async (event) => {

    event.preventDefault();

    const subject = {
      name: this.state.name,
      code: this.state.code
    };

    try {

      const response = await fetch(
        "http://localhost:5000/subjects",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(subject)
        }
      );

      const data = await response.json();

      console.log(data);

      if (response.ok) {

        this.setState({
          name: "",
          code: ""
        });

        this.loadSubjects();
      }

    } catch (error) {
      console.error("Error adding subject:", error);
    }
  };

  deleteSubject = async (id) => {

    try {

      const response = await fetch(
        `http://localhost:5000/subjects/${id}`,
        {
          method: "DELETE"
        }
      );

      const data = await response.json();

      console.log(data);

      if (response.ok) {
        this.loadSubjects();
      }

    } catch (error) {
      console.error("Error deleting subject:", error);
    }
  };

  render() {

    return (
      <div className="subject-page">

        <div className="subject-page-header">

          <div>

            <p className="section-label">
              SUBJECT MANAGEMENT
            </p>

            <h1>Subjects</h1>

            <p>
              Create and manage subjects used for student attendance.
            </p>

          </div>

          <button
            className="secondary-button"
            onClick={() => this.props.changePage("dashboard")}
          >
            Back to Dashboard
          </button>

        </div>


        {/* Add Subject */}

        <section className="subject-add-card">

          <p className="section-label">
            ADD SUBJECT
          </p>

          <h2>Create New Subject</h2>

          <form
            className="subject-form"
            onSubmit={this.handleSubmit}
          >

            <input
              type="text"
              name="name"
              placeholder="Subject Name"
              value={this.state.name}
              onChange={this.handleChange}
              required
            />

            <input
              type="text"
              name="code"
              placeholder="Subject Code"
              value={this.state.code}
              onChange={this.handleChange}
              required
            />

            <button
              type="submit"
              className="primary-button"
            >
              + Add Subject
            </button>

          </form>

        </section>


        {/* Subject List */}

        <section className="subject-list-section">

          <div className="subject-list-heading">

            <div>

              <p className="section-label">
                AVAILABLE SUBJECTS
              </p>

              <h2>
                All Subjects
              </h2>

            </div>

            <span className="subject-count">
              {this.state.subjects.length} Subjects
            </span>

          </div>


          <div className="subject-grid">

            {this.state.subjects.map((subject) => (

              <div
                className="subject-card"
                key={subject._id}
              >

                <div className="subject-code">
                  {subject.code}
                </div>

                <h3>
                  {subject.name}
                </h3>

                <button
                  className="delete-button"
                  onClick={() =>
                    this.deleteSubject(subject._id)
                  }
                >
                  Delete
                </button>

              </div>

            ))}

          </div>


          {this.state.subjects.length === 0 && (

            <div className="empty-subjects">
              No subjects added yet.
            </div>

          )}

        </section>

      </div>
    );
  }
}

export default SubjectPage;