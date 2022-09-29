import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import { useOrderDetails } from "../../context/OrderDetails";

const OrderConfirmation = ({ setOrderPhase }) => {
    const [orderNumber, setOrderNumber] = useState(null)
    const [, , resetOrder] = useOrderDetails()

    useEffect(() => {
        axios.post('http://localhost:3030/order')
            .then((res) => {
                setOrderNumber(res.data.orderNumber)
            })
            .catch((error) => {
                // Do later
            })
    }, [])

    const handleClick = () => {
        // Reset previous order Data
        resetOrder()

        // Change OrderPhase
        setOrderPhase('In Progress')
    }

    if (orderNumber) {
        return (
            <>
                <h2>Thank You</h2>
                <p>You order Number is:{orderNumber}</p>
                <p>As per our terms and condition nothing will happen now</p>
                <Button onClick={handleClick}>Create new order</Button>
            </>
        )

    }
    else {
        return <h2>Loading</h2>
    }
}

export default OrderConfirmation;