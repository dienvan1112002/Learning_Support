import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import axios from 'axios';
import google from '../../../assests/logo/google.png';

import styles from './FormLogin.module.scss';

const cx = classNames.bind(styles);

const FormLogin = (props) => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        console.log("change");
        setPassword('');
    }, [message]);

    const handleSubmit = async () => {
        try {
            console.log("email == ", email);
            console.log("password == ", password);
            const response = await axios.post('http://localhost:3001/auth/signin', {
                username: email,
                password: password,
            });

            if (response.data.status === 'success') {
                const { role, token, username, user_id } = response.data.data;

                localStorage.setItem('token', token);
                localStorage.setItem('username', username);
                localStorage.setItem('userId', user_id);
                localStorage.setItem('role', role);

                if (role === 'instructor') {
                    navigate('/instructor');
                    localStorage.setItem('active', 'instructor');
                    window.location.reload(false);
                } else {
                    navigate('/');
                    localStorage.setItem('active', 'student');
                    window.location.reload(false);
                }
            }
        } catch (error) {
            console.error(error);
            setMessage("Sai tài khoản hoặc mật khẩu. Vui lòng nhập lại.");
        }
    };

    return (
        <div className={cx('container')}>
            <div className={cx('container-login')}>
                <div className={cx('login-head')}>
                    <h3>{props.title}</h3>
                    <p>Chào mừng! Vui lòng đăng nhập để truy cập tài khoản của bạn.</p>
                </div>
                <div className={cx('login-content')}>
                    <div className={cx('content')}>
                        <div className={cx('content-name')}>
                            <label htmlFor="username">Tên đăng nhập</label>
                            <input
                                onChange={(e) => setEmail(e.target.value)}
                                type="text"
                                id="username"
                                name="username"
                                placeholder="Tên đăng nhập/email"
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
                            <p>Quên mật khẩu?</p>
                        </div>
                        <div className={cx('content-check')}>
                            <input type="checkbox" />
                            <label htmlFor="">Ghi nhớ đăng nhập</label>
                        </div>
                        <div onClick={handleSubmit} className={cx('content-btn-login')}>
                            <button type="submit">{props.title}</button>
                        </div>
                    </div>
                    {message && <p style={{ color: 'red', textAlign: 'center' }}>{message}</p>}
                    <div className={cx('or')}>
                        <p>Hoặc</p>
                    </div>
                    <div className={cx('google')}>
                        <img src={google} alt="" />
                        <p>Đăng nhập với Google</p>
                    </div>
                    <div className={cx('sign-up')}>
                        <p>Bạn chưa có tài khoản?</p>
                        <Link to="../signup" type="button">
                            {props.name}
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FormLogin;
