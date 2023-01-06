import {ItemSchemaType} from "./itemservice";


export type ItemBasketType = {
    itemId: string,
    itemName: string,
    orderedAmount: number
    price: number
}

export const getBasket = (): ItemBasketType[] => {
    return JSON.parse(sessionStorage.getItem("eurder-basket") ?? "[]")
}

export const addToBasket = async (item: ItemSchemaType) => {
    const basket = getBasket()

    if (basket.some(basketItem => basketItem.itemId === item.id)) {
        const updatedBasket = basket.map(basketItem => {
            if (basketItem.itemId === item.id) {
                basketItem.orderedAmount++
            }
            return basketItem
        })
        sessionStorage.setItem("eurder-basket", JSON.stringify(updatedBasket))
    } else {
        sessionStorage.setItem("eurder-basket", JSON.stringify([...basket, {
            itemId: item.id,
            itemName: item.name,
            price: item.price,
            orderedAmount: 1
        }]))
    }
}

export const updateBasket = async (basket: ItemBasketType[]) => {
    sessionStorage.setItem("eurder-basket", JSON.stringify(basket))
}