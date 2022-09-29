import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { OverlayTrigger, Popover } from "react-bootstrap";
import { useOrderDetails } from "../../context/OrderDetails";


const SummaryForm = ({ setOrderPhase }) => {
    const [isEnable, setIsEnable] = useState(false)
    
    const popover = (
        <Popover id="popover-basic">
            <Popover.Body>
                no icecream will actually be delivery
            </Popover.Body>
        </Popover>
    );
    const checkboxlabel = (
        <span>
            I agree to
            <OverlayTrigger placement="right" overlay={popover}>
                <span style={{ backgroundColor: "blue" }}>terms and conditions </span>
            </OverlayTrigger>
        </span>
    );

    const handleSubmit = (e) => {
        e.preventDefault()
        setOrderPhase('completed')
    }
    return (
        <>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="terms-and-conditions">
                    <Form.Check
                        type="checkbox"
                        onChange={(e) => setIsEnable(e.target.checked)}
                        label={checkboxlabel}
                        checked={isEnable} />
                </Form.Group>
                <Button type="submit" variant="primary" disabled={!isEnable} >Confirm Order</Button>
            </Form>
        </>
    );
}
export default SummaryForm;