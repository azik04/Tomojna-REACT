import React, { useState } from 'react';
import Icon from '../Photos/Icon.svg';
import Add from '../Photos/ADD.svg';
import Settings from '../Photos/Settings.svg';
import Logo from '../Photos/Logo.svg';
import User from '../Photos/User.svg';
const Header = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const toggleActive = (index) => {
        setActiveIndex(index);
    };

    const options = [
        { src: Icon, altText: 'Icon', fetch:'/Orders'  },
        { src: Add, altText: 'Add' , fetch:'/FreightForwarder'  },
        { src: Settings, altText: 'Settings', fetch:'/Stock' },
        { src: User, altText: 'User' , fetch:'/Users' }
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
                    <a
                        key={index}
                        href={option.fetch}
                        className={`header-options-select ${index === activeIndex ? 'active' : ''}`}
                        onClick={() => toggleActive(index)}
                    >
                        <img src={option.src} className="delete-icon" alt={option.altText} />
                    </a>
                ))}
            </div>
        </header>
    );
};

export default Header;
