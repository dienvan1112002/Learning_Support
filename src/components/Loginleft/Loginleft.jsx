import React from 'react';

import styles from './Loginleft.module.scss';
import classNames from 'classnames/bind';

import logo from '../../assests/logo/logo.png';

const cx = classNames.bind(styles);

const Loginleft = () => {
    return (
        <div className={cx('container')}>
            <div className={cx('container-logo')}>
                <img src={logo} alt="" />
            </div>
            <div className={cx('container-name')}>
                <p>Learning Support</p>
            </div>
            <div className={cx('container-mota')}>
                <p>
                    Trang web hỗ trợ học tập <br /> nâng cao kiến thức và kỹ năng của bạn
                </p>
            </div>
        </div>
    );
};

export default Loginleft;
