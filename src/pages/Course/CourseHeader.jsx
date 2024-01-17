import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './CourseHeader.module.scss';

const cx = classNames.bind(styles);
const CourseHeader = ({ handleGetUrl }) => {
    const [active, setActive] = useState();
    const listCourse = async (status, id) => {
        setActive(id)
        switch (status) {
            case 'all':
                handleGetUrl('all')
                break;
            case 'bookmarked':
                handleGetUrl('bookmarked')
                break;
            default:
                handleGetUrl('all')
        }

    }

    const renderDiv = [
        {
            id: 1,
            title: 'Tất cả',
            status: 'all'
        },
        {
            id: 2,
            title: 'Đánh dấu',
            status: 'bookmarked'
        },
        {
            id: 3,
            title: 'Đã xem',
            status: 'watching'
        }
    ]
    return (
        <div className={cx('wrapper')}>
            <div className={cx('head')}>
                <h3>Khóa học</h3>
            </div>
            <div className={cx('lists')}>
                {renderDiv.map((div, index) => {
                    return (
                        <div key={index} className={cx('lists-all', `${div.id === active ? 'active-status' : ''}`)}>
                            <p onClick={() => listCourse(div.status, div.id)}>{div.title}</p>
                        </div>

                    )
                })}
            </div>
        </div>
    );
}

export default CourseHeader;
