import React from 'react';

import classNames from 'classnames/bind';
import styles from './CourseContent.module.scss';
import time from '../../../assests/sourse/time/time.png';

const cx = classNames.bind(styles);
const CourseContent = ({ chapter }) => {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('header')}>
                    <h2>{chapter.index + 1}</h2>
                </div>
                <div className={cx('name')}>
                    <h3>{chapter.chapter.title}</h3>
                </div>
                <div className={cx('items-container')}>
                    {chapter.chapter.lessons.map((lesson, index) => {
                        return (
                            <>
                                <div className={cx('lists-item')} id={`index__${lesson._id}`}>
                                    <div className={cx('lists-item-name')}>
                                        <div className={cx('lists-item-title')}>
                                            <h4>{lesson.title}</h4>
                                        </div>
                                        <div className={cx('lists-item-number')}>
                                            <p>Bài {index + 1}</p>
                                        </div>
                                    </div>
                                    {/* <div className={cx('lists-item-time')}>
                                        <img src={time} alt="" />
                                        <p>45 Phút</p>
                                    </div> */}
                                </div>
                            </>
                        )
                    })}
                </div>
            </div>
        </div>
    );
};

export default CourseContent;
