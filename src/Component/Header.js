import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Icon from '../Photos/Icon.svg';
import Add from '../Photos/ADD.svg';
import Settings from '../Photos/Settings.svg';
import Logo from '../Photos/Logo.svg';
import User from '../Photos/User.svg';

const Header = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const handleClick = (index) => {
        setActiveIndex(index);
    };

    const options = [
        { src: Icon, altText: 'Icon', to: '/Theme' },
        { src: Add, altText: 'Add', to: '/FreightForwarder' },
        { src: Settings, altText: 'Settings', to: '/Stock' },
        { src: User, altText: 'User', to: '/Users' }
    ];

    return (
        <header className="header">
            <div className="header-logo">
                <div className="header-logo-icon">
                    <img src={Logo} alt="Logo" />
                </div>
            </div>
            <div className="header-options">
                {options.map((option, index) => (
                    <NavLink
                        key={index}
                        to={option.to}
                        className={({ isActive }) => `header-options-select ${isActive ? 'active' : ''}`}
                        onClick={() => handleClick(index)}
                    >
                        <img src={option.src} className="delete-icon" alt={option.altText} />
                    </NavLink>
                ))}
            </div>
        </header>
    );
};

export default Header;
