import React from "react";
import { Card, ListGroup } from "react-bootstrap";
import Department from "./Department";
import Position from "./Position";
const DepartmentAndPosition = () => {
  return (
    <div>
      <Card style={{ width: "18rem" }}>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <Position />
          </ListGroup.Item>
          <ListGroup.Item>
            <Department />
          </ListGroup.Item>
        </ListGroup>
      </Card>
    </div>
  );
};

export default DepartmentAndPosition;
