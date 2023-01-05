import React, {useEffect, useState} from 'react';
import {Item} from "../../types/types";
import ItemGallery from "./ItemGallery";

const Items = () => {
    const [items, setItems] = useState<Item[]>([]);

    useEffect(() => {
        (async function getItems() {
            const response = await fetch("http://localhost:9000/items")
            const data = await response.json()
            setItems(data)
        })()
    }, [])


    return (
        <div className="wrapper">
            <ItemGallery items={items}/>
        </div>
    );
};

export default Items;