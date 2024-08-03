import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import CreateStock from '../Component/CreateStock';
import RemoveStock from '../Component/RemoveStock';
import EditStock from '../Component/EditStock';
const Stock = () => {
    const[data, setData] = useState([])
    const[currentPage, setCurrentPage] = useState(0);
    const[totalPages, setTotalPages] = useState(0);
    const [createPopUp, setCreatePopUp] = useState(false);
    const [editPopUp, setEditPopUp] = useState(false);
    const [removePopUp, setRemovePopUp] = useState(false);
    const [removeId, setRemoveId] = useState(null);
    const [edirId, setEditId] = useState(null);
    const pageSize = 10;
    useEffect(()=>{
        const fetchData = async() =>{
            const res = await axios.get(`https://localhost:7161/api/Stock/page/${currentPage}/${pageSize}`)
            setData(res.data.data.items)
            console.log(res.data.data)
        }
        fetchData()
    },[currentPage])
    
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
    const remFreightPopUpClose = () => {
        setRemovePopUp(false);
    };

    const remFreightPopUp = (id) => {
        setRemoveId(id);
        setRemovePopUp(true);
    };
    const edtFreightPopUpClose = () => {
        setEditPopUp(false);
    };

    const edtFreightPopUp = (id) => {
        setEditId(id);
        setEditPopUp(true);
    };

    const crtFreightPopUpClose = () => {
        setCreatePopUp(false);
    };

    const crtFreightPopUp = () => {
        setCreatePopUp(true);
    };

    return (
        <main>
        <div className="main">
            <div>
                <button onClick={crtFreightPopUp}>Create Freight</button>
            </div>
            <div className="main-filter">
                <div className="main-filter-total">
                    <p><strong>Total: {data.length} Freight Forwarders</strong></p>
                </div>
                <div className="main-filter-sort">
                    <div className="main-filter-sort-left">
                        <select>
                            <option value="">ff</option>
                            <option value="">fffff</option>
                        </select>
                    </div>
                    <div className="main-filter-sort-right">
                        <p>Filter</p>
                        <img src="/img/filter-add.svg" alt="" />
                    </div>
                </div>
            </div>
            <div className="main-table">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th className="main-table-name">Name</th>
                            <th>Edit</th>
                            <th>Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(user => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td><button onClick={() => edtFreightPopUp(user.id)}>Edit</button></td>
                                <td><button onClick={() => remFreightPopUp(user.id)}>Remove</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="main-info-block-footer">
                <button onClick={handlePrevPage} className='pagin-btn' disabled={currentPage === 0}>{"<"}</button>
                <p>{`${currentPage + 1}/${totalPages}`}</p>
                <button onClick={handleNextPage} className='pagin-btn' disabled={currentPage >= totalPages - 1}>{">"}</button>
            </div>
        </div>
        {removePopUp && <RemoveStock onClose={remFreightPopUpClose} stockId={removeId} />}
        {createPopUp && <CreateStock onClose={crtFreightPopUpClose} />}
        {editPopUp && <EditStock onClose={edtFreightPopUpClose} id={edirId} />}
    </main>
    );
}

export default Stock;
