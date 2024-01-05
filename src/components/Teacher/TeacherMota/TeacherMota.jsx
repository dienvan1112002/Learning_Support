import React from 'react';
import classNames from 'classnames/bind';
import styles from './TeacherMota.module.scss';

import { IoMdArrowDropleft } from 'react-icons/io';
import { IoMdArrowDropright } from 'react-icons/io';

import star from '../../../assests/teacher/teacher-active/Star.png';
import teacher from '../../../assests/teacher/teacher_avt/teacherAvt.png';

const cx = classNames.bind(styles);
const TeacherMota = ({ teacher }) => {

    const formatDate = (date) => {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear(),
            hour = d.getHours(),
            minute = d.getMinutes(),
            second = d.getSeconds()

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [year, month, day].join('-').concat(' ', [hour, minute, second].join(':'));
    }

    return (
        <div className={cx('container')}>
            <div className={cx('info')}>
                <div className={cx('mota')}>
                    <div className={cx('mota-head')}>
                        <h3>Mô tả</h3>
                    </div>
                    <p>Nhận dạy tất cả các môn đại cương và thiết kế</p>
                </div>
                <div className={cx('mota')}>
                    <div className={cx('mota-head')}>
                        <h3>Kỹ năng</h3>
                    </div>
                    <p>Phân tích thiết kế</p>
                    <p>Lập trình web</p>
                </div>
                <div className={cx('mota')}>
                    <div className={cx('mota-head')}>
                        <h3>Chúng chỉ</h3>
                    </div>
                    {teacher?.certificates && teacher?.certificates.map((cer, index) => {
                        return <p key={index}>{cer.name}</p>
                    })}
                </div>
                <div className={cx('mota')}>
                    <div className={cx('mota-head')}>
                        <h3>Trình độ học vấn</h3>
                    </div>
                    {teacher?.academic_level && teacher?.academic_level.map((lev, index) => {
                        return <p key={index}>{lev.name}</p>
                    })}
                </div>
            </div>
            <div className={cx('danhgia')}>
                <div className={cx('danhgia-head')}>
                    <h3>Đánh giá</h3>
                </div>
                <div className={cx('comment')}>
                    <div className={cx('comment-info')}>
                        {
                            teacher?.reviews && teacher?.reviews.map((review, index) => {
                                return (
                                    <div key={index}>
                                        <div>
                                            <img src={review.user.image} alt="teacher" />
                                        </div>
                                        <div className={cx('comment-info-chitiet')}>

                                            <div className={cx('comment-info-chitiet-top')}>
                                                <div className={cx('comment-info-name')}>
                                                    <p>{review.user.name}</p>
                                                </div>
                                                <div className={cx('comment-info-time')}>
                                                    <p>{formatDate(review.user.updatedAt)}</p>
                                                </div>
                                                <div className={cx('comment-info-star')}>
                                                    {[...Array(review.star)].map((_, index) => <img key={index} src={star} />)}
                                                </div>
                                            </div>
                                            <div className={cx('comment-info-chitiet-nd')}>
                                                <p>{review.content}</p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
            <div className={cx('footer')}>
                <div className={cx('footer-trai')}>
                    <IoMdArrowDropleft />
                </div>
                <div className={cx('footer-01')}>01</div>
                <div className={cx('footer-trai')}>02</div>
                <div className={cx('footer-trai')}>...</div>
                <div className={cx('footer-trai')}>10</div>
                <div className={cx('footer-phai')}>
                    <IoMdArrowDropright />
                </div>
            </div>
        </div>
    );
};

export default TeacherMota;
