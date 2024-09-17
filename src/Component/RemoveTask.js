import React from 'react';
import axios from 'axios';
import Photo from '../Photos/Cancel.svg'; 
import { useParams } from 'react-router-dom';
const RemoveTheme = () => {
    const { taskId } = useParams();
    const remUser = async () => {
        try {
            await axios.delete(`https://localhost:7161/api/Admin/delete-user/1`);
            console.log('Task removed');
            onClose(); 
            window.location.reload()
        } catch (error) {
            console.error('Error removing user', error);
        }
    };

    return (
        <section className="pop" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 100 }}>
            <div className="pop-order" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', maxWidth: '40%', maxHeight: '98%', overflowY: 'auto' }}>
                <div className="pop-order-header">
                    <div className="pop-order-header-name">
                        <h2>Remove Task</h2>
                    </div>
                    <div className="pop-order-header-icon">
                        <button onClick={onClose}><img src={Photo} alt="Close" /></button>
                    </div>
                </div>
                <div className="pop-order-main">
                    <p>Do you want to remove this Task?</p>
                    <div className="pop-order-main-footer">
                        <div className="pop-order-main-footer-date">
                            <p>Create: Adil 2023.05.11</p>
                        </div>
                        <div className="pop-order-main-footer-btn">
                            <button onClick={remUser}>Remove</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
export default RemoveTheme;
