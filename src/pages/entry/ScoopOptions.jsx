import React from "react";
import Col from "react-bootstrap/Col";

const ScoopOptions = ({ name, image }) => {
    return <Col xs={12} s={6} md={4} lg={3} style={{ textAlign: 'center' }}>
        <img src={`http://localhost:3030/${image}`} alt={`${name} Scoop`} />
    </Col>
}

export default ScoopOptions