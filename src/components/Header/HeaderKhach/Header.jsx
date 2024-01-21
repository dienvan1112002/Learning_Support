import React, { useState } from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import styles from './header.module.scss';
import logo from '../../../assests/logo/shapelogo.png';

const cx = classNames.bind(styles);

const HeaderKhach = ({ toggleSearch }) => {
    const role = localStorage.getItem('role')
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
    return (
        <div className={cx('header')}>
            <div className={cx('navbar')}>
                <div className={cx('header-left')}>
                    <div className={cx('header-container')}>
                        {/* Logo */}
                        <div className={cx('logo')}>
                            <Link to="/">
                                <img src={logo} alt="logo" />
                            </Link>
                        </div>
                        {/* Menu */}
                        <div className={cx('nav-menu flex-row')}>
                            <ul className={cx('nav-list')}>
                                {navLinks.map((item, index) => (
                                    <Link to={`../${item.url}`} key={index} className={cx('nav-a')}>
                                        <li className={cx('nav-item')}>{item.display}</li>
                                    </Link>
                                ))}
                            </ul>
                        </div>
                    </div>
                    {/* Tìm kiếm */}
                    {role != 'instructor' && (
                        <i onClick={toggleSearch} className="ri-search-line" style={{ cursor: 'pointer' }}></i>
                    )}
                </div>
                {/* đăng kí, đăng nhập */}
                <div className={cx('header-right')}>
                    <div className={cx('register')}>
                        <Link to="../signup" type="button" className={cx('header-btn-login')}>
                            Đăng kí
                        </Link>
                    </div>
                    <div className={cx('login')}>
                        <Link to="../login" type="button" className={cx('header-btn-login')}>
                            Đăng Nhập
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeaderKhach;
