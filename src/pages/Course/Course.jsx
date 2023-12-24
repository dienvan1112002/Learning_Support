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

    const apiFunc = () => repository.courseOfInstructor();

    const { result, error } = useApi(apiFunc);
    const role = localStorage.getItem('role') ?? '';

    let courses
    if (result) {
        courses = result.data;
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                {roleHeaders[role]}
            </div>
            <div className={cx('body')}>
                <div className={cx('course-head')}>
                    <CourseHead />
                </div>
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
