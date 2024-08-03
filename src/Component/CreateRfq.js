import React, { useState } from 'react';
import Photo from '../Photos/Cancel.svg';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const CreateRfq = ({ onClose }) => {
    const { id, itemTransportId } = useParams();

    const fetchNew = async () => {
        try {
            await axios.post(`https://localhost:7161/api/Order/rfq/generate?orderId=${id}&itemTransportId=${itemTransportId}`);
            onClose();
            window.location.reload();
        } catch (error) {
            console.log('Failed to create RFQ. Please try again.');
        } 
    };

    return (
        <section className="pop" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 100 }}>
            <div className="pop-order" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', maxWidth: '40%', maxHeight: '98%', overflowY: 'auto' }}>
                <div className="pop-order-header">
                    <div className="pop-order-header-name">
                        <h2>Create Rfg</h2>
                    </div>
                    <div className="pop-order-header-icon">
                        <button onClick={onClose}><img src={Photo} alt="Close" /></button>
                    </div>
                </div>
                <div className="pop-order-main">
                    <div className="pop-order-main-one">
                        <p>Do you want to Create Orders RFQ???</p>
                    </div>
                    <div className="pop-order-main-footer">
                        <div className="pop-order-main-footer-date">
                            <p>Create: Adil 2023.05.11</p>
                        </div>
                        <div className="pop-order-main-footer-btn">
                            <button onClick={fetchNew}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CreateRfq;
