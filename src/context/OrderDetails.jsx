import React, { useContext, useEffect, useMemo, useState } from "react";
import { createContext } from "react";
import { PricePerItems } from "../contstants";
import { formatCurrency } from "../utilities";

const OrderDetails = createContext();

// Create Custome hook
const useOrderDetails = (amount) => {
    const context = useContext(OrderDetails)

    if (!context) {
        throw new Error('userDetails must be used within OrderDetailsProvider')
    }
    return context
}


const calculateSubTotals = (orderType, optionsDetails) => {
    let optionCount = 0
    for (const count of optionsDetails[orderType].values()) {
        optionCount += count;
    }
    return optionCount * PricePerItems[orderType]

}

// Create Provider
const OrderDetailsProvider = (props) => {
    const [optionsCounts, setOptionCount] = useState({
        scoops: new Map(),
        toppings: new Map()
    })
    const zeroCurrency = formatCurrency(0)
    const [totals, setTotals] = useState({
        scoops: zeroCurrency,
        toppings: zeroCurrency,
        grandTotals: zeroCurrency

    })
    useEffect(() => {
        const scoopSubTotals = calculateSubTotals('scoops', optionsCounts)
        const toppingSubTotals = calculateSubTotals('toppings', optionsCounts)
        const grandTotals = scoopSubTotals + toppingSubTotals
        setTotals({
            scoops: formatCurrency(scoopSubTotals),
            toppings: formatCurrency(toppingSubTotals),
            grandTotals: formatCurrency(grandTotals)
        })
    }, [optionsCounts])

    // Reset scoop and topping value
    const resetOrder = () => {
        setOptionCount({
            scoops: new Map(),
            toppings: new Map()
        })
    }


    // Value is combination of getter and setter
    const value = useMemo(() => {
        const updateItemCount = (itemName, newItemCount, optionType) => {
            const newOptionCount = { ...optionsCounts }

            // update option count for this item with the new value
            const optionCountMap = optionsCounts[optionType]
            optionCountMap.set(itemName, parseInt(newItemCount))

            setOptionCount(newOptionCount)
        }

        // geter:options count,totals,subtotal
        // setter:update options count
        return [{ ...optionsCounts, totals }, updateItemCount, resetOrder]
    }, [optionsCounts, totals])

    return <OrderDetails.Provider value={value} {...props} />

}

export { OrderDetailsProvider, useOrderDetails }