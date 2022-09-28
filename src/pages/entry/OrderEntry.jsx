import React from "react"
import { Row } from "react-bootstrap"
import { useOrderDetails } from "../../context/OrderDetails";
import Options from './Options'

const OrderEntry = () => {
    const [OrderDetails] = useOrderDetails();
    return (<Row >
        <Options optionType='scoops' />
        <Options optionType='toppings' />
        <br />
        <h2>Grand Total:{OrderDetails.totals['grandTotals']}</h2>
    </Row>)
}

export default OrderEntry