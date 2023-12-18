import React from 'react';
import classNames from 'classnames/bind';
import styles from './styles.module.scss';
import Footer from 'src/components/Footer/Footer';
import HeaderLogin from 'src/components/Header/HeaderLogin/HeaderLogin';
import RegisterTecher from 'src/components/Teacher/Register/RegisterTecher';

const cx = classNames.bind(styles);

const DKGiangVien = () => {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <HeaderLogin title="Đăng ký làm giảng viên" />
            </div>
            <div className={cx('body')}>
                <RegisterTecher />
            </div>
            <div className={cx('footer')}>
                <Footer />
            </div>
        </div>
    );
};

export default DKGiangVien;
