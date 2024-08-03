import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import Photo from '../Photos/Cancel.svg';
import { useParams } from 'react-router-dom';

const CreateShipping = ({ onClose }) => {
    const[price , setPrice] = useState();
    const{id} = useParams();
    const fetchNew = async() =>{
        try{
            axios.post(`https://localhost:7161/api/ShippingRate/${id}`,{
                price: price,
                orderId : id
            })
            onClose()
            window.location.reload();
            console.log("Successfully post Shipping")
        }
        catch(error){
            console.log("Error Create Shipping" , error)
        }
    }
    return (
        <section className="pop" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 100 }}>
            <div className="pop-order" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', maxWidth: '40%', maxHeight: '98%', overflowY: 'auto' }}>
                <div className="pop-order-header">
                    <div className="pop-order-header-name">
                        <h2>Create Shipping</h2>
                    </div>
                    <div className="pop-order-header-icon">
                        <button onClick={onClose}><img src={Photo} alt="Close" /></button>
                    </div>
                </div>
                <div className="pop-order-main">
                    <div className="pop-order-main-one">
                        <p>Name</p>
                        <input type="text" placeholder="Name"/>
                    </div>
                    <div className="pop-order-main-inp">
                        <div className="pop-order-main-inp-one">
                            <p>kgOrLbs</p>
                            <input type="text" placeholder="kgOrLbs" />
                        </div>
                        <div className="pop-order-main-inp-one">
                            <p>Order Date</p>
                            <input type="date" />
                        </div>
                        <div className="pop-order-main-inp-one">
                            <p>Delivery Date</p>
                            <input type="date" />
                        </div>
                        <div className="pop-order-main-inp-one">
                            <p>Transportation Method</p>
                            <input type="text" placeholder="Transportation Method" />
                        </div>
                    </div>
                    <div className="pop-order-main-one">
                        <p>setPrice</p>
                        <input type="text" placeholder="setPrice" onChange={(e) => setPrice(e.target.value)} />
                    </div>
                    <div className="pop-order-main-one">
                        <p>To</p>
                        <input type="text" placeholder="To" />
                    </div>
                    <div className="pop-order-main-one">
                        <p>setOrderId</p>
                        <textarea placeholder="setOrderId"></textarea>
                    </div>
                    <div className="pop-order-main-footer">
                        <div className="pop-order-main-footer-date">
                            <p>Create: Adil 2023.05.11</p>
                        </div>
                        <div className="pop-order-main-footer-btn">
                            <button onClick={fetchNew}>Done</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default CreateShipping;
