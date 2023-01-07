import React, {useEffect, useState} from 'react';
import {ItemBasketType} from "../../services/basketService";

interface BasketInputProps {
    updateQuantity: (id: string, quantity: number) => void;
    deleteItem: (id: string) => void;
    item: ItemBasketType
}

const BasketDetailView = ({updateQuantity, deleteItem, item}: BasketInputProps) => {
    const [amount, setAmount] = useState(item.orderedAmount)
    const {format} = new Intl.NumberFormat("nl-BE",
        {
            style: 'currency', currency: "EUR", maximumFractionDigits: 2
        })

    useEffect(() => {
        if (amount !== item.orderedAmount && amount > 0) {
            updateQuantity(item.itemId, amount)
        }
    }, [amount, item, updateQuantity])

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        setAmount(parseInt(e.target.value))
    }

    return (
        <tr>
            <td>{item.itemId}</td>
            <td>{item.itemName}</td>
            <td>
                <input type="number" value={amount} min={1} max={9999} onChange={handleInputChange}/>
            </td>
            <td>{format(item.price * item.orderedAmount)}</td>
            <td className="d-flex justify-content-center"><button type="button" onClick={ () => deleteItem(item.itemId)}
                        className="btn btn-danger">X</button></td>
        </tr>
    );
};

export default BasketDetailView;