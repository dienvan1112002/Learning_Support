import React from 'react';
import classNames from 'classnames/bind';
import styles from './HeaderLogin.module.scss';
import logo from '../../../assests/logo/shapelogo.png';
import { PropTypes } from 'prop-types';
const cx = classNames.bind(styles);
const HeaderLogin = (props) => {
    return (
        <div className={cx('container')}>
            <div className={cx('container-right')}>
                <div className={cx('container-logo')}>
                    <a href="/">
                        <img src={logo} alt="" />
                    </a>
                    <p>Learning Support</p>
                </div>
                <div className={cx('text-login')}>
                    <p>{props.title}</p>
                </div>
            </div>
            <div className={cx('container-left')}>
                <button>Bạn cần giúp đỡ?</button>
            </div>
        </div>
    );
};

export default HeaderLogin;
