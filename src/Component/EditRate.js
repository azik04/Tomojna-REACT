import React from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import Photo from '../Photos/Cancel.svg';

const EditRate = ({onClose, id}) => {
const [data, setData] = useState({})
const [currency, setCurrency] = useState()
const [price, setPrice] = useState()
useEffect(()=>{
    const fetch = async() =>{
        const res = await axios.get(`https://localhost:7161/api/ShippingRate/${id}`)
        setData(res.data.data)
    }
    fetch()
},[id])

const edtRate = async() =>{
    const res = await axios.put(`https://localhost:7161/api/ShippingRate/${id}`,{
        currency : currency,
        price : price
    })
    onClose()
    window.location.reload()
}
    return (
        <section className="pop" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 100 }}>
        <div className="pop-order" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', maxWidth: '40%', maxHeight: '98%', overflowY: 'auto' }}>
            <div className="pop-order-header">
                <div className="pop-order-header-name">
                    <h2>Edit ShippingRate</h2>
                </div>
                <div className="pop-order-header-icon">
                    <button onClick={onClose}><img src={Photo} alt="Close" /></button>
                </div>
            </div>
            <form onSubmit={edtRate} className="pop-order-main">
                <div className="pop-order-main-one">
                    <p>Price</p>
                    <input type="text" defaultValue={data.price} placeholder="Price" onChange={(e) => setPrice(e.target.value)} />
                </div>
                <div className="pop-order-main-one">
                    <p>Currency</p>
                    <input type="text" defaultValue={data.currency} placeholder="Currency" onChange={(e) => setCurrency(e.target.value)} />
                </div>
                <div className="pop-order-main-footer">
                    <div className="pop-order-main-footer-date">
                        <p>Create: Adil 2023.05.11</p>
                    </div>
                    <div className="pop-order-main-footer-btn">
                        <button type="submit">Done</button>
                    </div>
                </div>
            </form>
        </div>
    </section>
    );
}

export default EditRate;
