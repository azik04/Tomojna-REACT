import React from 'react';
import { useState , useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Photo from '../Photos/Cancel.svg';
import axios from 'axios';
const EditTransport = (onClose) => {
    const [value , setValue] = useState()
    const[name , setName] = useState();
    const[comment , setComment] = useState();
    const { id, itemTransportId } = useParams();

    useEffect(() =>{
        const fetchData = async() => {
            const res =  await axios.get(`https://localhost:7161/api/Order/${id}/itemtransport/${itemTransportId}`)
            console.log(res.data.data);
            setName(res.data.data.name);
            setComment(res.data.data.comment);
        }
        fetchData();
    }, [id])

    const updTransport = async(event) => {
        await axios.put(`https://localhost:7161/api/Order/${id}/itemtransport/${itemTransportId}`, {
            name : name,
            comment : comment
        })
         onClose();
         window.location.reload();
    }
    return (
        <section className="pop" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 100 }}>
        <div className="pop-order" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', maxWidth: '40%', maxHeight: '98%', overflowY: 'auto' }}>
            <div className="pop-order-header">
                <div className="pop-order-header-name">
                    <h2>Edit Transport</h2>
                </div>
                <div className="pop-order-header-icon">
                    <button onClick={onClose}><img src={Photo} alt="Close" /></button>
                </div>
            </div>
            <form className="pop-order-main">
                <div className="pop-order-main-one">
                    <p>Name</p>
                    <input type="text" value={name} placeholder="Name" onChange={(e) => setName(e.target.value)} />
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
                        <button onClick={updTransport} type="submit">Done</button>
                    </div>
                </div>
            </form>
        </div>
    </section>
    );
}

export default EditTransport;
