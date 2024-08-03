import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Delate from '../Photos/Delate.svg';
import CreateRfq from './CreateRfq';
import RemoveRfq from './RemoveRfq';

const Rfq = () => {
    const [isCreatePopupVisible, setCreatePopupVisible] = useState(false);
    const [isRemovePopupVisible, setRemovePopupVisible] = useState(false);
    const [items, setItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [removeId, setRemoveId] = useState(null);
    const [createId, setCreateId] = useState(null);
    const [download, setDownload] = useState();
    const pageSize = 5;

    useEffect(() => {
        const fetchData = async (page) => { 
            try {
                const res = await axios.get(`https://localhost:7161/api/Order/rfq/page/${page}/${pageSize}`);
                console.log("RFQ" , res.data.data.items) 
                setItems(res.data.data.items);
                setTotalPages(res.data.data.totalPages);
            } catch (error) {
                console.error('Error fetching items', error);
            }
        };
        fetchData(currentPage);
    }, [currentPage]);

    const fetchDown = async (rfqId) => {
        console.log('Fetching download for RFQ ID:', rfqId); 
        try {
            const response = await axios.get(`https://localhost:7161/api/Order/rfq/download/${rfqId}`, {
                responseType: 'blob' 
            });
    
            const url = window.URL.createObjectURL(new Blob([response.data]));
            
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `rfq_${rfqId}.pdf`); 
    
            document.body.appendChild(link);
            link.click();
    
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error downloading RFQ', error);
        }
    };

    const handleOpenCreatePopup = (id) => {
        setCreateId(id);
        setCreatePopupVisible(true);
    }  
    const handleCloseCreatePopup = () => setCreatePopupVisible(false);
    const handleOpenRemovePopup = (id) => {
        setRemoveId(id);
        setRemovePopupVisible(true);
    };
    const handleCloseRemovePopup = () => setRemovePopupVisible(false);
    const handlePrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 0));
    const handleNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1));

    return (
        <div className="main-info-block">
            <div className="main-info-block-header">
                <div className="main-info-block-header-left">
                    <p>Shipping Rate</p>
                </div>
                <div className="main-info-block-header-right">
                    <a href="#" onClick={handleOpenCreatePopup}><i className="fa-solid fa-plus"></i> Add</a>
                </div>
            </div>
            <div className="main-info-block-table">
                <table>
                    <tbody>
                        {items.map((item) => (
                            <tr key={item.id}>
                                <td className="bold">{item.publicName}</td>
                                <td className="action-column">
                                    <button className='pagin-btn' onClick={() => handleOpenRemovePopup(item.id)}>
                                        <img src={Delate} alt="Remove" />
                                    </button>
                                </td>
                                <td className="action-column">
                                    <button className='pagin-btn' onClick={() => fetchDown(item.id)}>
                                        <img  src={Delate} alt="Download" />
                                     </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="main-info-block-footer">
                <button className='pagin-btn' onClick={handlePrevPage} disabled={currentPage === 0}>{"<"}</button>
                <p>{`${currentPage + 1}/${totalPages}`}</p>
                <button className='pagin-btn' onClick={handleNextPage} disabled={currentPage === totalPages - 1}>{">"}</button>
            </div>
            {isCreatePopupVisible && <CreateRfq onClose={handleCloseCreatePopup} id={createId} />}
            {isRemovePopupVisible && <RemoveRfq onClose={handleCloseRemovePopup} id={removeId} />}
        </div>
    );
};

export default Rfq;
