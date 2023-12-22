import React , { useCallback }  from 'react';

import classNames from 'classnames/bind';
import styles from './Teacher.module.scss';
import useApi from 'src/utils/useApi';
import repository from 'src/repositories/repository';

import HeaderKhach from 'src/components/Header/HeaderKhach/Header';
import Footer from 'src/components/Footer/Footer';
import TeacherHeader from 'src/components/TeacherItems/TeacherHeader/TeacherHeader';
import TeacherItems from 'src/components/TeacherItems/TeacherItems';
import PhanTrang from 'src/components/PhanTrang/PhanTrang';
const cx = classNames.bind(styles);

const Teacher = () => {

    const credentials = {
        username: 'admin2',
        password: 'admin2',
    };

    const apiFunc = useCallback(() => repository.teacher(credentials), [credentials]);

    const { result, error } = useApi(apiFunc);


    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <HeaderKhach />
            </div>
            <div className={cx('body')}>
                <div className={cx('teacher-head')}>
                    <TeacherHeader />
                </div>
                <div className={cx('container-item')}>
                    <TeacherItems />
                    <TeacherItems />
                    <TeacherItems />
                </div>
                {/* <div className={cx('container-item')}>
                    <TeacherItems />
                    <TeacherItems />
                    <TeacherItems />
                </div> */}
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
