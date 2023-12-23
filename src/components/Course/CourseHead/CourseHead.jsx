import React from 'react';
import { Link } from 'react-router-dom';

import classNames from 'classnames/bind';
import styles from './CourseHead.module.scss';

const cx = classNames.bind(styles);
const CourseHead = () => {
    return (
        <div className={cx('container')}>
            <div className={cx('header')}>
                <h4>Khóa học</h4>
            </div>
            {/* <div className={cx('para')}>
                <div className={cx('all')}>
                    <p>Tất cả </p>
                </div>
                <div className={cx('danhdau')}>
                    <p>Đánh dấu</p>
                </div>
                <div className={cx('daxem')}>
                    <p>Đã xem</p>
                </div>
            </div> */}
           <div>
                <Link to="/course/create">
                    <button className={cx('btn-primary')}>Tạo khóa học</button>
                </Link>
            </div>
        </div>
    );
};

export default CourseHead;
