import React from 'react';
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod/dist/zod";
import {Country, fullCustomerSchema, FullCustomerSchemaType} from "../../services/customerservice";

const CreateCustomer = () => {
    const {register, handleSubmit, watch, reset, formState: {errors}} = useForm<FullCustomerSchemaType>({
        resolver: zodResolver(fullCustomerSchema)
    });


    return (
        <div className="wrapper">
            <select id="country">
                {Object.values(Country).map((value) =>
                    <option key={value} value={value}>{value}</option>)}
            </select>
        </div>
    );
};

export default CreateCustomer;