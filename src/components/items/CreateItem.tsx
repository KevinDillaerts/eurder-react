import {z} from "zod";
import { useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

const schema = z.object({
    name: z.string().min(2).max(50),
    description: z.string().min(2).max(255),
    price: z.number().nonnegative(),
    amount: z.number().nonnegative()
});

type FormSchemaType = z.infer<typeof schema>;

const CreateItem = () => {

    const {register, handleSubmit, watch, reset, formState: {errors}} = useForm<FormSchemaType>({
        resolver: zodResolver(schema)
    });

    const onSubmit = (data:any) => {
        console.log(data)
        reset()
    };


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
                </div>

                <div className="one-line start">
                    <div className="mb-4 me-3">
                        <label htmlFor="price" className="form-label">Price</label>
                        <div className="one-line">
                            <span className="input-group-text eurosign">€</span>
                            <input type="number" step=".01" className={`form-control ps-5 pe-0 ${errors.price && "is-invalid"}`} id="price"
                                   {...register("price", { valueAsNumber: true })}/>
                        </div>
                            {errors.price?.message && <p className="error-text">{errors.price?.message}</p>}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="amount" className="form-label">Amount of stock</label>
                        <input type="number" className={`form-control ${errors.amount && "is-invalid"}`} id="amount"
                               {...register("amount", { valueAsNumber: true })}/>
                        {errors.amount?.message && <p className="error-text">{errors.amount?.message}</p>}
                    </div>
                </div>
                <div className="row mt-5">
                    <button type="submit" className="btn btn-success btn-lg col-8">Create</button>
                    <button type="submit" className="btn btn-warning btn-lg col-3 ms-auto">Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default CreateItem;