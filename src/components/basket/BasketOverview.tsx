import {getBasket, updateBasket} from "../../services/basketService";
import {Table} from "react-bootstrap";
import BasketDetailView from "./BasketDetailView";
import {useEffect, useState} from "react";

const BasketOverview = () => {
    const [basket, setBasket] = useState(getBasket())

    const updateQuantity = (id: string, quantity: number) => {
        const updatedBasket = getBasket().map(basketItem => {
            if (basketItem.itemId === id) {
                basketItem.orderedAmount = quantity
            }
            return basketItem
        })
        setBasket(updatedBasket)
    }

    const deleteItem = (id: string) => {
        setBasket(basket.filter(item => item.itemId !== id))
    }

    useEffect(() => {
        (async () => await updateBasket(basket))()
    }, [basket])

    return (
        <div className="wrapper">
            {basket.length > 0 ?
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Quantity</th>
                        <th>Price</th>
                    </tr>
                    </thead>
                    <tbody>
                    {basket.map(item => <BasketDetailView
                            key={item.itemId}
                            item={item}
                            updateQuantity={updateQuantity}
                            deleteItem={deleteItem}
                    />)}
                    <tr>
                        <td></td>
                        <td></td>
                        <td>total amount</td>
                        <td>€ {basket.reduce((sub, item) => sub + (item.price * item.orderedAmount), 0)}</td>
                    </tr>
                    </tbody>
                </Table>
                :
                <p>No items yet</p>
            }
        </div>
    );
};

export default BasketOverview;