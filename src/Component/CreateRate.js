import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Photo from '../Photos/Cancel.svg';  

const CreateRate = ({onClose}) => {
    const [price, setPrice] = useState()
    const [currency, setCurrency] = useState()
    const {id} = useParams()
    const crtRate = async() =>{
        const res = await axios.post(`https://localhost:7161/api/ShippingRate/${id}`,{
            price : price,
            currency : currency,
            orderId : id
        })
        console.log(res)
        onClose()
    }
    return (
        <section className="pop" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 100 }}>
        <div className="pop-order" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', maxWidth: '40%', maxHeight: '98%', overflowY: 'auto' }}>
            <div className="pop-order-header">
                <div className="pop-order-header-name">
                    <h2>Create ShippingRate</h2>
                </div>
                <div className="pop-order-header-icon">
                    <button onClick={onClose}><img src={Photo} alt="Close" /></button>
                </div>
            </div>
            <div className="pop-order-main">
                <div className="pop-order-main-one">
                    <p>Price</p>
                    <input type="text" placeholder="Price" onChange={(e) => setPrice(e.target.value)} />
                </div>
                <div className="pop-order-main-one">
                    <p>Currency</p>
                    <input type="text" placeholder="Currency"  onChange={(e) => setCurrency(e.target.value)} />
                </div>
                <div className="pop-order-main-footer">
                    <div className="pop-order-main-footer-date">
                        <p>Create: Adil 2023.05.11</p>
                    </div>
                    <div className="pop-order-main-footer-btn">
                        <button onClick={crtRate}>Done</button>
                    </div>
                </div>
            </div>
        </div>
    </section>
    );
}

export default CreateRate;
