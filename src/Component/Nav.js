import React, { useState } from 'react';
import CreateTheme from './CreateTheme';
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
                    <div className="navbar-content-menu-options-new">
                        <button onClick={handleOpenCreatePopup}>
                            <p>Add New Theme</p>
                            <i className="fa-solid fa-plus"></i>
                        </button>
                    </div>
                </div>
            </div>
            {isCreatePopupVisible && <CreateTheme onClose={handleCloseCreatePopup} />}
        </nav>
    );
}

export default Nav;