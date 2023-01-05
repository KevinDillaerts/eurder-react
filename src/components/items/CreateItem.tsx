import { useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useNavigate} from "react-router-dom";
import {itemSchema, ItemSchemaType, addNewItem} from "../../services/itemservice";

const CreateItem = () => {
    const {register, handleSubmit, watch, reset, formState: {errors}} = useForm<ItemSchemaType>({
        resolver: zodResolver(itemSchema)
    });

    const descriptionWatcher = watch("description", "");

    const navigate = useNavigate();

    const onSubmit = async (data: ItemSchemaType) => {
        addNewItem(data).then(response => console.log(response?.json()))
        reset();
        navigate("/items")
    };


    function handleCancelClick() {
        navigate("/items")
    }

    return (
        <div className="wrapper">
            <h1>Add a new item</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className={`form-control ${errors.name && "is-invalid"}`} id="name"
                           {...register("name")}/>
                    {errors.name?.message && <p className="error-text">{errors.name?.message}</p>}
                </div>

                <div className="mb-4">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea rows={4} className={`form-control ${errors.description && "is-invalid"}`} id="description"
                              {...register("description")}/>
                    {errors.description?.message && <p className="error-text">{errors.description?.message}</p>}
                    <div className="position-relative">
                    <p className={`d-inline-block position-absolute top-0 end-0 ${descriptionWatcher.length > 255 && "text-danger"}`} >{`${descriptionWatcher.length}/255`}</p>
                    </div>
                </div>

                <div className="one-line start">
                    <div className="mb-4 me-3">
                        <label htmlFor="price" className="form-label">Price</label>
                        <div className="one-line">
                            <span className="input-group-text eurosign">€</span>
                            <input type="number" step=".05" className={`form-control ps-5 pe-0 ${errors.price && "is-invalid"}`} id="price"
                                   {...register("price", { valueAsNumber: true })}/>
                        </div>
                            {errors.price?.message && <p className="error-text">{errors.price?.message}</p>}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="amount" className="form-label">Amount of stock</label>
                        <input type="number" className={`form-control ${errors.amountOfStock && "is-invalid"}`} id="amountOfStock"
                               {...register("amountOfStock", { valueAsNumber: true })}/>
                        {errors.amountOfStock?.message && <p className="error-text">{errors.amountOfStock?.message}</p>}
                    </div>
                </div>
                <div className="row mt-5">
                    <button type="submit" className="btn btn-success btn-lg col-8">Create</button>
                    <button type="button" onClick={handleCancelClick} className="btn btn-warning btn-lg col-3 ms-auto">Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default CreateItem;