import React, { useState } from 'react';
import axios from 'axios';
import Photo from '../Photos/Cancel.svg';

const ChangeRole = ({ onClose, userId }) => {
    const [newRole, setNewRole] = useState('');

    const chgRole = async () => {
        try {
            const res = await axios.post(`https://localhost:7161/api/Admin/change-user-role?userId=${userId}`, {
                newRole: newRole,
            });
            console.log(res);
            onClose();
            window.location.reload();
        } catch (error) {
            console.error('Error changing role:', error);
        }
    };

    return (
        <section className="pop" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 100 }}>
            <div className="pop-order" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', maxWidth: '40%', maxHeight: '98%', overflowY: 'auto' }}>
                <div className="pop-order-header">
                    <div className="pop-order-header-name">
                        <h2>Change Role</h2>
                    </div>
                    <div className="pop-order-header-icon">
                        <button onClick={onClose}><img src={Photo} alt="Close" /></button>
                    </div>
                </div>
                <div className="pop-order-main">
                    <div className="pop-order-main-one">
                        <p>Select Role</p>
                        <select onChange={(e) => setNewRole(e.target.value)} value={newRole}>
                            <option value="">Select a role</option>
                            <option value="Admin">Admin</option>
                            <option value="Manager">Manager</option>
                            <option value="User">User</option>
                        </select>
                    </div>
                    <div className="pop-order-main-footer">
                        <div className="pop-order-main-footer-date">
                            <p>Create: Adil 2023.05.11</p>
                        </div>
                        <div className="pop-order-main-footer-btn">
                            <button onClick={chgRole}>Done</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ChangeRole;
