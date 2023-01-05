import {z} from "zod";

export const basicCustomerSchema = z.object({
    id: z.string(),
    firstname: z.string(),
    lastname: z.string()
});

export enum Country {
    BELGIUM = "Belgium",
    FRANCE = "France",
    GERMANY = "Germany"
}

export const fullCustomerSchema = z.object({
    id: z.string().optional(),
    firstname: z.string().min(2),
    lastname: z.string().min(2),
    email: z.object({
        localPart: z.string().min(2),
        domain: z.string().min(2),
        complete: z.string().email()
    }),
    address: z.object({
        streetName: z.string().min(2),
        houseNumber: z.string().min(1),
        postalCode: z.string().min(4),
        country: z.nativeEnum(Country)
    }),
    phoneNumber: z.object({
        number: z.string().min(2),
        countryCallingCode: z.string().min(2)
    })
});

export type BasicCustomerSchemaType = z.infer<typeof basicCustomerSchema>;
export type FullCustomerSchemaType = z.infer<typeof fullCustomerSchema>;

export const getAllUsers = async () => {
    const response = await fetch("http://localhost:9000/customers")
    return await response.json()
}

export const addCustomer = async (data: FullCustomerSchemaType) => {
    const url = "http://localhost:9000/customers"
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