import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './Sidebar.css';

const MainProfile = () => {
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
                    src="https://cdn.24h.com.vn/upload/2-2023/images/2023-06-06/kim5_1-1686027959-673-width740height480.jpg"
                    alt=""
                />
                <div>
                    <h2>Thu Thao</h2>
                    <h3>Ct010203@actvn.edu.vn</h3>
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
            </div>
        </div>
    );
};

export default MainProfile;
