import React, { useState } from 'react';
import classNames from 'classnames/bind';
import { IoMdSearch } from 'react-icons/io';
import { Link, useNavigate } from 'react-router-dom';

import styles from './HeaderHV.module.scss';
import logo from '../../../assests/logo/shapelogo.png';

import { LiaToggleOffSolid } from 'react-icons/lia';
import { PiBellRingingDuotone } from 'react-icons/pi';
import { FaRegUserCircle } from 'react-icons/fa';
import Switch from 'src/components/Btn/Switch';

const cx = classNames.bind(styles);
const navLinks = [
    {
        display: 'Trang chủ',
        url: '/',
    },
    {
        display: 'Khóa học',
        url: '/course',
    },
    {
        display: 'Giảng Viên',
        url: '/teacher',
    },
    {
        display: 'Liên Hệ',
        url: '/contact',
    },
];

const HeaderHv = () => {
    const navigate = useNavigate();
    const [showDropdown, setShowDropdown] = useState(false);

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    const closeDropdown = () => {
        setShowDropdown(false);
    };

    const handleLogout = async () => {
        try {
            // Make the API call to logout
            await fetch('http://localhost:3001/auth/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            localStorage.clear()
            navigate('/login');
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    return (
        <div className={cx('header')}>
            <div className={cx('navbar')}>
                <div className={cx('header-left')}>
                    <div className={cx('header-container')}>
                        {/* Logo */}
                        <div className={cx('logo')}>
                            <img src={logo} alt="logo" />
                        </div>
                        {/* Menu */}
                        <div className={cx('nav-menu flex-row')}>
                            <ul className={cx('nav-list')}>
                                {navLinks.map((item, index) => (
                                    <li key={index} className={cx('nav-item')}>
                                        <Link to={item.url} className={cx('nav-a text-black font-semibold font-bold')}>
                                            {item.display}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    {/* Tìm kiếm */}
                    <div className={cx('header-search')}>
                        <IoMdSearch
                            style={{
                                width: '1.75rem',
                                height: '1.75rem',
                                color: 'rgba(109, 166, 198, 1)',
                            }}
                        />
                        <input type="text" className={cx('header-search-input')} placeholder="Tìm Kiếm..." />
                    </div>
                </div>
                {/* đăng kí, đăng nhập */}
                <div className={cx('header-right')}>
                    <div className={cx('header-right-gv')}>
                        <a href='/instructor'>Giảng Viên</a>
                    </div>
                    <div className={cx('icon-ring')}>
                        <PiBellRingingDuotone />
                    </div>
                    <div className={cx('icon-user', { 'break-layout': showDropdown })} onClick={toggleDropdown}>
                        <FaRegUserCircle />
                        {showDropdown && (
                            <div className={cx('dropdown')}>
                                <ul>
                                    <li>
                                        <Link to="/user/profile" onClick={closeDropdown}>
                                            Ho so cua toi
                                        </Link>
                                    </li>
                                    <li>
                                        <span onClick={handleLogout}>Logout</span>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeaderHv;
