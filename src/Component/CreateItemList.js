import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Photo from '../Photos/Cancel.svg';

const CreateItemList = ({ onClose }) => {
    const [item, setItem] = useState([]);
    const { itemTransportId } = useParams();

    const remList = async () => {
        try {
            const res = await axios.post(`https://localhost:7161/api/Order/itemtransports/${itemTransportId}/assign-items`, {
                itemIds: item
            });
            console.log(res);
            onClose();
            window.location.reload();
        } catch (error) {
            console.error("Error assigning items:", error);
        }
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        setItem(value.split(',').map(id => id.trim())); 
    };

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
                        <p>Item</p>
                        <input type="text" placeholder="Enter item IDs separated by commas" onChange={handleInputChange} />
                    </div>
                    <div className="pop-order-main-footer">
                        <div className="pop-order-main-footer-date">
                            <p>Create: Adil 2023.05.11</p>
                        </div>
                        <div className="pop-order-main-footer-btn">
                            <button onClick={remList}>Done</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CreateItemList;
