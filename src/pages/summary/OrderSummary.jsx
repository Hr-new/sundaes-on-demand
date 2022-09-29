import React from "react";
import { useOrderDetails } from "../../context/OrderDetails";
import SummaryForm from "./SummaryForm";

const OrderSummary = ({ setOrderPhase }) => {
    const [OrderDetails] = useOrderDetails()

    const hasScoops = OrderDetails.totals.scoops !== "$0.00"
    let scoopDisplay = null
    if (hasScoops) {
        // get list of scoop selected and display them in order list
        const scoopArray = Array.from(OrderDetails.scoops.entries());
        const scoopList = scoopArray.map(([key, value]) => (
            <li key={key} >
                {value} {key}
            </li>
        ));
        scoopDisplay = (
            <>
                <h2>Scoops:{OrderDetails?.totals.scoops}</h2>
                <ul>{scoopList}</ul>
            </>
        )
    }

    // Check whetrher topping is selected or not by it's total

    const hasToppings = OrderDetails.totals.toppings !== "$0.00"
    let toppingsDisplay = null;
    if (hasToppings) {
        const toppingsArray = Array.from(OrderDetails.toppings.entries());
        const toppingList = toppingsArray.map(([key, value]) =>
            <li key={key}>{key}</li>);
        toppingsDisplay = (
            <>
                <h2>Toppings:{OrderDetails.totals.toppings}</h2>
                <ul>{toppingList}</ul>
            </>
        );
    }


    return (
        <>

            <h2>Order Summary</h2>
            {scoopDisplay}
            {toppingsDisplay}
            <SummaryForm setOrderPhase={setOrderPhase} />
        </>
    )

}

export default OrderSummary;