import React, { useState } from 'react';
import Photo from '../Photos/Cancel.svg';
import axios from 'axios';

const CreateUser = ({ onClose }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [error, setError] = useState('');

    const createUser = async () => {
        try {
            const response = await axios.post('https://localhost:7161/api/Auth/register', {
                email: email,
                password: password,
                confirmPassword: confirm
            });
            onClose();
            window.location.reload();
        } catch (error) {
            if (error.response && error.response.data) {
                setError(error.response.data.message || 'Error creating user');
            } else {
                setError('Unexpected error occurred');
            }
        }
    };

    return (
        <section className="pop" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 100 }}>
            <div className="pop-order" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', maxWidth: '40%', maxHeight: '98%', overflowY: 'auto' }}>
                <div className="pop-order-header">
                    <div className="pop-order-header-name">
                        <h2>Create User</h2>
                    </div>
                    <div className="pop-order-header-icon">
                        <button onClick={onClose}><img src={Photo} alt="Close" /></button>
                    </div>
                </div>
                <div className="pop-order-main">
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <div className="pop-order-main-one">
                        <p>Email</p>
                        <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="pop-order-main-one">
                        <p>Password</p>
                        <input type="text" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className="pop-order-main-one">
                        <p>Confirm Password</p>
                        <input type="text" placeholder="Confirm Password" value={confirm} onChange={(e) => setConfirm(e.target.value)} />
                    </div>
                    <div className="pop-order-main-footer">
                        <div className="pop-order-main-footer-date">
                            <p>Create: Adil 2023.05.11</p>
                        </div>
                        <div className="pop-order-main-footer-btn">
                            <button onClick={createUser}>Done</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CreateUser;
