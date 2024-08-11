import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import RemoveRate from '../Component/RemoveRate';
import CreateRate from '../Component/CreateRate';
import EditRate from '../Component/EditRate';
import Photo from '../Photos/filter-add.svg';

const ShippingRate = () => {
    const { id } = useParams();
    const pageSize = 15;
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [data, setData] = useState([]); 
    const [remPopUp, setRemPopUp] = useState(false);
    const [removeId, setRemoveId] = useState(null);
    const [editId, setEditId] = useState(null);
    const [crtPopUp, setCrtPopUp] = useState(false);
    const [edtPopUp, setEdtPopUp] = useState(false);
    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await axios.get(`https://localhost:7161/api/ShippingRate/byOrder/${id}/page/${currentPage}?pageSize=${pageSize}`);
                setTotalPages(Math.ceil(res.data.totalCount / pageSize));
                console.log(res.data.data.items)
                setData(res.data.data.items || []); 
            } catch (error) {
                console.error('Error fetching shipping rates:', error);
                setData([]);
            }
        };
        fetch();
    }, [currentPage, id]);

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

    const remRataPopUp = (id) => {
        setRemoveId(id);
        setRemPopUp(true);
    };

    const remRataPopUpClose = () => {
        setRemPopUp(false);
    };

    const edtRataPopUp = (id) => {
        setEditId(id);
        setEdtPopUp(true);
    };

    const edtRataPopUpClose = () => {
        setEdtPopUp(false);
    };

    const createRataPopUp = () => {
        setCrtPopUp(true);
    };

    const createRataPopUpClose = () => {
        setCrtPopUp(false);
    };

    return (
        <main>
            <div className="main">
                <div>
                    <button onClick={createRataPopUp}>Create Rate</button>
                </div>
                <div className="main-filter">
                    <div className="main-filter-total">
                        <p><strong>Total: {data.length} Rates</strong></p>
                    </div>
                    <div className="main-filter-sort">
                        <div className="main-filter-sort-left">
                            <select name="" id="">
                                <option value="">ff</option>
                                <option value="">fffff</option>
                            </select>
                        </div>
                        <div className="main-filter-sort-right">
                            <p>Filter</p>
                            <img src={Photo} alt="Filter" />
                        </div>
                    </div>
                </div>
                <div className="main-table">
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th className="main-table-name">freightForwarderName</th>
                                <th>Price</th>
                                <th>Edit</th>
                                <th>Remove</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.length > 0 ? (
                                data.map(user => (
                                    <tr key={user.id}>
                                        <td>{user.id}</td>
                                        <td>{user.freightForwarderName}</td>
                                        <td>{user.price}</td>
                                        <td><button onClick={() => edtRataPopUp(user.id)}>Edit</button></td>
                                        <td><button onClick={() => remRataPopUp(user.id)}>Remove</button></td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6">No data available</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="main-info-block-footer">
                    <button onClick={handlePrevPage} className='pagin-btn' disabled={currentPage === 0}>{"<"}</button>
                    <p>{`${currentPage + 1}/${totalPages}`}</p>
                    <button onClick={handleNextPage} className='pagin-btn' disabled={currentPage === totalPages - 1}>{">"}</button>
                </div>
            </div>
            {remPopUp && <RemoveRate onClose={remRataPopUpClose} rateId={removeId} />}
            {crtPopUp && <CreateRate onClose={createRataPopUpClose} />}
            {edtPopUp && <EditRate onClose={edtRataPopUpClose} id={editId}/>}
        </main>
    );
};

export default ShippingRate;
