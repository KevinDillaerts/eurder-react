import React, {useCallback, useEffect, useState} from 'react';
import {getAllUsers, BasicCustomerSchemaType} from "../../services/customerservice";
import {Table} from "react-bootstrap";
import Filter from "../items/Filter";
import {useNavigate} from "react-router-dom";

const UserOverview = () => {
    const [customers, setCustomers] = useState<BasicCustomerSchemaType[]>([])
    const [searchTerm, setSearchTerm] = useState("")
    const navigate = useNavigate();

    const displayCustomers = useCallback(
        () => customers.filter(user => user.lastname.toLowerCase().startsWith(searchTerm.toLowerCase())),
        [searchTerm, customers]
    )

    useEffect(() => {
        getAllUsers().then(data => setCustomers(data))
    }, [])

    function handleNewCustomerClick() {
        navigate(`/users/create`)
    }

    return (
        <div className="wrapper">
            <div className="one-line mb-3">
                <h1>Items</h1>
                <Filter searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
            </div>
            {customers.length > 0 ?
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th className="d-flex justify-content-center">
                            <button type="button" onClick={handleNewCustomerClick} className="btn btn-success">New customer</button>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {displayCustomers().map(({id, firstname, lastname}) =>
                        <tr key={id}>
                            <td>{id}</td>
                            <td>{firstname}</td>
                            <td>{lastname}</td>
                            <td className="d-flex justify-content-around">
                                <button type="button" className="btn btn-warning">View</button>
                                <button type="button" className="btn btn-primary">Edit</button>
                            </td>
                        </tr>
                    )}
                    </tbody>
                </Table>
                : <p>Loading</p>
            }
        </div>
    );
};

export default UserOverview;