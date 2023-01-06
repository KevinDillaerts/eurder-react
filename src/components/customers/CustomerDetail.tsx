import React, {useEffect, useState} from 'react';
import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import {useForm} from "react-hook-form";
import {
    Country,
    fullCustomerSchema,
    FullCustomerSchemaType,
    getSingleUser,
    updateCustomer
} from "../../services/customerservice";
import {zodResolver} from "@hookform/resolvers/zod/dist/zod";

const CustomerDetail = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const [searchParams] = useSearchParams();
    const [editable, setEditable] = useState(true)
    const [customer, setCustomer] = useState<FullCustomerSchemaType>()

    const {
        register,
        handleSubmit,
        watch,
        reset,
        setValue,
        formState: {errors}
    } = useForm<FullCustomerSchemaType>({
        resolver: zodResolver(fullCustomerSchema)
    });

    const localPart = watch("email.localPart", "")
    const domain = watch("email.domain", "")

    useEffect(() => {
        if (id) {
            getSingleUser(id).then(data => setCustomer(data))
            if (!searchParams.get("edit")) setEditable(false)
        }
    }, [id, searchParams])

    useEffect(() => {
        if (customer) {
            reset(customer)
        }
    }, [customer, reset])

    useEffect(() => {
        setValue("email.complete", `${localPart}@${domain}`)
    }, [localPart, domain, setValue])

    const onSubmit = async (data: FullCustomerSchemaType) => {
        id && await updateCustomer(id, data)
        reset();
        navigate("/users")
    };

    function handleBackClick() {
        navigate("/users")
    }


    function handleEditClick(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault()
        setEditable(true)
    }

    return (
        <div className="wrapper">
            <h1>Add a new customer</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="one-line mb-3">
                    <div className="form-group full me-3">
                        <label htmlFor="firstname" className="form-label">Firstname</label>
                        <input type="text" className={`form-control ${errors.firstname && "is-invalid"}`}
                               id={"firstname"} disabled={!editable}
                               {...register("firstname")}/>
                        {errors.firstname && <p className="error-text">{errors.firstname?.message}</p>}
                    </div>

                    <div className="form-group full">
                        <label htmlFor="lastname" className="form-label">Lastname</label>
                        <input type="text" className={`form-control ${errors.lastname && "is-invalid"}`} id={"lastname"}
                               {...register("lastname")} disabled={!editable}/>
                        {errors.lastname && <p className="error-text">{errors.lastname?.message}</p>}
                    </div>
                </div>

                <div className="one-line form-flex mb-3">
                    <div className="form-group full">
                        <label htmlFor="localpart" className="form-label">Email</label>
                        <input type="text" className={`form-control ${errors.email?.localPart && "is-invalid"}`}
                               id={"localpart"} disabled={!editable}
                               {...register("email.localPart")}/>
                        {errors.firstname && <p className="error-text">{errors.email?.localPart?.message}</p>}
                    </div>

                    <span className="input-group-text">@</span>

                    <div className="form-group full">
                        <label htmlFor="domain" className="form-label"></label>
                        <input type="text" className={`form-control ${errors.email?.domain && "is-invalid"}`}
                               id={"domain"} disabled={!editable}
                               {...register("email.domain")}/>
                        {errors.lastname && <p className="error-text">{errors.email?.domain?.message}</p>}
                    </div>
                </div>

                <p>Phone number (mobile)</p>
                <div className="one-line form-flex mb-3">
                    <div className="form-group">
                        <div className="one-line">
                            <span className="input-group-text position-absolute">+</span>
                            <input type="text" disabled={!editable}
                                   className={`form-control ps-5 pe-0 me-3 ${errors.phoneNumber?.countryCallingCode && "is-invalid"}`}
                                   style={{width: "100px"}} id={"countrycode"}
                                   {...register("phoneNumber.countryCallingCode")}/>
                        </div>
                        {errors.firstname &&
                            <p className="error-text">{errors.phoneNumber?.countryCallingCode?.message}</p>}
                    </div>

                    <div className="form-group full">
                        <input type="text" className={`form-control ${errors.phoneNumber?.number && "is-invalid"}`}
                               id={"phonenumber"} disabled={!editable}
                               {...register("phoneNumber.number")}/>
                        {errors.lastname && <p className="error-text">{errors.phoneNumber?.number?.message}</p>}
                    </div>
                </div>

                <div className="one-line form-flex mb-3">
                    <div className="form-group full me-3 ">
                        <label htmlFor="street" className="form-label">Street name</label>
                        <input type="text" className={`form-control ${errors.address?.streetName && "is-invalid"}`}
                               id={"street"} disabled={!editable}
                               {...register("address.streetName")}/>
                        {errors.lastname && <p className="error-text">{errors.address?.streetName?.message}</p>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="housenumber" className="form-label">Number</label>
                        <input type="text" disabled={!editable}
                               className={`form-control ${errors.address?.houseNumber && "is-invalid"}`}
                               style={{width: "100px"}} id={"housenumber"}
                               {...register("address.houseNumber")}/>
                        {errors.firstname && <p className="error-text">{errors.address?.houseNumber?.message}</p>}
                    </div>
                </div>

                <div className="one-line form-flex mb-3">
                    <div className="form-group full me-3 ">
                        <label htmlFor="postalcode" className="form-label">Postal code</label>
                        <input type="text" className={`form-control ${errors.address?.postalCode && "is-invalid"}`}
                               id={"postalcode"} disabled={!editable}
                               {...register("address.postalCode")}/>
                        {errors.lastname && <p className="error-text">{errors.address?.postalCode?.message}</p>}
                    </div>

                    <div className="form-group full">
                        <label htmlFor="country" className="form-label">Country</label>
                        <select id="country" className={`form-control ${errors.address?.country && "is-invalid"}`}
                                {...register("address.country")} disabled={!editable}>
                            {Object.values(Country).map((value) =>
                                <option key={value} value={value}>{value}</option>)}
                        </select>
                        {errors.address?.country?.message &&
                            <p className="error-text">{errors.address?.country.message}</p>}
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

export default CustomerDetail;