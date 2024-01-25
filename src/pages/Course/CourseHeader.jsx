import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './CourseHeader.module.scss';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

const CourseHeader = ({ handleGetUrl }) => {
    const navigate = useNavigate();
    const [active, setActive] = useState(1);
    const role = localStorage.getItem('role') ?? '';

    const listCourse = async (status, id) => {
        if (role !== "instructor" && role !== "student") {
            navigate('/login');
            return;
        }
        setActive(id);
        switch (status) {
            case 'all':
                handleGetUrl('all');
                break;
            case 'bookmarked':
                handleGetUrl('bookmarked');
                break;
            case 'watching':
                handleGetUrl('watching');
                break;
            default:
                handleGetUrl('all');
        }
    };

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
    ];

    return (
        <div className={cx('wrapper')}>
            <div className={cx('head')}>
                <h3>Khóa học</h3>
            </div>
            <div className={cx('lists')}>
                {renderDiv.map((div, index) => (
                    <div key={index} className={cx('lists-all', { 'active-status': div.id === active })}>
                        <p onClick={() => listCourse(div.status, div.id)}>{div.title}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CourseHeader;
