import React, { useState } from 'react';
import classNames from 'classnames/bind';
import { Link, NavLink, useNavigate } from 'react-router-dom';

import styles from './HeaderGV.module.scss';
import logo from '../../../assests/logo/shapelogo.png';

import { PiBellRingingDuotone } from 'react-icons/pi';
import { FaRegUserCircle } from 'react-icons/fa';

import './headergv.css'

const cx = classNames.bind(styles);
const navLinks = [
  {
    display: 'Thông tin',
    url: '/instructor/profile',
  },
  {
    display: 'Khóa học',
    url: '/instructor/course',
  },
  {
    display: 'Học viên',
    url: '/instructor/student',
  },
];

const HeaderGv = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem('role');
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

  const redirectRegisterInstructor = () => {
    if (role == 'student') {
      navigate('/register-instructor');
    } else {
      localStorage.setItem('active', 'student');
      navigate('/');
    }
  }

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
                <li key={0} className={cx('nav-item')}>
                  <NavLink style={{ color: 'black' }} to={'/instructor'} className={cx('nav-a font-semibold font-bold')} end >
                    Trang chủ
                  </NavLink>
                </li>
                {navLinks.map((item, index) => (
                  <li key={index} className={cx('nav-item')}>
                    <NavLink style={{ color: 'black' }} to={item.url} className={cx('nav-a font-semibold font-bold')} >
                      {item.display}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        {/* đăng kí, đăng nhập */}
        <div className={cx('header-right')}>
          <div className={cx('header-right-gv')}>
            <div onClick={() => redirectRegisterInstructor()}>Học Viên</div>
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
                    <Link to="/instructor/profile" onClick={closeDropdown}>
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
  )
}

export default HeaderGv
