import React from 'react';
import classNames from 'classnames/bind';
import styles from './styles1.module.scss';
import Footer from 'src/components/Footer/Footer';
import HeaderLogin from 'src/components/Header/HeaderLogin/HeaderLogin';
import RegisterTecher3 from 'src/components/Teacher/Register/RegisterTecher3';

const cx = classNames.bind(styles);

const DKGiangVien2 = () => {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <HeaderLogin title="Đăng ký làm giảng viên" />
            </div>
            <div className={cx('body')}>
                <RegisterTecher3 />
            </div>
            <div className={cx('footer')}>
                <Footer />
            </div>
        </div>
    );
};

export default DKGiangVien2;
