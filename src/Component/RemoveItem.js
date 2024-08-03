import axios from 'axios';
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import Photo from '../Photos/Cancel.svg';

const RemoveItem = ({ onClose, itemId }) => {
    const { id } = useParams();

    const remItem = async () => {
        try {
            const response = await axios.delete(`https://localhost:7161/api/Order/${id}/item/${itemId}`);
            console.log('Successfully removed item');
            console.log(response);
            onClose();
            window.location.reload(); 
        } catch (error) {
            console.log("Error", error);
        }
    };

    return (
        <section className="pop" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 100 }}>
            <div className="pop-order" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', maxWidth: '40%', maxHeight: '98%', overflowY: 'auto' }}>
                <div className="pop-order-header">
                    <div className="pop-order-header-name">
                        <h2>Remove Item</h2>
                    </div>
                    <div className="pop-order-header-icon">
                        <button onClick={onClose}><img src={Photo} alt="Close" /></button>
                    </div>
                </div>
                <div className="pop-order-main">
                    <p>Do you want to remove this item?</p>
                    <div className="pop-order-main-footer">
                        <div className="pop-order-main-footer-date">
                            <p>Create: Adil 2023.05.11</p>
                        </div>
                        <div className="pop-order-main-footer-btn">
                            <button onClick={remItem}>Done</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default RemoveItem;
