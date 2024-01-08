import React, { useEffect, useState } from 'react';

import classNames from 'classnames/bind';
import styles from './Teacher.module.scss';
import repository from 'src/repositories/repository';

import Footer from 'src/components/Footer/Footer';
import TeacherHeader from 'src/components/TeacherItems/TeacherHeader/TeacherHeader';
import TeacherItems from 'src/components/TeacherItems/TeacherItems';
import PhanTrang from 'src/components/PhanTrang/PhanTrang';
import roleHeaders from 'src/utils/role';

const cx = classNames.bind(styles);

const Teacher = () => {
    const role = localStorage.getItem('role') ?? '';
    const [listInstructors, setListInstructors] = useState([]);

    useEffect(() => {
        const getListTeacher = async () => {
            const listTeacher = await repository.listAllTeacher();
            setListInstructors(listTeacher.data.data)
        }
        getListTeacher()
    }, [])

    const handleGetUrl = async (e) => {
        if (e === 'new') {
            const listTeacher = await repository.listNewTeacher();
            setListInstructors(listTeacher.data.data)
        } else if (e === 'all') {
            const listTeacher = await repository.listAllTeacher();
            setListInstructors(listTeacher.data.data)
        } else {
            const listTeacher = await repository.listAllTeacher(true);
            setListInstructors(listTeacher.data.data)
        }
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                {roleHeaders[role]}
            </div>
            <div className={cx('body')}>
                <div className={cx('teacher-head')}>
                    <TeacherHeader handleGetUrl={handleGetUrl} />
                </div>
                <div className={cx('container-item')}>
                    {listInstructors && listInstructors.map((ins) => {
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
