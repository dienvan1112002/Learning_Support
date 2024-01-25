import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import TeacherMota from '../TeacherMota/TeacherMota';
import TeacherOverview from '../TeacherOverview/TeacherOverview';
import styles from './TeacherDetail.module.scss';
import Footer from 'src/components/Footer/Footer';
import { useParams } from 'react-router-dom';
import repository from 'src/repositories/repository';
import HeaderKhach from 'src/components/Header/HeaderKhach/Header';
import HeaderHv from 'src/components/Header/HeaderHv/HeaderHv';
import HeaderGv from 'src/components/Header/HeaderGv/HeaderGv';
import HeaderDkgv from 'src/components/Header/HeaderDkgv/HeaderDkgv';
import Search from 'src/components/Search/Search';

const cx = classNames.bind(styles);
const TeacherDetail = () => {
    const { id } = useParams();
    const [teacher, setTeacher] = useState(null)
    let role = localStorage.getItem('role') ?? '';

    const [isSearchActive, setSearchActive] = useState(false);

    const roleHeaders = {
        '': <HeaderKhach toggleSearch={() => setSearchActive(!isSearchActive)} />,
        null: <HeaderKhach toggleSearch={() => setSearchActive(!isSearchActive)} />,
        'student': <HeaderHv toggleSearch={() => setSearchActive(!isSearchActive)} />,
        'instructor': <HeaderGv />,
        'admin': <HeaderDkgv />
    };

    useEffect(() => {
        let result;
        const getTeacherInfo = async () => {
            if (role == 'student') {
                result = await repository.teacherDetailAPI(id);
            } else {
                result = await repository.teacherDetail(id);
            }
            setTeacher(result.data.data)
        }
        getTeacherInfo();
    }, [])
    const displayHeader = () => {
        if (role === 'instructor' || role === 'student') {
            role = 'student'
        }
        return role;
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                {roleHeaders[displayHeader()]}
            </div>
            {isSearchActive && <Search onClose={() => setSearchActive(false)} />}
            <div className={cx('body')}>
                <TeacherOverview teacher={teacher} />
                <TeacherMota teacher={teacher} />
            </div>
            <Footer />
        </div>
    );
}

export default TeacherDetail;
