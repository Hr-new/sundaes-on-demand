import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import ScoopOptions from './ScoopOptions'
import Row from "react-bootstrap/Row";
import ToppingOptions from "./ToppingOptions";
import AlertBanner from "../common/AlertBanner";
import { PricePerItems } from "../../contstants/index"
import { useOrderDetails } from '../../context/OrderDetails'

const Options = ({ optionType }) => {
    const [items, setItems] = useState([])
    const [error, setError] = useState(false)
    const [OrderDetails, updateItemCount] = useOrderDetails();

    useEffect(() => {
        axios.get(`http://localhost:3030/${optionType}`).
            then((response) => { setItems(response.data) }).
            catch((error) => setError(true))

    }, [optionType])

    const ItemComponent = optionType === 'scoops' ? ScoopOptions : ToppingOptions;
    const title = optionType[0].toUpperCase() + optionType.slice(1).toLowerCase()

    const optionItems = items?.map(item =>
        <ItemComponent
            key={item?.name}
            name={item?.name}
            image={item?.imagePath}
            updateItemCount={(itemName, newItemCount) => updateItemCount(itemName, newItemCount, optionType)}
        />)
    if (error) return <AlertBanner />
    return (<>
        <h2>{title}</h2>
        <p>{PricePerItems[optionType]} each</p>
        <p>
            {title} total:{OrderDetails.totals[optionType]}
        </p>
        <Row>{optionItems}</Row>

    </>)
}

export default Options