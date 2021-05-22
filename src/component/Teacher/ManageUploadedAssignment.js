import React, { useEffect, useState } from "react";
import { Alert, Table, Col, Button, Modal, Row, Form } from "react-bootstrap";
import axios from "axios";
import FileSaver from "file-saver";
import { URL } from "../../Constants";

const ManageUploadedAssignment = () => {
  const [data, setData] = useState([]);
  const [filteredArray, setfilteredArray] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [marks, setMarks] = useState({
    id: "",
    assignedmarks: "",
    totalmarks: "",
  });

  useEffect(() => {
    axios
      .get(`${URL}/api/assignment`)
      .then((res) => {
        setData(res.data);
        setfilteredArray(res.data);
      })
      .catch((e) => console.log(e));
  }, []);

  const handleFileDownload = (value) => {
    const { filename, mimetype } = value;
    axios({
      url: `${URL}/api/download`,
      method: "POST",
      responseType: "arraybuffer",
      data: { filename },
    })
      .then((res) => {
        var blob = new Blob([res.data], { type: mimetype });
        FileSaver.saveAs(blob, filename);
      })
      .catch((e) => console.log(e));
  };

  const handleMarksEntry = (value) => {
    const { id, assignedmarks, totalmarks } = value;
    setMarks({
      id: id,
      assignedmarks: assignedmarks === null ? "" : assignedmarks,
      totalmarks: totalmarks === null ? "" : totalmarks,
    });
    handleShow();
  };
  const handleOnchange = (e) => {
    const values = { ...marks };
    values[e.target.name] = e.target.value;
    setMarks(values);
  };

  const handleSave = () => {
    axios
      .post(`${URL}/api/updateMarks`, marks)
      .then((res) => {
        reloadTable();
        handleClose();
      })
      .catch((e) => console.log(e));
  };

  const reloadTable = async () => {
    await axios
      .get(`${URL}/api/assignment`)
      .then((res) => {
        setData(res.data);
        setfilteredArray(res.data);
      })
      .catch((e) => console.log(e));
  };

  return (
    <div>
      <Col sm={12}>
        <Alert variant="success" style={{ marginTop: "20px" }}>
          Manage Assignment
        </Alert>
        <span style={{ color: "red" }}>
          ** Click on Assign / Total marks to assign marks
        </span>
        <Row>
          <Table striped bordered hover variant="dark" responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Department</th>
                <th>Subject Name</th>
                <th>Section</th>
                <th>Semester</th>
                <th>Registration No</th>
                <th>FileName</th>
                <th>Assigned Marks</th>
                <th>Total Marks</th>
                <th>Uploaded At</th>
                <th>Download</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th></th>
                <td>
                  <input
                    type="text"
                    onChange={(e) => {
                      const value = e.target.value;
                      const id = data.filter((val) =>
                        val.department
                          .toLowerCase()
                          .includes(value.toLowerCase())
                      );
                      setfilteredArray(id);
                    }}
                    placeholder="Search Department"
                    style={{
                      border: "none",
                      padding: "5px",
                      borderRadius: "5px",
                    }}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    onChange={(e) => {
                      const value = e.target.value;
                      const id = data.filter((val) =>
                        val.subject_name
                          .toLowerCase()
                          .includes(value.toLowerCase())
                      );
                      setfilteredArray(id);
                    }}
                    placeholder="Search Subject"
                    style={{
                      border: "none",
                      padding: "5px",
                      borderRadius: "5px",
                    }}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    onChange={(e) => {
                      const value = e.target.value;
                      const id = data.filter((val) =>
                        val.section.toLowerCase().includes(value.toLowerCase())
                      );
                      setfilteredArray(id);
                    }}
                    placeholder="Search Section"
                    style={{
                      border: "none",
                      padding: "5px",
                      borderRadius: "5px",
                    }}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    onChange={(e) => {
                      const value = e.target.value;
                      const id = data.filter((val) =>
                        val.semester.toLowerCase().includes(value.toLowerCase())
                      );
                      setfilteredArray(id);
                    }}
                    placeholder="Search Semester"
                    style={{
                      border: "none",
                      padding: "5px",
                      borderRadius: "5px",
                    }}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    onChange={(e) => {
                      const value = e.target.value;
                      const id = data.filter((val) =>
                        val.regd_no.toLowerCase().includes(value.toLowerCase())
                      );
                      setfilteredArray(id);
                    }}
                    placeholder="Search Regd. no."
                    style={{
                      border: "none",
                      padding: "5px",
                      borderRadius: "5px",
                    }}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    onChange={(e) => {
                      const value = e.target.value;
                      const id = data.filter((val) =>
                        val.filename.toLowerCase().includes(value.toLowerCase())
                      );
                      setfilteredArray(id);
                    }}
                    placeholder="Search FileName"
                    style={{
                      border: "none",
                      padding: "5px",
                      borderRadius: "5px",
                    }}
                  />
                </td>
                <td></td>
                <td></td>
                <td>
                  <input
                    type="text"
                    onChange={(e) => {
                      const value = e.target.value;
                      const id = data.filter((val) =>
                        val.uploadedat
                          .toLowerCase()
                          .includes(value.toLowerCase())
                      );
                      setfilteredArray(id);
                    }}
                    placeholder="Search Time"
                    style={{
                      border: "none",
                      padding: "5px",
                      borderRadius: "5px",
                    }}
                  />
                </td>
                <td></td>
              </tr>
              {data.length !== 0 &&
                filteredArray.map((value, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{value.department}</td>
                      <td>{value.subject_name}</td>
                      <td>{value.section}</td>
                      <td>{value.semester}</td>
                      <td>{value.regd_no}</td>
                      <td>{value.filename}</td>
                      <td onClick={() => handleMarksEntry(value)}>
                        {value.assignedmarks === null ||
                        value.assignedmarks === "" ? (
                          <i
                            style={{
                              cursor: "pointer",
                            }}
                            className="fas fa-plus-circle"
                          ></i>
                        ) : (
                          value.assignedmarks
                        )}
                      </td>
                      <td onClick={() => handleMarksEntry(value)}>
                        {value.totalmarks === null ||
                        value.totalmarks === "" ? (
                          <i
                            style={{
                              cursor: "pointer",
                            }}
                            className="fas fa-plus-circle"
                          ></i>
                        ) : (
                          value.totalmarks
                        )}
                      </td>
                      <td>{value.uploadedat}</td>
                      <td
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-around",
                        }}
                      >
                        <i
                          className="fas fa-download"
                          style={{ cursor: "pointer" }}
                          onClick={() => handleFileDownload(value)}
                        ></i>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
        </Row>
        <Modal
          show={show}
          onHide={handleClose}
          onExit={() => setMarks({ id: "", assignedmarks: "", totalmarks: "" })}
        >
          <Modal.Header closeButton>
            <Modal.Title>Edit Marks</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col>
                <Form.Group controlId="exampleForm.assignedmarks">
                  <Form.Label>Assign Marks</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Assigned Marks"
                    name="assignedmarks"
                    value={marks.assignedmarks}
                    onChange={(e) => handleOnchange(e)}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="exampleForm.totalmararks">
                  <Form.Label>Total Marks</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Total Marks"
                    name="totalmarks"
                    value={marks.totalmarks}
                    onChange={(e) => handleOnchange(e)}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSave}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </Col>
    </div>
  );
};

export default ManageUploadedAssignment;
