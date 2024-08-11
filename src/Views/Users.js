import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RemoveUser from '../Component/RemoveUser';
import CreateUser from '../Component/CreateUser';
import Photo from '../Photos/filter-add.svg';
import ChangePassword from '../Component/ChangePassword';
import ChangeEmail from '../Component/ChangeEmail';
import ChangeRole from '../Component/ChangeRole';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const pageSize = 10;
    const [remPopUp, setRemPopUp] = useState(false);
    const [removeId, setRemoveId] = useState(null);
    const [crtPopUp, setCrtPopUp] = useState(false);
    const [chgPswPopUp, setChgPswPopUp] = useState(false);
    const [ChqPswId, setChqPswId] = useState(null);
    const [chgEmPopUp, setEmPopUp] = useState(false);
    const [ChqEmId, setEmId] = useState(null);
    const [chgRolePopUp, setChgRolePopUp] =useState(false);
    const [chgRoleId, setChgRoleId] = useState(null);

    useEffect(() => {
        const fetchUser = async (page) => {
            try {
                const res = await axios.get(`https://localhost:7161/api/Admin/users-by-page?pageNumber=${page}&pageSize=${pageSize}`);
                setTotalPages(Math.ceil(res.data.totalCount / pageSize));
                setUsers(res.data.items);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };
        fetchUser(currentPage);
    }, [currentPage]);

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const remUserPopUp = (id) => {
        setRemoveId(id);
        setRemPopUp(true);
    };

    const remUserPopUpClose = () => {
        setRemPopUp(false);
    };

    const createUserPopUp = () => {
        setCrtPopUp(true);
    };

    const createUserPopUpClose = () => {
        setCrtPopUp(false);
    };

    const changePswPopUp = (id) => {
        setChqPswId(id);
        setChgPswPopUp(true);
    };

    const changePswPopUpClose = () => {
        setChgPswPopUp(false);
    };

    const changeEmPopUp = (id) => {
        setEmId(id);
        setEmPopUp(true);
    };

    const changeEmPopUpClose = () => {
        setEmPopUp(false);
    };

    const changeRolePopUp = async(id) => {
        setChgRoleId(id)
        setChgRolePopUp(true)
    }
    const changeRolePopUpClose = async() => {
        setChgRolePopUp(false)
    }

    return (
        <main>
            <div className="main">
                <div>
                    <button onClick={createUserPopUp}>Create USER</button>
                </div>
                <div className="main-filter">
                    <div className="main-filter-total">
                        <p><strong>Total : {users.length} Users</strong></p>
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
                            <img src={Photo} alt="" />
                        </div>
                    </div>
                </div>
                <div className="main-table">
                    <table>
                        <thead>
                            <tr>
                                <th className="main-table-name">Email</th>
                                <th>Change Password</th>
                                <th>Change Email</th>
                                <th>Change Role</th>
                                <th>Remove</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user.id}>
                                    <td>{user.email}</td>
                                    <td><button onClick={() => changePswPopUp(user.id)}>Change Password</button></td>
                                    <td><button onClick={() => changeEmPopUp(user.id)}> Change Email</button></td>
                                    <td><button onClick ={() =>changeRolePopUp(user.id)}>Change Role</button></td>
                                    <td><button onClick={() => remUserPopUp(user.id)}>Remove</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="main-info-block-footer">
                    <button onClick={handlePrevPage} className='pagin-btn' disabled={currentPage === 1}>{"<"}</button>
                    <p>{`${currentPage}/${totalPages}`}</p>
                    <button onClick={handleNextPage} className='pagin-btn' disabled={currentPage === totalPages}>{" >"}</button>
                </div>
            </div>
            {remPopUp && <RemoveUser onClose={remUserPopUpClose} userId={removeId} />}
            {crtPopUp && <CreateUser onClose={createUserPopUpClose} />}
            {chgPswPopUp && <ChangePassword onClose={changePswPopUpClose} userId={ChqPswId} />}
            {chgEmPopUp && <ChangeEmail onClose={changeEmPopUpClose} userId={ChqEmId} />}
            {chgRolePopUp && <ChangeRole onClose={changeRolePopUpClose} userId={chgRoleId}/>}
        </main>
    );
};

export default Users;
