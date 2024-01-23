import React from 'react';
import Footer from 'src/components/Footer/Footer';

import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import roleHeaders from '../../utils/role';
import Info from 'src/components/Info/info';
import CourseHead from 'src/components/Course/CourseHead/CourseHead';
import Course from 'src/components/Course/Course';
import repository from 'src/repositories/repository';
import useApi from 'src/utils/useApi';
import './home.css'

const cx = classNames.bind(styles);

const HomeGV = () => {
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
                <Info />
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
    )
}

export default HomeGV;