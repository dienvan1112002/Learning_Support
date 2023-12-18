import React from 'react';
import classNames from 'classnames/bind';
import styles from './TeacherHeader.module.scss';

const cx = classNames.bind(styles);

const TeacherHeader = () => {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('head')}>
                <h3>Giảng Viên</h3>
            </div>
            <div className={cx('lists')}>
                <div className={cx('lists-all')}>
                    <p>Tất cả </p>
                </div>
                <div className={cx('lists-hot')}>
                    <p>Giảng viên nổi bật </p>
                </div>
                <div className={cx('lists-new')}>
                    <p>Giảng viên mới </p>
                </div>
                <div className={cx('lists-active')}>
                    <p>Đang hoạt động</p>
                </div>
            </div>
        </div>
    );
};

export default TeacherHeader;
