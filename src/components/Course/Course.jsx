import React from 'react';
import styles from './Course.module.scss';
import classNames from 'classnames/bind';

import course1 from '../../assests/sourse/course1.png';
import course2 from '../../assests/sourse/course2.png';
import course3 from '../../assests/sourse/course3.png';

const cx = classNames.bind(styles);
const Course = () => {
    return (
        <div className="flex justify-center items-center">
            <div className={cx('course-wrapper')}>
                <div className={cx('course-top')}>
                    <div className={cx('course-info')}>
                        <h2>Web Design Fundamentals</h2>
                        <p>
                            Learn the fundamentals of web design, including HTML, CSS, and responsive design principles.
                            Develop the skills to create visually appealing and user-friendly websites.
                        </p>
                    </div>
                    <button className={cx('course-top-btn')}>Xem khóa học</button>
                </div>
                <div className={cx('course-img')}>
                    <div>
                        <img src={course1} alt="" />
                    </div>
                    <div>
                        <img src={course2} alt="" />
                    </div>
                    <div>
                        <img src={course3} alt="" />
                    </div>
                </div>
                <div className={cx('course-bottom')}>
                    <div className={cx('course-bottom-level')}>
                        <div className={cx('course-bottom-box')}>
                            <p>4 Weeks</p>
                        </div>
                        <div className={cx('course-bottom-box')}>
                            <p>Beginner</p>
                        </div>
                    </div>
                    <div className={cx('course-bottom-author')}>
                        <p>By John Smith</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Course;
