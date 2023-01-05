import React, {useEffect} from 'react';
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod/dist/zod";
import {addCustomer, Country, fullCustomerSchema, FullCustomerSchemaType} from "../../services/customerservice";
import {useNavigate} from "react-router-dom";

const CreateCustomer = () => {
    const navigate = useNavigate();

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
        setValue("email.complete", `${localPart}@${domain}`)
    }, [localPart, domain, setValue])

    useEffect(() => console.log(errors), [errors])

    const onSubmit = async (data: FullCustomerSchemaType) => {
       await addCustomer(data)
        reset();
        navigate("/users")
    };

    function handleCancelClick() {
        navigate("/items")
    }

    return (
        <div className="wrapper">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="one-line mb-3">
                    <div className="form-group full me-3">
                        <label htmlFor="firstname" className="form-label">Firstname</label>
                        <input type="text" className={`form-control ${errors.firstname && "is-invalid"}`}
                               id={"firstname"}
                               {...register("firstname")}/>
                        {errors.firstname && <p className="error-text">{errors.firstname?.message}</p>}
                    </div>

                    <div className="form-group full">
                        <label htmlFor="lastname" className="form-label">Lastname</label>
                        <input type="text" className={`form-control ${errors.lastname && "is-invalid"}`} id={"lastname"}
                               {...register("lastname")}/>
                        {errors.lastname && <p className="error-text">{errors.lastname?.message}</p>}
                    </div>
                </div>

                <div className="one-line form-flex mb-3">
                    <div className="form-group full">
                        <label htmlFor="localpart" className="form-label">Email</label>
                        <input type="text" className={`form-control ${errors.email?.localPart && "is-invalid"}`}
                               id={"localpart"}
                               {...register("email.localPart")}/>
                        {errors.firstname && <p className="error-text">{errors.email?.localPart?.message}</p>}
                    </div>

                    <span className="input-group-text">@</span>

                    <div className="form-group full">
                        <label htmlFor="domain" className="form-label"></label>
                        <input type="text" className={`form-control ${errors.email?.domain && "is-invalid"}`}
                               id={"domain"}
                               {...register("email.domain")}/>
                        {errors.lastname && <p className="error-text">{errors.email?.domain?.message}</p>}
                    </div>
                </div>

                <p>Phone number (mobile)</p>
                <div className="one-line form-flex mb-3">
                    <div className="form-group">
                        <div className="one-line">
                            <span className="input-group-text position-absolute">+</span>
                            <input type="text"
                                   className={`form-control ps-5 pe-0 me-3 ${errors.phoneNumber?.countryCallingCode && "is-invalid"}`}
                                   style={{width: "100px"}} id={"countrycode"}
                                   {...register("phoneNumber.countryCallingCode")}/>
                        </div>
                        {errors.firstname &&
                            <p className="error-text">{errors.phoneNumber?.countryCallingCode?.message}</p>}
                    </div>

                    <div className="form-group full">
                        <input type="text" className={`form-control ${errors.phoneNumber?.number && "is-invalid"}`}
                               id={"phonenumber"}
                               {...register("phoneNumber.number")}/>
                        {errors.lastname && <p className="error-text">{errors.phoneNumber?.number?.message}</p>}
                    </div>
                </div>

                <div className="one-line form-flex mb-3">
                    <div className="form-group full me-3 ">
                        <label htmlFor="street" className="form-label">Street name</label>
                        <input type="text" className={`form-control ${errors.address?.streetName && "is-invalid"}`}
                               id={"street"}
                               {...register("address.streetName")}/>
                        {errors.lastname && <p className="error-text">{errors.address?.streetName?.message}</p>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="housenumber" className="form-label">Number</label>
                        <input type="text"
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
                               id={"postalcode"}
                               {...register("address.postalCode")}/>
                        {errors.lastname && <p className="error-text">{errors.address?.postalCode?.message}</p>}
                    </div>

                    <div className="form-group full">
                        <label htmlFor="country" className="form-label">Country</label>
                        <select id="country" className={`form-control ${errors.address?.country && "is-invalid"}`}
                                {...register("address.country")}>
                            {Object.values(Country).map((value) =>
                                <option key={value} value={value}>{value}</option>)}
                        </select>
                        {errors.address?.country?.message &&
                            <p className="error-text">{errors.address?.country.message}</p>}
                    </div>
                </div>

                <div className="row mt-5">
                    <button type="submit" className="btn btn-success btn-lg col-8">Create</button>
                    <button type="button" onClick={handleCancelClick}
                            className="btn btn-warning btn-lg col-3 ms-auto">Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateCustomer;