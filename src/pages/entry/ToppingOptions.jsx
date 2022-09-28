import React from "react";
import { Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

const ToppingOptions = ({ name, image, updateItemCount }) => {

    return (
        <Col xs={6} sm={4} md={3} lg={2} style={{ textAlign: 'center' }}>
            <img
                src={`http://localhost:3030/${image}`}
                alt={`${name} topping`}
                style={{ width: '75%' }}
            />
            <Form.Group controlId={`${name}-topping-checkbox`} >
                <Form.Check 
                type="checkbox" 
                onChange={(e) => updateItemCount(name, e.currentTarget.checked ? 1 : 0)} 
                label={name} />
            </Form.Group>
        </Col>
    );

}

export default ToppingOptions