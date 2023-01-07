import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {getSingleItem, updateItem} from "../../services/itemservice";
import {addToBasket} from "../../services/basketService";
import {Alert} from "react-bootstrap";

const schema = z.object({
    name: z.string().min(2).max(50),
    description: z.string().min(2).max(255),
    price: z.number().nonnegative(),
    amountOfStock: z.number().nonnegative()
});

type FormSchemaType = z.infer<typeof schema>;

const ItemDetail = () => {
    const {register, handleSubmit, watch, reset, formState: {errors}} = useForm<FormSchemaType>({
        resolver: zodResolver(schema)
    });
    const {id} = useParams()
    const [editable, setEditable] = useState(true);
    const [item, setItem] = useState<FormSchemaType>()
    const [added, setAdded] = useState(false)
    const descriptionWatcher = watch("description", "");
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            getSingleItem(id).then(data => setItem(data))
            setEditable(false)
        }
    }, [id])

    useEffect(() => {
        if (item) {
            reset(item)
        }
    }, [item, reset])

    const onSubmit = async (data: FormSchemaType) => {
        id && updateItem(id, data).then(response => console.log(response?.json()))
        reset();
        navigate("/items")
    };

    function handleEditClick(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault()
        setEditable(true)
    }

    async function handleAddToBasketClick() {
        item && await addToBasket(item)
        setAdded(true)
    }

    function handleInEditBackClick() {
        setEditable(false)
        navigate(`/items/${id}`)
    }

    return (
        <div className="wrapper">
            <h2>Item {id}</h2>
            {added &&
                <div className="d-flex align-content-center my-3">
                    <Alert variant="success">
                        Item was added to your cart, visit your cart to update the quantity
                    </Alert>
                    <button type="button" onClick={() => navigate("/basket")}
                            className="btn btn-info btn-lg col-2 ms-auto">View basket
                    </button>
                </div>
            }
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

                <div className="one-line start mb-3">
                    <div className="me-3">
                        <label htmlFor="price" className="form-label">Price</label>
                        <div className="one-line">
                            <span className="input-group-text position-absolute">€</span>
                            <input type="number" step=".05"
                                   className={`form-control ps-5 pe-0 ${errors.price && "is-invalid"}`} id="price"
                                   disabled={!editable}
                                   {...register("price", {valueAsNumber: true})}/>
                        </div>
                        {errors.price?.message && <p className="error-text">{errors.price?.message}</p>}
                    </div>

                    <div>
                        <label htmlFor="amount" className="form-label">Amount of stock</label>
                        <input type="number" className={`form-control ${errors.amountOfStock && "is-invalid"}`}
                               id="amount" disabled={!editable}
                               {...register("amountOfStock", {valueAsNumber: true})}/>
                        {errors.amountOfStock?.message && <p className="error-text">{errors.amountOfStock?.message}</p>}
                    </div>
                </div>
                <div className="row mt-5">
                    {!editable && !added && <button type="button" onClick={handleAddToBasketClick}
                                          className="btn btn-info btn-lg col-2">Add to basket
                    </button>}
                    {editable ?
                        <>
                            <button type="submit" className="btn btn-success btn-lg col-4 ms-auto">Update</button>
                            <button type="button" onClick={handleInEditBackClick}
                                    className="btn btn-warning btn-lg col-2 ms-2">Back
                            </button>
                        </>
                        :
                        <>
                            <button type="button" onClick={handleEditClick}
                                    className="btn btn-primary btn-lg col-4 ms-auto">Edit
                            </button>
                            <button type="button" onClick={() => navigate(`/items`)}
                                    className="btn btn-warning btn-lg col-2 ms-2">Back
                            </button>
                        </>
                    }
                </div>
            </form>
        </div>
    );
};

export default ItemDetail;