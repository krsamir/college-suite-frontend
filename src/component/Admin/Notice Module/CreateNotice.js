import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  FormControl,
  Form,
} from "react-bootstrap";
import axios from "axios";
import { adminSummary } from "../../../Redux/Actions/UserAction";
import { removeToken } from "../../../Redux/Actions/TokenAction";
import {
  successToast,
  ErrorToast,
  warningToast,
} from "../../../Redux/Actions/ToastAction";
import { connect } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NoticeTable from "./NoticeTable";
function CreateNotice(props) {
  const [handleInput, setHandleInput] = useState({
    noticeTitle: "",
    noticeBody: "",
  });
  const handleChange = (e) => {
    const values = { ...handleInput };
    values[e.target.name] = e.target.value;
    setHandleInput(values);
  };

  const handleSave = () => {
    if (handleInput.noticeTitle === "") {
      props.warningToast("Title cannot be empty !");
    }
    if (handleInput.noticeBody === "") {
      props.warningToast("Body cannot be empty !");
    }
    if (handleInput.noticeTitle !== "" && handleInput.noticeBody !== "") {
      axios
        .post("/api/create-notice", handleInput)
        .then((res) => {
          if (res.data === "success") {
            props.successToast("Notice Created Successfully!");
            setHandleInput({
              noticeTitle: "",
              noticeBody: "",
            });
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          }
        })
        .catch((e) => {
          console.log(e);
          props.ErrorToast("Notice cannot be created due to some issue!");
          props.removeToken();
          props.history.push("/");
        });
    }
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "30px",
      }}
    >
      <Container>
        <Row className="justify-content-md-center">
          <Col md="8">
            <h3 style={{ marginBottom: "20px" }}> Create Notice</h3>
            <Form>
              <Form.Label>Title</Form.Label>
              <FormControl
                type="text"
                placeholder="Title"
                name="noticeTitle"
                onChange={(e) => handleChange(e)}
                className="mr-sm-2"
                maxLength="200"
                value={handleInput.noticeTitle}
                required
              />
              <Form.Label>Body</Form.Label>
              <Form.Control
                name="noticeBody"
                as="textarea"
                placeholder="Body"
                value={handleInput.noticeBody}
                rows={3}
                onChange={(e) => handleChange(e)}
                maxLength="2000"
                required
              />
              <Button
                variant="dark"
                style={{ marginTop: "20px" }}
                onClick={handleSave}
              >
                Save
              </Button>
            </Form>
          </Col>
        </Row>
        <Row
          className="justify-content-md-center"
          style={{ marginTop: "50px" }}
        >
          <Col md="8">
            <h3 style={{ marginBottom: "20px" }}> Edit / Delete Notice</h3>
            <NoticeTable {...props} />
          </Col>
        </Row>
      </Container>

      <ToastContainer />
    </div>
  );
}

export default connect(null, {
  adminSummary,
  successToast,
  ErrorToast,
  warningToast,
  removeToken,
})(CreateNotice);
