import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

import styles from './FormSignup.module.scss';
import classNames from 'classnames/bind';
import google from '../../../assests/logo/google.png';

const cx = classNames.bind(styles);
const FormSignup = () => {
    const [email, setEmail] = useState('');
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [checked, setChecked] = useState(false);
    const navigate = useNavigate();

    const handleCheckboxChange = () => {
        setChecked(!checked); // Toggle the value when the checkbox changes
    };

    const handleSubmit = async () => {
        try {
            if (checked) {
                const response = await axios.post('http://localhost:3001/auth/signup', {
                    username: user,
                    password: password,
                    email: email,
                    name: user,
                });
                if (response.data.status === 'success') {
                    localStorage.setItem('token', response.data.data.token);
                    localStorage.setItem('username', response.data.data.username);
                    localStorage.setItem('role', response.data.data.role);
                    navigate('/');
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className={cx('container')}>
            <div className={cx('container-login')}>
                <div className={cx('login-head')}>
                    <h3>Đăng Ký</h3>
                    <p>Chào mừng bạn đến với Learning Support</p>
                </div>
                <div className={cx('login-content')}>
                    <div className={cx('content')}>
                        <div className={cx('content-name')}>
                            <label htmlFor="user">Số điện thoại/email</label>
                            <input
                                onChange={(e) => setEmail(e.target.value)}
                                type="text"
                                id="user"
                                name="user"
                                placeholder="Tên đăng nhập/email"
                            />
                        </div>
                        <div className={cx('content-name')}>
                            <label htmlFor="username">Tên đăng nhập</label>
                            <input
                                onChange={(e) => setUser(e.target.value)}
                                type="text"
                                id="username"
                                name="username"
                                placeholder="Tên đăng nhập"
                            />
                        </div>
                        <div className={cx('content-name')}>
                            <label htmlFor="password">Mật khẩu</label>
                            <input
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Nhập mật khẩu"
                            />
                        </div>
                        <div className={cx('content-check')}>
                            <input
                                className={cx('check-box')}
                                type="checkbox"
                                checked={checked}
                                onChange={handleCheckboxChange}
                            />
                            <label htmlFor="">Đồng ý với điều khoản sử dụng và chính sách quyền riêng tư</label>
                        </div>
                        <div className={cx('content-btn-login')}>
                            <button onClick={handleSubmit} type="button">
                                Đăng ký
                            </button>
                        </div>
                    </div>
                    <div className={cx('or')}>
                        <p>Hoặc</p>
                    </div>
                    <div type="button" className={cx('google')}>
                        <img src={google} alt="" />
                        <p>Đăng nhập với Google</p>
                    </div>
                    <div className={cx('sign-up')}>
                        <p>Bạn chưa có tài khoản?</p>
                        <Link to="../login" type="button">
                            Đăng nhập
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FormSignup;
