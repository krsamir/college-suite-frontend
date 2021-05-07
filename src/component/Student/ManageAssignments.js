import React, { Component } from "react";
import axios from "axios";
import { Alert, Card, Button, Row, Col } from "react-bootstrap";

export default class ManageAssignments extends Component {
  constructor() {
    super();
    this.state = {
      userDetail: {
        contact: "",
        department: "",
        name: "",
        regd_no: "",
        year_of_joining: "",
      },
      subjects: [],
      fileUpload: {
        name: "",
        type: "",
      },
      fileIndex: -1,
    };
  }
  async componentDidMount() {
    axios
      .get("/api/getStudent")
      .then((res) => {
        this.setState({ userDetail: res.data[0] });
      })
      .catch((e) => console.log(e));

    axios
      .get("/api/getSubject")
      .then((res) => this.setState({ subjects: res.data }))
      .catch((e) => console.log(e));
  }
  handleFileUpload = (e, fileIndexID) => {
    this.setState({ fileIndex: fileIndexID });
    this.setState({ fileUpload: e.target.files[0] });
  };
  handleSave = (value) => {
    const formData = new FormData();
    const { department, regd_no } = this.state.userDetail;
    const { subjectName } = value;
    console.log(department, regd_no, subjectName);
    formData.append("myFile[]", this.state.fileUpload);
    formData.append("subjectName", subjectName);
    formData.append("department", department);
    formData.append("regd_no", regd_no);

    axios
      .post("/studentassignment", formData)
      .then((res) => {
        console.log(res.data);
      })
      .catch((e) => console.log(e));
  };
  handleCancel = () => {
    this.setState({ fileIndex: -1 });
    this.setState({ fileUpload: null });
  };
  render() {
    const { userDetail, subjects, fileUpload, fileIndex } = this.state;
    const { handleFileUpload, handleSave, handleCancel } = this;
    return (
      <div>
        <Alert variant="dark" style={{ padding: "20px", margin: "20px" }}>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <h3 style={{ flex: "1" }}>Assignments</h3>
            <Alert variant="success">
              Hello {userDetail.name} from {userDetail.department.toUpperCase()}
            </Alert>
          </div>
        </Alert>
        <Alert variant="success" style={{ padding: "20px", margin: "20px" }}>
          <div>
            {subjects.map((value, index) => {
              return (
                <div key={value.id}>
                  {value.department
                    .split(",")
                    .map((v) => v.toLowerCase())
                    .includes(userDetail.department.toLowerCase()) &&
                    value.status === "APPROVED" &&
                    value.isActive === 1 && (
                      <Card
                        body
                        style={{
                          margin: "10px",
                        }}
                      >
                        <div>
                          <Row>
                            <Col>
                              <span>{value.subjectName}</span>
                            </Col>
                            <Col
                              style={{
                                display: "flex",
                                justifyContent: "flex-end",
                              }}
                            >
                              <input
                                type="file"
                                // id="actual-btn"
                                id={value.id}
                                hidden
                                onChange={(e) => handleFileUpload(e, value.id)}
                                multiple={false}
                                accept="application/pdf,application/vnd.ms-excel"
                              />
                              <label
                                // htmlFor="actual-btn"
                                htmlFor={value.id}
                                style={{
                                  backgroundColor: "indigo",
                                  color: "white",
                                  padding: "0.5rem",
                                  fontFamily: "sans-serif",
                                  borderRadius: "0.3rem",
                                  cursor: "pointer",
                                  //   marginTop: "1rem",
                                  width: "200px",
                                  textAlign: "center",
                                }}
                              >
                                Upload Assignment
                              </label>
                            </Col>
                          </Row>
                        </div>
                        <div className="file__info">
                          <hr />
                          <Row>
                            <Col>
                              {value.id === fileIndex && fileUpload.name}
                            </Col>
                            {value.id === fileIndex && (
                              <Col
                                style={{
                                  display: "flex",
                                  justifyContent: "flex-end",
                                }}
                              >
                                <Button
                                  style={{ width: "100px" }}
                                  onClick={() => handleSave(value)}
                                >
                                  Save
                                </Button>
                                <Button
                                  style={{ width: "100px", marginLeft: "10px" }}
                                  onClick={handleCancel}
                                >
                                  Cancel
                                </Button>
                              </Col>
                            )}
                          </Row>
                        </div>
                      </Card>
                    )}
                </div>
              );
            })}
          </div>
        </Alert>
      </div>
    );
  }
}
