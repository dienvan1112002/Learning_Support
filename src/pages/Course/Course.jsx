import React from 'react';
import Header from 'src/components/Header/HeaderKhach/Header';
import Footer from 'src/components/Footer/Footer';
import CourseHead from 'src/components/Course/CourseHead/CourseHead';
import Course from 'src/components/Course/Course';
import repository from 'src/repositories/repository';
import useApi from 'src/utils/useApi';

import classNames from 'classnames/bind';
import styles from './Course.module.scss';
import roleHeaders from 'src/utils/role';

const cx = classNames.bind(styles);
const CourseP = () => {

    const apiFunc = () => repository.listCourse();

    const { result, error } = useApi(apiFunc);
    let role = localStorage.getItem('role') ?? '';
    const active = localStorage.getItem('active');

    let courses
    if (result?.status === "success") {
        courses = result.data;
    }

    if (active === 'instructor') {
        role = 'instructor'
    } else if (active === 'student') {
        role = 'student'
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                {roleHeaders[role]}
            </div>
            <div className={cx('body')}>
                <CourseHead />
                <div className={cx('course-item')}>
                    {courses && courses.map((course) => {
                        return <Course
                            key={course._id}
                            course={course}
                        />
                    })}
                </div>
            </div>
            <div className={cx('footer')}>
                <Footer />
            </div>
        </div>
    );
};

export default CourseP;
