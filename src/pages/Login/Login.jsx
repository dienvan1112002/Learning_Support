import React, { useState, useCallback } from 'react';
import repository from 'src/repositories/repository';
import useApi from 'src/utils/useApi';

import classNames from 'classnames/bind';
import styles from './Login.module.scss';

import Header from '../../components/Header/HeaderLogin/HeaderLogin';
import Footer from '../../components/Footer/Footer';
import LoginLeft from '../../components/Loginleft/Loginleft';
import FormLogin from '../../components/Form/FormLogin/FormLogin';

const cx = classNames.bind(styles);

const Login = () => {
    const credentials = {
        username: 'admin2',
        password: 'admin2',
    };

    const apiFunc = () => repository.login(credentials);

    const { result, error } = useApi(apiFunc);
  
    console.log(result);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <Header title="Đăng nhập" />
            </div>
            <div className={cx('body')}>
                <LoginLeft />
                <FormLogin title="Đăng nhập" name="Đăng kí" link="../login" />
            </div>

            <div className={cx('footer')}>
                <Footer />
            </div>
        </div>
    );
};

export default Login;