import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import roleHeaders from 'src/utils/role';
import TeacherMota from '../TeacherMota/TeacherMota';
import TeacherOverview from '../TeacherOverview/TeacherOverview';
import styles from './TeacherDetail.module.scss';
import Footer from 'src/components/Footer/Footer';
import { useParams } from 'react-router-dom';
import repository from 'src/repositories/repository';
import useApi from 'src/utils/useApi';

const cx = classNames.bind(styles);
const TeacherDetail = () => {
    const { id } = useParams();
    const [teacher, setTeacher] = useState(null)
    let role = localStorage.getItem('role') ?? '';
    const active = localStorage.getItem('active');
    if (active === 'instructor') {
        role = 'instructor'
    } else if (active === 'student') {
        role = 'student'
    }

    const apiFunc = () => {
        if (role === 'student') {
            return repository.teacherDetailAPI(id);
        } else {
            return repository.teacherDetail(id);
        }
    }

    const { result, error } = useApi(apiFunc);

    useEffect(() => {
        if (result?.status == "success") {
            setTeacher(result.data)
        }
    }, [result])

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                {roleHeaders[role]}
            </div>
            <div className={cx('body')}>
                <TeacherOverview teacher={teacher} />
                <TeacherMota teacher={teacher} />
            </div>
            <div className={cx('footer')}>
                <Footer />
            </div>
        </div>
    );
}

export default TeacherDetail;
