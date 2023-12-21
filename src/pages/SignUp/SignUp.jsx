import React from 'react';

import classNames from 'classnames/bind';
import styles from './SignUp.module.scss';

import HeaderLogin from 'src/components/Header/HeaderLogin/HeaderLogin';
import Footer from '../../components/Footer/Footer';
import LoginLeft from '../../components/Loginleft/Loginleft';
import FormLogin from 'src/components/Form/FormLogin/FormLogin';
import FormSignup from 'src/components/Form/FormSignup/FormSignup';

const cx = classNames.bind(styles);

const SignUp = () => {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <HeaderLogin title="Đăng Ký" />
            </div>
            <div className={cx('body')}>
                <LoginLeft />
                <FormSignup />
            </div>

            <div className={cx('footer')}>
                <Footer />
            </div>
        </div>
    );
};

export default SignUp;
