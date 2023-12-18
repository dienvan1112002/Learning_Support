import React from 'react';
import Header from 'src/components/Header/HeaderKhach/Header';
import Footer from 'src/components/Footer/Footer';
import CourseHead from 'src/components/Course/CourseHead/CourseHead';
import Course from 'src/components/Course/Course';

import classNames from 'classnames/bind';
import styles from './Course.module.scss';

const cx = classNames.bind(styles);
const CourseP = () => {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <Header />
            </div>
            <div className={cx('body')}>
                <div className={cx('course-head')}>
                    <CourseHead />
                </div>
                <div className={cx('course-item')}>
                    <Course />
                    <Course />
                    <Course />
                </div>
            </div>
            <div className={cx('footer')}>
                <Footer />
            </div>
        </div>
    );
};

export default CourseP;
