import React from 'react';
import Photo from '../Photos/Cancel.svg';
import axios from 'axios';
import { Link } from 'react-router-dom';

const RemoveShipping = ({ onClose, id }) => {
    const remShip = async () => {
        try {
            await axios.delete(`https://localhost:7161/api/ShippingRate/${id}`);
            console.log('Successfully removed shipping');
            onClose();
            window.location.reload(); 
        } catch (error) {
            console.log('Error removing shipping', error);
        }
    };

    return (
        <section className="pop" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 100 }}>
            <div className="pop-order" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', maxWidth: '40%', maxHeight: '98%', overflowY: 'auto' }}>
                <div className="pop-order-header">
                    <div className="pop-order-header-name">
                        <h2>Remove Shipping</h2>
                    </div>
                    <div className="pop-order-header-icon">
                        <button onClick={onClose}><img src={Photo} alt="Close" /></button>
                    </div>
                </div>
                <div className="pop-order-main">
                    <p>Do you want to remove this Shipping?</p>
                    <div className="pop-order-main-footer">
                        <div className="pop-order-main-footer-date">
                            <p>Create: Adil 2023.05.11</p>
                        </div>
                        <div className="pop-order-main-footer-btn">
                            <button onClick={remShip}>Done</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default RemoveShipping;
