import React, { useState } from 'react';
import Photo from '../Photos/Cancel.svg';
import axios from 'axios'
import { Link } from 'react-router-dom';

    const NewOrderPopup = ({ onClose }) => {
    const [name, setName] = useState();
    const [comment, setComment] = useState();
    const fetchNew = async() =>{
        var res = await axios.post(`https://localhost:7161/api/Order`,{
            name : name,
            comment : comment
        })
        onClose()
        window.location.reload();
    }
    return (
        <section className="pop" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 100 }}>
            <div className="pop-order" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', maxWidth: '40%', maxHeight: '98%', overflowY: 'auto' }}>
                <div className="pop-order-header">
                    <div className="pop-order-header-name">
                        <h2>Create Order</h2>
                    </div>
                    <div className="pop-order-header-icon">
                        <button onClick={onClose}><img src={Photo} alt="Close" /></button>
                    </div>
                </div>
                <div className="pop-order-main">
                    <div className="pop-order-main-one">
                        <p>Name</p>
                        <input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)}/>
                    </div>
                    <div className="pop-order-main-inp">
                        <div className="pop-order-main-inp-one">
                            <p>Status</p>
                            <input type="text" placeholder="Status" />
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
                        <p>From</p>
                        <input type="text" placeholder="From" />
                    </div>
                    <div className="pop-order-main-one">
                        <p>To</p>
                        <input type="text" placeholder="To" />
                    </div>
                    <div className="pop-order-main-one">
                        <p>Comment</p>
                        <textarea placeholder="Comment" onChange={(e) => setComment(e.target.value)}></textarea>
                    </div>
                    <div className="pop-order-main-footer">
                        <div className="pop-order-main-footer-date">
                            <p>Create: Adil 2023.05.11</p>
                        </div>
                        <div className="pop-order-main-footer-btn">
                            <Link to={`/Orders`} onClick={(event) => fetchNew(event)}>Done</Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default NewOrderPopup;