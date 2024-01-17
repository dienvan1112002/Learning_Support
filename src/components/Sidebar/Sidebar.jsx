import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import getImageFromBaseURL from 'src/helper/get_image';
import './Sidebar.css';

const MainProfile = ({ user }) => {
    const location = useLocation();
    const [isSubMenuVisible, setIsSubMenuVisible] = useState(false);

    const handleSubMenuToggle = () => {
        setIsSubMenuVisible(!isSubMenuVisible);
    };

    return (
        <div style={{ padding: '40px 20px 0 20px' }}>
            <div className='header' style={{ display: 'flex', gap: '20px' }}>
                <img
                    style={{ width: '50px', height: '50px', borderRadius: '50%' }}
                    src={getImageFromBaseURL(user?.image)}
                    alt=""
                />
                <div>
                    <h2>{user?.name}</h2>
                    <h3>{user?.email}</h3>
                </div>
            </div>
            <div className="main-sidebar mt-5">
                <div className={`sidebar-tab ${location.pathname.startsWith('/user/profile')}`} onClick={handleSubMenuToggle}>
                    <i className="ri-user-line icon"></i>
                    <div>Tài khoản của tôi</div>
                </div>
                {isSubMenuVisible && (
                    <ul style={{ paddingLeft: '33px' }}>
                        <li className={`${location.pathname === '/user/profile' ? 'active' : ''}`}>
                            <a href="/user/profile">Hồ sơ</a>
                        </li>
                        <li className={`${location.pathname === '/user/change-password' ? 'active' : ''}`}>
                            <a href="/user/change-password">Đổi mật khẩu</a>
                        </li>
                        <li className={`${location.pathname === '/user/notification-settings' ? 'active' : ''}`}>
                            <a href="/user/notification-settings">Cài đặt thông báo</a>
                        </li>
                    </ul>
                )}
                <div className={`sidebar-tab ${location.pathname === '/user/payment' ? 'active' : ''}`}>
                    <i className="ri-wallet-line icon"></i>
                    <div>
                        <a href="/user/payment">Thông tin tài khoản thanh toán</a>
                    </div>
                </div>
                <a href="/">Quay lại trang chủ</a>
            </div>
        </div>
    );
};

export default MainProfile;
