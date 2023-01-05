import React from 'react';
import './App.css';
import Header from "./components/layout/Header";
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from "./components/layout/Footer";
import {BrowserRouter, Navigate, Outlet, Route, Routes} from "react-router-dom";
import Home from "./components/Home";
import Items from "./components/items/Items";
import CreateItem from "./components/items/CreateItem";
import ItemDetail from "./components/items/ItemDetail";
import UserOverview from "./components/customers/UserOverview";
import CreateCustomer from "./components/customers/CreateCustomer";

function App() {
    return (
        <>
        <Header/>
            <main className="container-fluid">
                <section className="row">
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/items" element={<Items />} />
                            <Route path="/items/:id" element={<ItemDetail />} />
                            <Route path="/items/create" element={<CreateItem />} />
                            <Route path="/users" element={<UserOverview />} />
                            <Route path="/users/create" element={<CreateCustomer />} />
                            <Route path="*" element={<Navigate to="/" />} />
                        </Routes>
                    </BrowserRouter>
                    <Outlet />
                </section>
            </main>
        <Footer/>
        </>
    );
}

export default App;
