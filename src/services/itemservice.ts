import {z} from "zod";

export const itemSchema = z.object({
    id: z.string().optional(),
    name: z.string().min(2).max(50),
    description: z.string().min(2).max(255),
    price: z.number().nonnegative(),
    amountOfStock: z.number().nonnegative(),
    stockUrgency: z.string().optional()
});

export type ItemSchemaType = z.infer<typeof itemSchema>;

export const getAllItems = async () => {
    const response = await fetch("http://localhost:9000/items")
    return await response.json()
}

export const getSingleItem = async (id: string) => {
    const response = await fetch(`http://localhost:9000/items/${id}`)
    return await response.json()
}

export const addNewItem = async (data: ItemSchemaType) => {
    const url = "http://localhost:9000/items"
    try {
        return await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
    } catch (error: any) {
        console.error(error)
    }
}

export const updateItem = async (id: string, data: ItemSchemaType) => {
    const url = `http://localhost:9000/items/${id}`
    try {
      return await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
    } catch (error: unknown) {
        console.error(error)
    }
}