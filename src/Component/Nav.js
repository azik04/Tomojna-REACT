import React, { useState } from 'react';
import Photo from '../Photos/Vector.svg';
import NewOrderPopup from '../Component/CreateOrder';

const Nav = () => {
    const [isCreatePopupVisible, setCreatePopupVisible] = useState(false);

    const handleOpenCreatePopup = () => {
        setCreatePopupVisible(true);
    };

    const handleCloseCreatePopup = () => {
        setCreatePopupVisible(false);
    };


    return (
        <nav className="navbar">
            <div className="navbar-content">
                <div className="navbar-content-menu-name">
                    <p>DashX</p>
                </div>
                <div className="navbar-content-menu-options">
                    <div className="navbar-content-menu-options-search">
                        <img src={Photo} alt="Search" />
                    </div>
                    <div className="navbar-content-menu-options-new">
                        <button onClick={handleOpenCreatePopup}>
                            <p>Add New Order</p>
                            <i className="fa-solid fa-plus"></i>
                        </button>
                    </div>
                    <div className="navbar-content-menu-options-user">
                        
                    </div>
                </div>
            </div>
            {isCreatePopupVisible && <NewOrderPopup onClose={handleCloseCreatePopup} />}
        </nav>
    );
}

export default Nav;