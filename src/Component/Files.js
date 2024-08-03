import React, { useState, useEffect } from 'react';
import Delate from '../Photos/Delate.svg';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import CreateFile from './CreateFile';
import RemoveFile from './RemoveFile';
const Files = () => {
    const [isCreatePopupVisible, setCreatePopupVisible] = useState(false);
    const [isRemovePopupVisible, setRemovePopupVisible] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [removeId, setRemoveId] = useState(null);
    const [items, setItems] = useState([]);
    const pageSize = 5;
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async (id, page) => {
            try {
                const res = await axios.get(`https://localhost:7161/api/Order/${id}/document/page/${page}/${pageSize}`);
                setTotalPages(Math.ceil(res.data.data.totalCount / pageSize));
                setItems(res.data.data.items || []);
                console.log('File' , res)
            } catch (error) {
                console.error('Error fetching data', error);
            }
        };

        fetchData(id, currentPage);
    }, [id, currentPage]);

    const createPopupVisible = () => {
        setCreatePopupVisible(true);
    };

    const closeCreatePopupVisible = () => {
        setCreatePopupVisible(false);
    };

    const removePopupVisible = (id) => {
        setRemoveId(id);
        setRemovePopupVisible(true);
    };

    const closeRemovePopupVisible = () => {
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
    const fetchDown = async (fileId) => {
        console.log('Fetching download for File ID:', fileId); 
        try {
            const response = await axios.get(`https://localhost:7161/api/Order/${id}/document/download/${fileId}`, {
                responseType: 'blob' 
            });
            const url = window.URL.createObjectURL(new Blob([response.data], { type: response.headers['content-type'] }));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `file_${fileId}.jpeg`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error downloading file', error);
        }
    };
    return (
        <div className="main-info-block">
            <div className="main-info-block-header">
                <div className="main-info-block-header-left">
                    <p>Edit Files</p>
                </div>
                <div className="main-info-block-header-right">
                    <a href="#" onClick={createPopupVisible}><i className="fa-solid fa-plus"></i> Add</a>
                </div>
            </div>
            <div className="main-info-block-table">
                <table>
                    <tbody>
                        {items.map((item) => (
                            <tr key={item.id}>
                                <td className="bold">{item.documentName}</td>
                                <td className="action-column">
                                    <a href="#" className='pagin-btn'  onClick={() => removePopupVisible(item.id)}>
                                        <img src={Delate} alt="Remove" />
                                    </a>
                                </td>
                                <td className="action-column">
                                    <a href="#" className='pagin-btn'  onClick={() => fetchDown(item.id)}>
                                        <img src={Delate} alt="Remove" />
                                    </a>
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
            {isCreatePopupVisible && <CreateFile onClose={closeCreatePopupVisible} />}
            {isRemovePopupVisible && removeId !== null && <RemoveFile onClose={closeRemovePopupVisible} documentId={removeId} />}
        </div>
    );
};

export default Files;
