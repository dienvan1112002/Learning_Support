import React, { useCallback, useEffect, useState } from 'react';

import classNames from 'classnames/bind';
import styles from './Teacher.module.scss';
import useApi from 'src/utils/useApi';
import repository from 'src/repositories/repository';

import Footer from 'src/components/Footer/Footer';
import TeacherHeader from 'src/components/TeacherItems/TeacherHeader/TeacherHeader';
import TeacherItems from 'src/components/TeacherItems/TeacherItems';
import PhanTrang from 'src/components/PhanTrang/PhanTrang';
import HeaderHv from 'src/components/Header/HeaderHv/HeaderHv';
import roleHeaders from 'src/utils/role';
import axios from 'axios';

const cx = classNames.bind(styles);

const Teacher = () => {
    const role = localStorage.getItem('role') ?? '';
    const [listInstructors, setListInstructors] = useState([]);

    // useEffect(() => {
    //     callSomeAPI();
    //     return () => {
    //         console.log('This will be logged on unmount');
    //     };
    // }, [])

    // const callSomeAPI = async () => {
    //     const res = await axios.get('http://localhost:3001/api/user/instructor', {
    //         headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    //     });
    //     if (res.data.status === 'success') {
    //         setListInstructors(res.data.data);
    //     }
    // }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                {roleHeaders[role]}
            </div>
            <div className={cx('body')}>
                <div className={cx('teacher-head')}>
                    <TeacherHeader />
                </div>
                <div className={cx('container-item')}>
                    {listInstructors.length && listInstructors.map((ins) => {
                        return <TeacherItems ins={ins} />
                    })}
                </div>
                <div className={cx('phan-trang')}>
                    <PhanTrang />
                </div>
            </div>
            <div className={cx('footer')}>
                <Footer />
            </div>
        </div>
    );
};

export default Teacher;
