import React from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import Photo from '../Photos/Cancel.svg';  


const CreateItem = ({ onClose }) => {
    const { id } = useParams();
    const [name, setName] = useState('');
    const [comment, setComment] = useState('');
    const [hsCode, setHsCode] = useState('');

    const addItem = async (event) => {
        event.preventDefault();
        try {
            var res = await axios.post(`https://localhost:7161/api/Order/${id}/item`, {
                name: name,
                comment: comment,
                hsCode: hsCode
                
            });
            console.log("succes", res)
            window.location.reload();
            onClose();
        } catch (error) {
            console.error('Error adding item', error);
        }
    };

    return (
        <section className="pop" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 100 }}>
            <div className="pop-order" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', maxWidth: '40%', maxHeight: '98%', overflowY: 'auto' }}>
                <div className="pop-order-header">
                    <div className="pop-order-header-name">
                        <h2>Create Item</h2>
                    </div>
                    <div className="pop-order-header-icon">
                        <button onClick={onClose}><img src={Photo} alt="Close" /></button>
                    </div>
                </div>
                <div className="pop-order-main">
                    <div className="pop-order-main-one">
                        <p>Name</p>
                        <input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} />
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
                        <p>hsCode</p>
                        <input type="text" placeholder="From" onChange={(e) => setHsCode(e.target.value)} />
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
                            <button onClick={addItem}>Done</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default CreateItem;