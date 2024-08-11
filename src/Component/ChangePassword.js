import React, { useState } from 'react';
import axios from 'axios';
import Photo from '../Photos/Cancel.svg';  

const ChangePassword = ({ onClose, userId }) => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const chgPsw = async () => {
        try {
            const res = await axios.post(`https://localhost:7161/api/Admin/change-user-password?userId=${userId}`, {
                currentPassword: currentPassword,
                newPassword: newPassword
            });
            console.log(res);
            onClose();
            window.location.reload();
        } catch (error) {
            console.error('Error changing password:', error);
        }
    };

    return (
        <section className="pop" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 100 }}>
            <div className="pop-order" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', maxWidth: '40%', maxHeight: '98%', overflowY: 'auto' }}>
                <div className="pop-order-header">
                    <div className="pop-order-header-name">
                        <h2>Change Password</h2>
                    </div>
                    <div className="pop-order-header-icon">
                        <button onClick={onClose}><img src={Photo} alt="Close" /></button>
                    </div>
                </div>
                <div className="pop-order-main">
                    <div className="pop-order-main-one">
                        <p>Current Password</p>
                        <input type="text" placeholder="Current Password" onChange={(e) => setCurrentPassword(e.target.value)} />
                    </div>
                    <div className="pop-order-main-one">
                        <p>New Password</p>
                        <input type="text" placeholder="New Password" onChange={(e) => setNewPassword(e.target.value)} />
                    </div>
                    <div className="pop-order-main-footer">
                        <div className="pop-order-main-footer-date">
                            <p>Create: Adil 2023.05.11</p>
                        </div>
                        <div className="pop-order-main-footer-btn">
                            <button onClick={chgPsw}>Done</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ChangePassword;
