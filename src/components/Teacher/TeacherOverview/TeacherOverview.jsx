import React from 'react';
import classNames from 'classnames/bind';
import styles from './TeacherOverview.module.scss';

import nen from '../../../assests/teacher/nen/nen.png';
import teacher from '../../../assests/teacher/teacher1.png';
import star from '../../../assests/teacher/teacher-active/Star.png';

const cx = classNames.bind(styles);
const TeacherOverview = ({ teacher }) => {
    console.log("teacher overview === ", teacher);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('container-info')}>
                    <div className={cx('info-left')}>
                        <div className={cx('info-img')}>
                            {teacher?.user?.image && <img src={teacher?.user?.image} alt="cogiao" />}
                        </div>
                        <div className={cx('info-btn')}>
                            <div className={cx('thue')}>
                                <button>Thuê</button>
                            </div>
                            <div className={cx('follow')}>
                                {teacher?.isFollowed == false ? <button>Theo dõi</button> : <button>Bỏ theo dõi</button>}
                            </div>
                        </div>
                    </div>
                    <div className={cx('info-right')}>
                        <div className={cx('name')}>
                            <h2>{teacher?.user?.name}</h2>
                        </div>
                        <div className={cx('chitiet')}>
                            <div className={cx('linhvuc')}>
                                <div>
                                    <b>Môn học:</b>
                                </div>
                                {teacher?.subjects && teacher?.subjects.map((subject, index) => (
                                    <React.Fragment key={index}>
                                        {index > 0 && ', '}
                                        <p>{subject}</p>
                                    </React.Fragment>
                                ))}
                            </div>

                            <div className={cx('danhgia')}>
                                <div>
                                    <b>Đánh giá:</b>
                                </div>
                                {teacher?.avg_rating && (
                                    <div className={cx('danhgia-chitiet')}>
                                        <img src={star} alt="" />
                                        <p>{teacher?.avg_rating} (41)</p>
                                    </div>
                                )}
                                {!teacher?.avg_rating && <p>Chưa có đánh giá</p>}
                            </div>

                            <div className={cx('khoahoc')}>
                                <div>
                                    <b>Khóa học:</b>
                                </div>
                                <div>
                                    <p>{teacher?.num_course}</p>
                                </div>
                            </div>
                            <div className={cx('theodoi')}>
                                <div>
                                    <b>Theo dõi:</b>
                                </div>
                                <p>{teacher?.follower}</p>
                            </div>
                            <div className={cx('dangki')}>
                                <div>
                                    <b>Số lượt đăng kí học:</b>
                                </div>
                                <p>{teacher?.num_registration}</p>
                            </div>
                            {/* <div className={cx('tilehoanthanh')}>
                                <div>
                                    <b>Tỷ lệ hoàn thành:</b>
                                </div>
                                <p>95%</p>
                            </div> */}
                        </div>
                    </div>
                </div>
                <div className={cx('container-img')}>
                    <img src={nen} alt="" />
                </div>
            </div>
        </div>
    );
};

export default TeacherOverview;
