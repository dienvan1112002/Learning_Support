import React from 'react';

import classNames from 'classnames/bind';
import styles from './CourseContent.module.scss';
import time from '../../../assests/sourse/time/time.png';

const cx = classNames.bind(styles);
const CourseContent = () => {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('header')}>
                    <h2>01</h2>
                </div>
                <div className={cx('name')}>
                    <h3>Tổng quan về thiết kế UI/UX</h3>
                </div>
                <div className={cx('items-container')}>
                    <div className={cx('lists-item')}>
                        <div className={cx('lists-item-name')}>
                            <div className={cx('lists-item-title')}>
                                <h4>Hiểu nguyên tắc thiết kế UI/UX</h4>
                            </div>
                            <div className={cx('lists-item-number')}>
                                <p>Bài 01</p>
                            </div>
                        </div>
                        <div className={cx('lists-item-time')}>
                            <img src={time} alt="" />
                            <p>45 Phút</p>
                        </div>
                    </div>
                    <div className={cx('lists-item')}>
                        <div className={cx('lists-item-name')}>
                            <div className={cx('lists-item-title')}>
                                <h4>Hiểu nguyên tắc thiết kế UI/UX</h4>
                            </div>
                            <div className={cx('lists-item-number')}>
                                <p>Bài 01</p>
                            </div>
                        </div>
                        <div className={cx('lists-item-time')}>
                            <img src={time} alt="" />
                            <p>45 Phút</p>
                        </div>
                    </div>
                    <div className={cx('lists-item')}>
                        <div className={cx('lists-item-name')}>
                            <div className={cx('lists-item-title')}>
                                <h4>Hiểu nguyên tắc thiết kế UI/UX</h4>
                            </div>
                            <div className={cx('lists-item-number')}>
                                <p>Bài 01</p>
                            </div>
                        </div>
                        <div className={cx('lists-item-time')}>
                            <img src={time} alt="" />
                            <p>45 Phút</p>
                        </div>
                    </div>
                    <div className={cx('lists-item')}>
                        <div className={cx('lists-item-name')}>
                            <div className={cx('lists-item-title')}>
                                <h4>Hiểu nguyên tắc thiết kế UI/UX</h4>
                            </div>
                            <div className={cx('lists-item-number')}>
                                <p>Bài 01</p>
                            </div>
                        </div>
                        <div className={cx('lists-item-time')}>
                            <img src={time} alt="" />
                            <p>45 Phút</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseContent;
