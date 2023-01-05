import React, {useCallback, useState} from 'react';
import Filter from "./Filter";
import {Badge, Card, Container} from "react-bootstrap";
import {Item} from "../../types/types";
import {useNavigate} from "react-router-dom";

interface ItemGalleryProps {
    items: Item[];
}

const ItemGallery = ({items}: ItemGalleryProps) => {
    const [searchTerm, setSearchTerm] = useState("")
    const navigate = useNavigate();

    const displayItems = useCallback(
        () => items.filter(item => item.name.toLowerCase().startsWith(searchTerm.toLowerCase())),
        [searchTerm, items]
    )

    const setStockColor = (stockLvl: String) => {
        switch (stockLvl) {
            case "STOCK_LOW":
                return "danger"
            case "STOCK_MEDIUM":
                return "warning"
            default:
                return "success"
        }
    }

    function handleItemClick(id: string) {
        navigate(`/items/${id}`)
    }

    return (
        <>

            <div className="one-line mb-3">
                <h1>Items</h1>
                <Filter searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
            </div>
            <Container className="item-container mx-auto">
                {items.length > 0 ? displayItems().map(item =>
                        (<Card key={item.id} onClick={() => handleItemClick(item.id)} style={{width: '320px'}}>
                            <Card.Img variant="top" src="https://placekeanu.com/320/180"/>
                            <Card.Body>
                                <Card.Title>{item.name}</Card.Title>
                                <div className="one-line">
                                    <Card.Text className="m-0">
                                        € {item.price}
                                    </Card.Text>
                                    <Badge
                                        className={`badge rounded-pill bg-${setStockColor(item.stockUrgency)} px-2 py-1`}>
                                        {item.stockUrgency.toLowerCase().substring(6)}
                                    </Badge>
                                </div>
                            </Card.Body>
                        </Card>))
                    : <p>Loading</p>
                }
            </Container>
        </>
    );
};

export default ItemGallery;