import React, { useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import Photo from '../Photos/Cancel.svg';  
const CreateFile = ({ onClose }) => {
    const [file, setFile] = useState(null);
    const { id } = useParams();

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const fetchPost = async () => {
        const formData = new FormData();
        formData.append('file', file);

        try {
            await axios.post(`https://localhost:7161/api/Order/${id}/document/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log("Success");
            onClose(); 
            window.location.reload();
        } catch (error) {
            console.error("Error uploading file", error);
        }
    };


    return (
        <section className="pop" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 100 }}>
            <div className="pop-order" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', maxWidth: '40%', maxHeight: '98%', overflowY: 'auto' }}>
                <div className="pop-order-header">
                    <div className="pop-order-header-name">
                        <h2>Create Item</h2>
                    </div>
                    <div className="pop-order-header-icon">
                        <button onClick={onClose}><img src={Photo} alt="Close" /></button>
                    </div>
                </div>
                <div className="pop-order-main">
                    <div className="pop-order-main-one">
                        <p>File</p>
                        <input type="file" onChange={handleFileChange} />
                    </div>
                    <div className="pop-order-main-footer">
                        <div className="pop-order-main-footer-date">
                            <p>Create: Adil 2023.05.11</p>
                        </div>
                        <div className="pop-order-main-footer-btn">
                            <button onClick={fetchPost}>Done</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default CreateFile;
