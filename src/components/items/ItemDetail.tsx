import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {getSingleItem, updateItem} from "../../services/itemservice";

const schema = z.object({
    name: z.string().min(2).max(50),
    description: z.string().min(2).max(255),
    price: z.number().nonnegative(),
    amountOfStock: z.number().nonnegative()
});

type FormSchemaType = z.infer<typeof schema>;

const ItemDetail = () => {
    const {register, handleSubmit, watch, reset, setValue, formState: {errors}} = useForm<FormSchemaType>({
        resolver: zodResolver(schema)
    });
    const {id} = useParams()
    const [editable, setEditable] = useState(false);
    const [item, setItem] = useState<FormSchemaType>()
    const descriptionWatcher = watch("description", "");
    const navigate = useNavigate();

    useEffect(() => {
        id && getSingleItem(id).then(data => setItem(data))
    }, [id])

    useEffect(() => {
        if (item) {
            setValue("name", item.name)
            setValue("description", item.description)
            setValue("price", item.price)
            setValue("amountOfStock", item.amountOfStock)
        }
    }, [item, setValue])

    const onSubmit = async (data: FormSchemaType) => {
        id && updateItem(id, data).then(response => console.log(response?.json()))
        reset();
        navigate("/items")
    };


    function handleBackClick() {
        navigate("/items")
    }

    function handleEditClick(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault()
        setEditable(true)
    }

    return (
        <div className="wrapper">
            <h1>Item details</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className={`form-control ${errors.name && "is-invalid"}`} id="name"
                           disabled={!editable}
                           {...register("name")}/>
                    {errors.name?.message && <p className="error-text">{errors.name?.message}</p>}
                </div>

                <div className="mb-4">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea rows={4} className={`form-control ${errors.description && "is-invalid"}`} id="description"
                              disabled={!editable}
                              {...register("description")}/>
                    {errors.description?.message && <p className="error-text">{errors.description?.message}</p>}
                    <div className="position-relative">
                        <p className={`d-inline-block position-absolute top-0 end-0 ${descriptionWatcher.length > 255 && "text-danger"}`}>{`${descriptionWatcher.length}/255`}</p>
                    </div>
                </div>

                <div className="one-line start">
                    <div className="mb-4 me-3">
                        <label htmlFor="price" className="form-label">Price</label>
                        <div className="one-line">
                            <span className="input-group-text eurosign">€</span>
                            <input type="number" step=".05"
                                   className={`form-control ps-5 pe-0 ${errors.price && "is-invalid"}`} id="price"
                                   disabled={!editable}
                                   {...register("price", {valueAsNumber: true})}/>
                        </div>
                        {errors.price?.message && <p className="error-text">{errors.price?.message}</p>}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="amount" className="form-label">Amount of stock</label>
                        <input type="number" className={`form-control ${errors.amountOfStock && "is-invalid"}`}
                               id="amount" disabled={!editable}
                               {...register("amountOfStock", {valueAsNumber: true})}/>
                        {errors.amountOfStock?.message && <p className="error-text">{errors.amountOfStock?.message}</p>}
                    </div>
                </div>
                <div className="row mt-5">
                    {editable ? <button type="submit" className="btn btn-success btn-lg col-8">Update</button>
                        : <button type="button" onClick={handleEditClick}
                                  className="btn btn-primary btn-lg col-8">Edit</button>
                    }
                    <button type="button" onClick={handleBackClick}
                            className="btn btn-warning btn-lg col-3 ms-auto">Back
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ItemDetail;