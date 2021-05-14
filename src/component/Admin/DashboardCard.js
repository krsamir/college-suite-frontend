import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import "./Home.css";
function DashboardCard(props) {
  const { redirectionLink, image, title, body } = props;
  return (
    <LinkContainer to={redirectionLink} style={{ cursor: "pointer" }}>
      <div className="cardBox">
        <div className="cardTile">
          <img src={image} alt="" />
          <div className="texts">
            <span className="cardTitle">{title}</span> <br />
            <span className="cardBody">{body}</span>
          </div>
        </div>
      </div>
    </LinkContainer>
  );
}

export default DashboardCard;
