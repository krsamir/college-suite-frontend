import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import Department from "./Department";
import Position from "./Position";
import EditDepartment from "./EditDepartment";
import EditPosition from "./EditPosition";
const DepartmentAndPosition = (props) => {
  return (
    <div>
      <Container style={{ marginTop: "50px" }}>
        <Row style={{ marginBottom: "30px" }}>
          <Col>
            <Department />
          </Col>
          <Col>
            <Position />
          </Col>
        </Row>
        <Row>
          <Col>
            <EditDepartment {...props} />
          </Col>
          <Col>
            <EditPosition {...props} />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default DepartmentAndPosition;
