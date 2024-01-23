import React from 'react';
import classNames from 'classnames/bind';
import styles from './styles.module.scss';
import Footer from 'src/components/Footer/Footer';
import RegisterTecher from 'src/components/Teacher/Register/RegisterTecher';
import roleHeaders from 'src/utils/role';

const cx = classNames.bind(styles);

const DKGiangVien = () => {
    const role = localStorage.getItem('role');
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                {roleHeaders[role]}
            </div>
            <div className={cx('body')}>
                <RegisterTecher />
            </div>
            <Footer />
        </div>
    );
};

export default DKGiangVien;
