import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import styles from './FormLogin.module.scss';
import classNames from 'classnames/bind';
import google from '../../../assests/logo/google.png';
import axios from 'axios';

const cx = classNames.bind(styles);

const FormLogin = (props) => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async () => {
        try {
            const response = await axios.post('http://localhost:3001/auth/signin', {
                username: email,
                password: password,
            });

            if (response.data.status === "success") {
                const role = response.data.data.role;
                localStorage.setItem('token', response.data.data.token);
                localStorage.setItem('username', response.data.data.username);
                localStorage.setItem('role', role);
                navigate('/user');
            }
        } catch (error) {
            console.log(error);
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
