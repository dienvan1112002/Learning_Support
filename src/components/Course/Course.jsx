import React from 'react';
import styles from './Course.module.scss';
import classNames from 'classnames/bind';

import course1 from '../../assests/sourse/course1.png';
import course2 from '../../assests/sourse/course2.png';
import course3 from '../../assests/sourse/course3.png';
import no_img from '../../assests/sourse/no_img.jpg';
import daysFromNow from 'src/helper/function';
import getImageFromBaseURL from 'src/helper/get_image.js';

const cx = classNames.bind(styles);
const Course = ({ course }) => {

    return (
        <div className="flex justify-center items-center">
            <div className={cx('course-wrapper')}>
                <div className={cx('course-top')}>
                    <div className={cx('course-info')}>
                        <h2>{course.title}</h2>
                        <p>
                            {course.description}
                        </p>
                    </div>
                    <button className={cx('btn-primary')}>Xem khóa học</button>
                </div>
                <div className={cx('course-img')}>
                    {course.thumbnails && course.thumbnails.map((thumbnail) => {
                        return <div key={thumbnail}>
                            <img 
                            src={getImageFromBaseURL(thumbnail)} 
                            alt="122" 
                            onError={((e) => {
                                e.target.onerror = null;
                                e.target.src = no_img;
                            })}
                            style={{ width: '317px', height: '238px' }}
                            />
                        </div>
                    })}
                </div>
                <div className={cx('course-bottom')}>
                    <div className={cx('course-bottom-level')}>
                        <div className={cx('course-bottom-box')}>
                            <p>Được cập nhật cách đây {daysFromNow(course.updatedAt)} ngày</p>
                        </div>
                        <div className={cx('course-bottom-box')}>
                            <p>{course.level[0]}</p>
                        </div>
                    </div>
                    <div className={cx('course-bottom-author')}>
                        <p>{course.instructor.name}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Course;
