import React, { useState, useEffect } from 'react';
import Photo from '../Photos/Cancel.svg';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const EditOrder = ({ onClose }) => {
    const [name, setName] = useState('');
    const [comment, setComment] = useState('');
    const [details, setDetails] = useState(null); 
    const { id } = useParams();

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                const res = await axios.get(`https://localhost:7161/api/Order/${id}`);
                setDetails(res.data.data);
                setName(res.data.data.name);
                setComment(res.data.data.comment);
            } catch (error) {
                console.error('Error fetching order details', error);
            }
        };
        fetchOrderDetails();
    }, [id]);

    const handleUpdate = async (event) => {
        event.preventDefault();
        try {
            const res = await axios.put(`https://localhost:7161/api/Order/${id}`, {
                name: name,
                comment: comment
            });
            console.log("Update successful", res.data.data);
            onClose();
            window.location.reload();
        } catch (error) {
            console.error('Error updating order', error);
        }
    };

    return (
        <section className="pop" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 100 }}>
            <div className="pop-order" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', maxWidth: '40%', maxHeight: '98%', overflowY: 'auto' }}>
                <div className="pop-order-header">
                    <div className="pop-order-header-name">
                        <h2>Edit Order</h2>
                    </div>
                    <div className="pop-order-header-icon">
                        <button onClick={onClose}><img src={Photo} alt="Close" /></button>
                    </div>
                </div>
                <form onSubmit={handleUpdate} className="pop-order-main">
                    <div className="pop-order-main-one">
                        <p>Name</p>
                        <input type="text" value={name} placeholder="Name" onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="pop-order-main-inp">
                        <div className="pop-order-main-inp-one">
                            <p>Status</p>
                            <input type="text" placeholder="Status" defaultValue={details.status} />
                        </div>
                        <div className="pop-order-main-inp-one">
                            <p>Order Date</p>
                            <input type="date" defaultValue={details.orderDate} />
                        </div>
                        <div className="pop-order-main-inp-one">
                            <p>Delivery Date</p>
                            <input type="date" defaultValue={details.deliveryDate} />
                        </div>
                        <div className="pop-order-main-inp-one">
                            <p>Transportation Method</p>
                            <input type="text" placeholder="Transportation Method" defaultValue={details.transportationMethod} />
                        </div>
                    </div>
                    <div className="pop-order-main-one">
                        <p>From</p>
                        <input type="text" placeholder="From" defaultValue={details.from} />
                    </div>
                    <div className="pop-order-main-one">
                        <p>To</p>
                        <input type="text" placeholder="To" defaultValue={details.to} />
                    </div>
                    <div className="pop-order-main-one">
                        <p>Comment</p>
                        <textarea placeholder="Comment" value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
                    </div>
                    <div className="pop-order-main-footer">
                        <div className="pop-order-main-footer-date">
                            <p>Create: Adil 2023.05.11</p>
                        </div>
                        <div className="pop-order-main-footer-btn">
                            <button onClick={handleUpdate} type="submit">Done</button>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default EditOrder;
