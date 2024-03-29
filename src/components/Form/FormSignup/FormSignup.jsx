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
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleCheckboxChange = () => {
        setChecked(!checked); // Toggle the value when the checkbox changes
    };

    function ValidateEmail(mail) {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
            return (true)
        }
        return (false)
    }

    const handleSubmit = async () => {
        try {
            if (checked) {
                if (!ValidateEmail(email)) {
                    setMessage("Vui lòng nhập đúng định dạng email");
                    return;
                }
                const response = await axios.post('http://localhost:3001/auth/signup', {
                    username: user,
                    password: password,
                    email: email,
                    name: user,
                });
                if (response.data.status === 'success') {
                    localStorage.setItem('token', response.data.data.token);
                    localStorage.setItem('username', response.data.data.username);
                    localStorage.setItem('userId', response.data.data.user_id);
                    localStorage.setItem('role', response.data.data.role);
                    localStorage.setItem('active', 'student');
                    navigate('/');
                } else {
                    console.log('====================================');
                    console.log(response);
                    console.log('====================================');
                }
            } else {
                setMessage("Vui lòng Đồng ý với điều khoản sử dụng và chính sách quyền riêng tư");
            }
        } catch (error) {
            console.log(error);
            setPassword("")
            setMessage(error.response.data.message)
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
                            <label htmlFor="user">Email</label>
                            <input
                                onChange={(e) => setEmail(e.target.value)}
                                type="text"
                                id="user"
                                name="user"
                                placeholder="Email"
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
                                value={password}
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
                    {message && <p style={{ color: 'red', textAlign: 'center' }}>{message}</p>}
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
