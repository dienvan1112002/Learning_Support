import React from 'react';

import classNames from 'classnames/bind';
import styles from './CourseContent.module.scss';
import time from '../../../assests/sourse/time/time.png';

const cx = classNames.bind(styles);

const CourseContent = ({ chapter, status }) => {
    let role = localStorage.getItem('role');
    const handleItemClick = (videoUrl) => {
        if (videoUrl && status !== true) {
            window.open(videoUrl, '_blank');
        }
    };

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
                    {chapter.chapter.lessons.map((lesson, index) => (
                        <div
                            key={index}
                            className={cx('lists-item')}
                            id={`index__${lesson._id}`}
                            onClick={() => handleItemClick(lesson.content.url)}
                            style={{
                                cursor: status !== true && lesson.lessonType === 'video' ? 'pointer' : 'default',
                            }}
                        >
                            <div className={cx('lists-item-name')}>
                                <div className={cx('lists-item-title')}>
                                    <h4>{lesson.title}</h4>
                                </div>
                                <div className={cx('lists-item-number')}>
                                    <p>Bài {index + 1}</p>
                                </div>
                            </div>
                            <div className={cx('preview-label')}>
                                {lesson.lessonType === 'video' && status !== true && chapter.index === 0 &&
                                    role != 'instructor' && (
                                        <p>Xem trước</p>
                                    )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CourseContent;
