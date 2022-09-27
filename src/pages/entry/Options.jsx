import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import ScoopOptions from './ScoopOptions'
import Row from "react-bootstrap/Row";
import ToppingOptions from "./ToppingOptions";
import AlertBanner from "../common/AlertBanner";

const Options = ({ optionType }) => {
    const [items, setItems] = useState([])
    const [error, setError] = useState(false)

    useEffect(() => {
        axios.get(`http://localhost:3030/${optionType}`).
            then((response) => { setItems(response.data) }).
            catch((error) => setError(true))

    }, [optionType])

    const ItemComponent = optionType === 'scoops' ? ScoopOptions : ToppingOptions;

    const optionItems = items?.map(item =>
        <ItemComponent
            key={item?.name}
            name={item?.name}
            image={item?.imagePath}
        />)
    if (error) return <AlertBanner />
    return <Row>{optionItems}</Row>
}

export default Options