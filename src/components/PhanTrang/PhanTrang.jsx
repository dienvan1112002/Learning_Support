import React from 'react';
import { IoMdArrowDropleft } from 'react-icons/io';
import { IoMdArrowDropright } from 'react-icons/io';

import styles from './PhanTrang.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);
const PhanTrang = () => {
    return (
        <div className={cx('footer')}>
            <div className={cx('footer-trai')}>
                <IoMdArrowDropleft />
            </div>
            <div className={cx('footer-01')}>01</div>
            <div className={cx('footer-trai')}>02</div>
            <div className={cx('footer-trai')}>...</div>
            <div className={cx('footer-trai')}>10</div>
            <div className={cx('footer-phai')}>
                <IoMdArrowDropright />
            </div>
        </div>
    );
};

export default PhanTrang;
