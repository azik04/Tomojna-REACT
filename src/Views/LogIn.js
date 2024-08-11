import React, { useState } from 'react';
import axios from 'axios';
import Photo from '../Photos/Left.svg'
import Shape from '../Photos/Shape.svg'
import Shape2 from '../Photos/Shape2.svg'
import { useNavigate } from 'react-router-dom';
const LogIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()
    const fetchPost = async () => {
        try {
            const res = await axios.post(`https://localhost:7161/api/Auth/login`, {
                email: email,
                password: password
            });
            console.log(res);
            if (res.status === 200) {
                const token = res.data.token;
                const expiryTime = Date.now() + 3 * 60 * 60 * 1000;
                localStorage.setItem("JWT", JSON.stringify({ token, expiryTime }));
                navigate('/Orders');
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <section className="login">
            <div className="login-left">
                <img src={Photo} alt="Left Background" />
            </div>
            <div className="login-right">
                <div className="login-right-main">
                    <h2>Sign Up</h2>
                    <p>Please fill your information below</p>
                    <div className="login-right-main-inp">
                        <input 
                            type="text" 
                            placeholder="E-mail" 
                            onChange={(e) => setEmail(e.target.value)} 
                        />
                        <img src={Shape} alt="Email Icon" />
                    </div>
                    <div className="login-right-main-inp">
                        <input 
                            type="password" 
                            placeholder="Password" 
                            onChange={(e) => setPassword(e.target.value)} 
                        />
                        <img src={Shape2} alt="Password Icon" />
                    </div>
                    <button onClick={fetchPost}>Next</button>
                </div>
            </div>
        </section>
    );
};

export default LogIn;
