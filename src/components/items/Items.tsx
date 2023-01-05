import React, {useEffect, useState} from 'react';
import ItemGallery from "./ItemGallery";
import {getAllItems, ItemSchemaType} from "../../services/itemservice";

const Items = () => {
    const [items, setItems] = useState<ItemSchemaType[]>([]);

    useEffect(() => {
        getAllItems().then(data => setItems(data))
    }, [])


    return (
        <div className="wrapper">
            <ItemGallery items={items}/>
        </div>
    );
};

export default Items;