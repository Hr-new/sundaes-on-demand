import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import ScoopOptions from './ScoopOptions'
import Row from "react-bootstrap/Row";

const Options = ({optionType='scoops'}) => {
    const [items, setItems] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:3030/${optionType}`).
            then((response) => { setItems(response.data) }).
            catch((error) => {
                // handle later
            })

    }, [optionType])

    const ItemComponent = optionType === 'scoops' ? ScoopOptions : null;

    const optionItems = items?.map(item =>
        <ItemComponent
            key={item?.name}
            name={item?.name}
            image={item?.imagePath}
        />)


    return <Row>{optionItems}</Row>
}

export default Options