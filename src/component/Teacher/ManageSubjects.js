import React, { Component } from "react";
import { Table, Alert, Button, Modal, Row, Col, Form } from "react-bootstrap";
import axios from "axios";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import {URL} from "../../Constants"
export default class ManageSubjects extends Component {
  constructor() {
    super();
    this.state = {
      teacherData: {
        employee_id: "",
        department: "",
        ishod: -1,
        name: "",
        position: "",
      },
      show: false,
      data: [
        {
          subjectCode: "",
          subjectName: "",
          semester: "",
          isActive: 1,
          department: "",
        },
      ],
      deptArray: [{ value: "", label: "" }],
      subject: [],
    };
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleExit = this.handleExit.bind(this);
    this.updateTable = this.updateTable.bind(this);
    this.handleActivate = this.handleActivate.bind(this);
    this.handleDeactivate = this.handleDeactivate.bind(this);
  }
  async componentDidMount() {
    document.title = "Manage Subjects";
    const deptObj = { value: "", label: "" };

    await axios
      .get(`${URL}/api/getParticularTeacher`)
      .then((response) => this.setState({ teacherData: response.data[0] }))
      .catch((e) => console.log(e));

    await axios
      .get(`${URL}/api/getDepartment`)
      .then((res) => {
        const deptArrays = res.data.map((val) => {
          deptObj.value = val.dept_name;
          deptObj.label = val.dept_name;
          return { value: deptObj.value, label: deptObj.label };
        });
        this.setState({ deptArray: deptArrays });
        // { value: "chocolate", label: "Chocolate" }
      })
      .catch((e) => {
        console.log(e);
      });

    await axios
      .get(`${URL}/api/getSubject`)
      .then((res) => {
        this.setState({ subject: res.data });
      })
      .catch((e) => {
        console.log(e);
        this.props.removeToken();
        this.props.history.push("/");
      });
  }
  handleShow = () => this.setState({ show: true });
  handleClose = () => this.setState({ show: false });
  handleChange = (index, target, selectIndex) => {
    const values = [...this.state.data];
    if (target.name === "department") {
      let finalQuery = "";
      //  SelectedIndex is the index
      // here index = value
      // here target is action which consists name
      if (index.length === 0) {
        index = "";
      } else {
        index.map((value) => (finalQuery = finalQuery + value.value + ","));
        index = finalQuery.slice(0, -1);
      }
      // final value
      values[selectIndex][target.name] = index;
    } else if (target.name === "isActive") {
      values[index]["isActive"] = target.checked;
    } else {
      values[index][target.name] = target.value;
      // values[index][event.target.name] = event.target.value);
    }
    this.setState({ data: values });
  };

  handleAdd = () => {
    var values = [...this.state.data];
    values = [
      ...this.state.data,
      {
        subjectCode: "",
        subjectName: "",
        semester: "",
        isActive: 1,
        department: "",
      },
    ];
    this.setState({ data: values });
  };

  handleRemove = (index) => {
    const values = [...this.state.data];
    values.splice(index, 1);
    this.setState({ data: values });
  };

  handleSave = () => {
    axios
      .post(`${URL}/api/createSubject`, this.state.data)
      .then((res) => {
        this.handleClose();
        this.updateTable();
      })
      .catch((e) => {
        console.log(e);
      });
  };
  updateTable = async () => {
    await axios
      .get(`${URL}/api/getSubject`)
      .then((res) => {
        this.setState({ subject: res.data });
      })
      .catch((e) => {
        console.log(e);
        this.props.removeToken();
        this.props.history.push("/");
      });
  };
  handleExit = () => {
    this.setState({
      data: [
        {
          subjectCode: "",
          subjectName: "",
          semester: "",
          isActive: 1,
          department: "",
        },
      ],
    });
  };
  handleActivate = async (value) => {
    const isActive = 1;
    const { id, status } = value;
    await axios
      .put(`${URL}/api/editSubject`, { id, status, isActive })
      .then((res) => {
        this.updateTable();
      })
      .catch((e) => console.log(e));
  };
  handleDeactivate = async (value) => {
    const isActive = 0;
    const { id, status } = value;
    await axios
      .put(`${URL}/api/editSubject`, { id, status, isActive })
      .then((res) => {
        this.updateTable();
      })
      .catch((e) => console.log(e));
  };
  render() {
    const { teacherData } = this.state;
    if (teacherData.ishod === -1) {
      return <div></div>;
    }
    if (teacherData.ishod === 0) {
      return (
        <div style={{ width: "80%", marginLeft: "40px", marginTop: "50px" }}>
          <Alert variant="success">
            <Alert.Heading>Hey, nice to see you !</Alert.Heading>
            <p>
              Subject Creation privileges are only with Head of Department
              (HOD).
            </p>
            <hr />
            <p className="mb-0">Request Your HOD to create a subject.</p>
          </Alert>
        </div>
      );
    } else {
      const {
        handleShow,
        handleClose,
        handleChange,
        handleAdd,
        handleRemove,
        handleSave,
        handleExit,
        handleActivate,
        handleDeactivate,
      } = this;
      const { show, data, deptArray, subject } = this.state;
      const animatedComponents = makeAnimated();
      // const options = [
      //   { value: "chocolate", label: "Chocolate" },
      //   { value: "strawberry", label: "Strawberry" },
      //   { value: "vanilla", label: "Vanilla" },
      // ];
      return (
        <div>
          <Button
            variant="primary"
            onClick={handleShow}
            style={{ marginTop: "50px", marginBottom: "50px" }}
          >
            Manage Subjects{" "}
            <i className="fas fa-pencil-alt" style={{ cursor: "pointer" }}></i>
          </Button>

          <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            size="lg"
            onExit={handleExit}
          >
            <Modal.Header closeButton>
              <Modal.Title style={{ display: "flex", flex: "1" }}>
                Manage Subjects
              </Modal.Title>
              <Button
                style={{
                  marginRight: "20px",
                }}
                onClick={handleAdd}
              >
                <i className="fas fa-plus"></i>
                {"  "}Add
              </Button>
            </Modal.Header>
            <Modal.Body>
              {data.map((value, index) => (
                <div key={index}>
                  <Row>
                    <Col>
                      <Form.Group controlId="formBasicsubjectCode">
                        <Form.Label>Subject Code</Form.Label>
                        <Form.Control
                          type="input"
                          placeholder="Enter Subject Code"
                          name="subjectCode"
                          value={value.subjectCode}
                          onChange={(e) => {
                            handleChange(index, e.target);
                          }}
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group controlId="formBasicName">
                        <Form.Label>Subject Name</Form.Label>
                        <Form.Control
                          type="input"
                          placeholder="Enter Subject name"
                          name="subjectName"
                          value={value.subjectName}
                          onChange={(e) => {
                            handleChange(index, e.target);
                          }}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>Select Semester</Form.Label>
                        <Form.Control
                          as="select"
                          name="semester"
                          onChange={(e) => {
                            handleChange(index, e.target);
                          }}
                        >
                          {["1", "2", "3", "4", "5", "6", "7", "8"].map(
                            (val, index) => (
                              <option key={index}>{val}</option>
                            )
                          )}
                        </Form.Control>
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group controlId="formBasicposition">
                        <Form.Label>Select Departments</Form.Label>
                        <Select
                          closeMenuOnSelect={false}
                          components={animatedComponents}
                          // defaultValue={[options[1]]}
                          isMulti
                          options={deptArray}
                          name="department"
                          // value={value.position}
                          onChange={(value, action) => {
                            handleChange(value, action, index);
                          }}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col style={{ display: "flex", flex: "1" }}>
                      <Form.Group controlId="formBasicCheckbox">
                        <Form.Label>Subect Status </Form.Label>
                        <Form.Text className="text-muted">
                          Unchecking the box will deactive the subject. By
                          default the subject is set as active.
                        </Form.Text>
                        <Form.Check
                          type="checkbox"
                          checked={value.isActive}
                          label="Mark this subject as active ?"
                          name="isActive"
                          onChange={(e) => {
                            handleChange(index, e.target);
                          }}
                        />
                      </Form.Group>
                    </Col>
                    <Button
                      style={{ marginBottom: "20px", marginRight: "50px" }}
                      onClick={() => handleRemove(index)}
                    >
                      <i className="fas fa-minus"></i>
                      {"  "}Remove
                    </Button>
                  </Row>
                  <hr />
                </div>
              ))}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={handleSave}>
                Save
              </Button>
            </Modal.Footer>
          </Modal>
          <footer
            style={{
              position: "fixed",
              bottom: "0",
              left: "0",
              width: "100%",
              backgroundColor: "gray",
              color: "black",
              paddingLeft: "20px",
            }}
          >
            <pre>
              <strong>NOTE : </strong> Creating subject will create a request to
              your admin. Subjects will be created only after approvals.
            </pre>
          </footer>
          {subject.length !== 0 && (
            <Table
              striped
              bordered
              hover
              variant="dark"
              style={{ width: "90%" }}
            >
              <thead>
                <tr>
                  <th>#</th>
                  <th>Subject Code</th>
                  <th>Subject Name</th>
                  <th>Semester</th>
                  <th>Department</th>
                  <th>Status</th>
                  <th>Display subject to students</th>
                </tr>
              </thead>
              <tbody>
                {subject.map((value, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{value.subjectCode}</td>
                      <td>{value.subjectName}</td>
                      <td>{value.semester}</td>
                      <td>{value.department}</td>
                      <td>{value.status}</td>
                      <td
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-around",
                        }}
                      >
                        <div>{value.isActive === 1 ? "YES" : "NO"}</div>
                        <div>
                          <strong>|</strong>
                        </div>
                        {value.isActive === 0 ? (
                          <i
                            className="fas fa-check"
                            style={{ cursor: "pointer" }}
                            onClick={() => handleActivate(value)}
                          ></i>
                        ) : (
                          <i
                            className="fas fa-times"
                            style={{ cursor: "pointer" }}
                            onClick={() => handleDeactivate(value)}
                          ></i>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          )}
        </div>
      );
    }
  }
}
