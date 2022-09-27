import React from "react";
import { Col } from "react-bootstrap";

const ToppingOptions = ({ name, image,updateItemCount }) => {

    return (
        <Col xs={12} s={6} md={4} lg={3} style={{ textAlign: 'center' }}>
            <img src={`http://localhost:3030/${image}`} alt={`${name} topping`} />
        </Col>
    )

}

export default ToppingOptions