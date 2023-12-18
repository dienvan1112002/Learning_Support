import React from 'react';
import classNames from 'classnames/bind';
import { IoMdSearch } from 'react-icons/io';
import { Link } from 'react-router-dom';

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
        url: 'course',
    },

    {
        display: 'Giảng Viên',
        url: 'teacher',
    },
    {
        display: 'Liên Hệ',
        url: 'contact',
    },
];

const HeaderHv = () => {
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
                        <p>Giảng Viên</p>
                        <div className={cx('gv-icon')}>
                            <Switch />
                        </div>
                    </div>
                    <div className={cx('icon-ring')}>
                        <PiBellRingingDuotone />
                    </div>
                    <div className={cx('icon-user')}>
                        <FaRegUserCircle />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeaderHv;
