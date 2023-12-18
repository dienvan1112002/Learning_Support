import React from 'react';
import classNames from 'classnames/bind';
import styles from './TeacherMota.module.scss';

import { IoMdArrowDropleft } from 'react-icons/io';
import { IoMdArrowDropright } from 'react-icons/io';

import star from '../../../assests/teacher/teacher-active/Star.png';
import teacher from '../../../assests/teacher/teacher_avt/teacherAvt.png';

const cx = classNames.bind(styles);
const TeacherMota = () => {
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
                    <p>Chứng chỉ thiết kế hệ thống</p>
                    <p>Chứng chỉ tin học loại B</p>
                </div>
                <div className={cx('mota')}>
                    <div className={cx('mota-head')}>
                        <h3>Trình độ học vấn</h3>
                    </div>
                    <p>Sinh viên năm 4 KMA, GPA 3.9 </p>
                </div>
            </div>
            <div className={cx('danhgia')}>
                <div className={cx('danhgia-head')}>
                    <h3>Đánh giá</h3>
                </div>
                <div className={cx('comment')}>
                    <div className={cx('comment-info')}>
                        <div>
                            <img src={teacher} alt="teacher" />
                        </div>
                        <div className={cx('comment-info-chitiet')}>
                            <div className={cx('comment-info-chitiet-top')}>
                                <div className={cx('comment-info-name')}>
                                    <p>Hoàng Trung</p>
                                </div>
                                <div className={cx('comment-info-time')}>
                                    <p>12:47:41, 30/10/2023</p>
                                </div>
                                <div className={cx('comment-info-star')}>
                                    <img src={star} alt="" />
                                    <img src={star} alt="" />
                                    <img src={star} alt="" />
                                    <img src={star} alt="" />
                                    <img src={star} alt="" />
                                </div>
                            </div>
                            <div className={cx('comment-info-chitiet-nd')}>
                                <p>Dạy chất lượng</p>
                            </div>
                        </div>
                    </div>
                    <div className={cx('comment-info')}>
                        <div>
                            <img src={teacher} alt="teacher" />
                        </div>
                        <div className={cx('comment-info-chitiet')}>
                            <div className={cx('comment-info-chitiet-top')}>
                                <div className={cx('comment-info-name')}>
                                    <p>Hoàng Trung</p>
                                </div>
                                <div className={cx('comment-info-time')}>
                                    <p>12:47:41, 30/10/2023</p>
                                </div>
                                <div className={cx('comment-info-star')}>
                                    <img src={star} alt="" />
                                    <img src={star} alt="" />
                                    <img src={star} alt="" />
                                    <img src={star} alt="" />
                                    <img src={star} alt="" />
                                </div>
                            </div>
                            <div className={cx('comment-info-chitiet-nd')}>
                                <p>Dạy chất lượng</p>
                            </div>
                        </div>
                    </div>
                    <div className={cx('comment-info')}>
                        <div>
                            <img src={teacher} alt="teacher" />
                        </div>
                        <div className={cx('comment-info-chitiet')}>
                            <div className={cx('comment-info-chitiet-top')}>
                                <div className={cx('comment-info-name')}>
                                    <p>Hoàng Trung</p>
                                </div>
                                <div className={cx('comment-info-time')}>
                                    <p>12:47:41, 30/10/2023</p>
                                </div>
                                <div className={cx('comment-info-star')}>
                                    <img src={star} alt="" />
                                    <img src={star} alt="" />
                                    <img src={star} alt="" />
                                    <img src={star} alt="" />
                                    <img src={star} alt="" />
                                </div>
                            </div>
                            <div className={cx('comment-info-chitiet-nd')}>
                                <p>Dạy chất lượng</p>
                            </div>
                        </div>
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
