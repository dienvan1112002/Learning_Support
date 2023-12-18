import React, { useEffect } from 'react';
import './Footer.css';
import logo from '../../assests/logo/shapelogo.png';
import { MdEmail } from 'react-icons/md';
import { FaPhoneAlt } from 'react-icons/fa';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { FaFacebook } from 'react-icons/fa';
import { FaTwitter } from 'react-icons/fa6';
import { FaLinkedin } from 'react-icons/fa';

const Footer = () => {
    return (
        <div className="footer">
            <div className="footer-container">
                <div className="footer-container-left">
                    <div className="footer-left-top">
                        <div className="footer-logo">
                            <img src={logo} alt="logo" />
                        </div>
                        <div className="footer-logo-name">
                            <p>Web hỗ trợ học tập</p>
                        </div>
                    </div>
                    <div className="footer-left-bottom">
                        <div className="footer-left-bottom-email">
                            <MdEmail
                                style={{
                                    width: '24px',
                                    height: '24px',
                                }}
                            />
                            <p>CT050148@actvn.edu.vn</p>
                        </div>
                        <div className="footer-left-bottom-phone">
                            <FaPhoneAlt
                                style={{
                                    width: '24px',
                                    height: '24px',
                                }}
                            />
                            <p>+91 91813 23 2309</p>
                        </div>
                        <div className="footer-left-bottom-map">
                            <FaMapMarkerAlt
                                style={{
                                    width: '24px',
                                    height: '24px',
                                }}
                            />
                            <p>141 Chiến Thắng- Tân triều- Thanh Trì- Hà Nội</p>
                        </div>
                    </div>
                </div>
                <div className="footer-container-right">
                    <div className="footer-ls">
                        <h4>Về LS</h4>
                        <div className="footer-ls-items">
                            <p>Lợi ích</p>
                            <p>Liên hệ</p>
                            <p>Điều khoản</p>
                            <p>Bảo mật</p>
                        </div>
                    </div>
                    <div className="footer-sp">
                        <h4>Sản phẩm</h4>
                        <div className="footer-sp-items">
                            <p>Khóa học</p>
                            <p>Gia sư</p>
                            <p>Hỗ trợ trực tiếp</p>
                        </div>
                    </div>
                    <div className="footer-mxh">
                        <h4>Hồ sơ mạng xã hội</h4>
                        <div className="footer-mxh-items">
                            <FaFacebook />
                            <FaTwitter />
                            <FaLinkedin />
                        </div>
                    </div>
                </div>
            </div>
            <hr className="footer-line" />
        </div>
    );
};
export default Footer;
