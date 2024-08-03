import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Delate from '../Photos/Delate.svg';
import CreateShipping from '../Component/CreateShipping';
import RemoveShipping from '../Component/RemoveShippping';

const Shipping = () => {
    const [isCreatePopupVisible, setCreatePopupVisible] = useState(false);
    const [isRemovePopupVisible, setRemovePopupVisible] = useState(false);
    const [items, setItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [removeId, setRemoveId] = useState(null);
    const { id } = useParams(); 
    const pageSize = 5;

    useEffect(() => {
        const fetchData = async (id, page) => { 
            try {
                const res = await axios.get(`https://localhost:7161/api/ShippingRate/byOrder/${id}/page/${page}?pageSize=${pageSize}`);
                console.log("Shipping", res); 
                console.log("Shipping", res.data.data.items); 
                setItems(res.data.data.items);
                setTotalPages(res.data.data.totalPages);
            } catch (error) {
                console.log('Error fetching items', error); 
            }
        };
        fetchData(id, currentPage);
    }, [id, currentPage]);

    const handleOpenCreatePopup = () => {
        setCreatePopupVisible(true);
    };

    const handleCloseCreatePopup = () => {
        setCreatePopupVisible(false);
    };

    const handleOpenRemovePopup = (id) => {
        setRemoveId(id);
        setRemovePopupVisible(true);
    };

    const handleCloseRemovePopup = () => {
        setRemovePopupVisible(false);
    };

    const handlePrevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages - 1) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <div className="main-info-block">
            <div className="main-info-block-header">
                <div className="main-info-block-header-left">
                    <p>Shipping Rate</p>
                </div>
                <div className="main-info-block-header-right">
                    <a href="#" onClick={handleOpenCreatePopup}><i className="fa-solid fa-plus"></i> Add new List</a>
                </div>
            </div>
            <div className="main-info-block-table">
                <table>
                    <thead>
                        <tr>
                            <th className="bold">Item Name</th>
                            <th>Price</th>
                            <th className="action-column"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item) => (
                            <tr key={item.id}>
                                <td className="bold">{item.freightForwarderName}</td>
                                <td>{item.price}</td>
                                <td className="action-column">
                                    <button className='pagin-btn' onClick={() => handleOpenRemovePopup(item.id)}>
                                        <img src={Delate} alt="Remove" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="main-info-block-footer">
                <button onClick={handlePrevPage} className='pagin-btn' disabled={currentPage === 0}>{"<"}</button>
                <p>{`${currentPage + 1}/${totalPages}`}</p>
                <button onClick={handleNextPage} className='pagin-btn' disabled={currentPage === totalPages - 1}>{">"}</button>
            </div>
            {isCreatePopupVisible && <CreateShipping onClose={handleCloseCreatePopup} />}
            {isRemovePopupVisible && <RemoveShipping onClose={handleCloseRemovePopup} id={removeId} />}
        </div>
    );
}

export default Shipping;
