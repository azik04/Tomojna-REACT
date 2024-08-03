import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Order from './Views/Order';
import Orders from './Views/Orders'; 
import LayOut from './Views/LayOut';
import LogIn from './Views/LogIn';
import Users from './Views/Users';
import Transportation from './Views/Transportation';
import Transportations from './Views/Transportations';
import FreightForwarder from './Views/FreightForwarder';
import Stock from './Views/Stock';
import ShippingRate from './Views/ShippingRate';
const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<LogIn />} />
                <Route path="/" element={<LayOut />}>
                    <Route path="Orders" element={<Orders />} />
                    <Route path="Order/:id/Itemtransport/:itemTransportId" element={<Transportation />} />
                    <Route path="Order/:id/Itemtransports" element={<Transportations />} />
                    <Route path="Order/:id" element={<Order />} />
                    <Route path="Users" element={<Users />} />
                    <Route path="FreightForwarder" element={<FreightForwarder />} />
                    <Route path="Stock" element={<Stock />} />
                    <Route path="Order/:id/ShippingRate" element={<ShippingRate />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
