import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CreateItem from './CreateItem';
import RemoveItem from './RemoveItem';
import { useParams } from 'react-router-dom';
import Delate from '../Photos/Delate.svg'; 

const Item = () => {
    const [isCreatePopupVisible, setCreatePopupVisible] = useState(false);
    const [isRemovePopupVisible, setRemovePopupVisible] = useState(false);
    const [removeId, setRemoveId] = useState(null);
    const [items, setItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const { id } = useParams();
    const pageSize = 5;

    useEffect(() => {
        const fetchItems = async (page) => {
            try {
                const response = await axios.get(`https://localhost:7161/api/Order/${id}/item/page/${page}/${pageSize}`);
                console.log('Response data:', response.data.data); 
                setTotalPages(Math.ceil(response.data.data.totalCount / pageSize));
                setItems(response.data.data.items || []); 
            } catch (error) {
                console.error('Error fetching items', error);
            }
        };

        fetchItems(currentPage);
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
        setRemoveId(null); 
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
                    <p>Item List</p>
                    <a href="#">Label text or value</a>
                </div>
                <div className="main-info-block-header-right">
                    <a href="#" onClick={handleOpenCreatePopup}><i className="fa-solid fa-plus"></i> Add new Item</a>
                </div>
            </div>
            <div className="main-info-block-table">
                <table>
                    <thead>
                        <tr>
                            <th className="bold">Item Name</th>
                            <th>Netto/Gross Wh.</th>
                            <th>Quantity</th>
                            <th className="action-column"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map(item => (
                            <tr key={item.id}>
                                <td className="bold">{item.name}</td>
                                <td>{item.nettoGross}</td>
                                <td>{item.quantity}</td>
                                <td className="action-column">
                                    <button className='pagin-btn' onClick={() => handleOpenRemovePopup(item.itemId)}>
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
            {isCreatePopupVisible && <CreateItem onClose={handleCloseCreatePopup} />}
            {isRemovePopupVisible && removeId !== null && <RemoveItem onClose={handleCloseRemovePopup} itemId={removeId} />}
        </div>
    );
};

export default Item;
