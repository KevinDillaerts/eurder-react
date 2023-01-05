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
    id: z.string(),
    firstname: z.string(),
    lastname: z.string(),
    email: z.object({
        localPart: z.string(),
        domain: z.string(),
        complete: z.string()
    }),
    address: z.object({
        streetName: z.string(),
        houseNumber: z.string(),
        postalCode: z.string(),
        country: z.nativeEnum(Country)
    }),
    phoneNumber: z.object({
        number: z.string(),
        countryCallingCode: z.string()
    })
});

export type BasicCustomerSchemaType = z.infer<typeof basicCustomerSchema>;
export type FullCustomerSchemaType = z.infer<typeof fullCustomerSchema>;

export const getAllUsers = async () => {
    const response = await fetch("http://localhost:9000/customers")
    return await response.json()
}