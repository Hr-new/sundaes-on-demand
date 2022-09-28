import React from "react"
import { Button, Row } from "react-bootstrap"
import { useOrderDetails } from "../../context/OrderDetails";
import Options from './Options'

const OrderEntry = () => {
    const [OrderDetails] = useOrderDetails();
    return (<Row >
        <Options optionType='scoops' />
        <Options optionType='toppings' />
        <br />
        <h2>Grand Total:{OrderDetails.totals['grandTotals']}</h2>
        <Button>Place Order</Button>
    </Row>)
}

export default OrderEntry