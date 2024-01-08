import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './TeacherHeader.module.scss';

const cx = classNames.bind(styles);

const TeacherHeader = ({ handleGetUrl }) => {
    const [active, setActive] = useState();
    const listNewTeacher = async (status, id) => {
        setActive(id)
        switch (status) {
            case 'all':
                handleGetUrl('all')
                break;
            case 'new':
                handleGetUrl('new')
                break;
            case 'online':
                handleGetUrl('online')
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
            title: 'Giảng viên mới',
            status: 'new'
        },
        {
            id: 3,
            title: 'Đang hoạt động',
            status: 'online'
        }
    ]
    return (
        <div className={cx('wrapper')}>
            <div className={cx('head')}>
                <h3>Giảng Viên</h3>
            </div>
            <div className={cx('lists')}>
                {renderDiv.map((div, index) => {
                    return (
                        <div key={div.id} className={cx('lists-all', `${div.id === active ? 'active-status' : ''}`)}>
                            <p onClick={() => listNewTeacher(div.status, div.id)}>{div.title}</p>
                        </div>

                    )
                })}
            </div>
        </div>
    );
};

export default TeacherHeader;
