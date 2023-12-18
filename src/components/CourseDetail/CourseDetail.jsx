import React from 'react';
import { FaBookmark } from 'react-icons/fa';

import classNames from 'classnames/bind';
import styles from './CourseDetail.module.scss';
import course4 from '../../assests/sourse/course4.png';
import Star from '../../assests/teacher/teacher-active/Star.png';
import techer from '../../assests/teacher/teacher_avt/teacherAvt1.png';
import chamxanh from '../../assests/teacher/teacher-active/Chamxanh.png';
const cx = classNames.bind(styles);

const CourseDetail = () => {
    return (
        <div className={cx('container')}>
            <div className={cx('course-detail-top')}>
                <div className={cx('course-detail-info')}>
                    <div className={cx('course-detail-info-name')}>
                        <div className={cx('head')}>
                            <h2>Khóa học thiết kế UI/UX</h2>
                        </div>
                        <div className={cx('chude')}>
                            <h3>Chủ đề:</h3> <h4 className={cx('thiet-ke')}> Thiết kế</h4>
                        </div>
                        <div className={cx('danhgia')}>
                            <div>
                                <img src={Star} alt="" />
                            </div>
                            <p>4.8 (410)</p>
                        </div>
                        <div className={cx('author')}>
                            <div className={cx('avt')}>
                                <img src={techer} alt="" />
                            </div>
                            <div className={cx('author-detail')}>
                                <div className={cx('author-detail-name')}>Sandesh Koshti</div>
                                <div className={cx('author-detail-act')}>
                                    <img src={chamxanh} alt="" />
                                    <div className={cx('author-detail-job')}>Design Services</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={cx('course-detail-info-gia')}>
                        <div className={cx('gia')}>
                            <p>$99</p>
                        </div>
                        <div className={cx('course-detail-info-gia-btn')}>
                            <div className={cx('khoahoc')}>
                                <button>Mua khóa học</button>
                            </div>
                            <div className={cx('marked')}>
                                <button>Đánh dấu</button>
                                <FaBookmark />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={cx('course-detail-img')}>
                    <img src={course4} alt="" />
                </div>
            </div>
            <div className={cx('course-detail-bottom')}>
                <div className={cx('course-detail-bottom-para')}>
                    <p>Mô tả</p>
                </div>
                <div className={cx('course-detail-bottom-destruction')}>
                    Chào mừng bạn đến với khóa học Thiết kế UI/UX của chúng tôi! Chương trình toàn diện này sẽ trang bị
                    cho bạn kiến ​​thức và kỹ năng để tạo giao diện người dùng (UI) đặc biệt và nâng cao trải nghiệm
                    người dùng (UX). Đi sâu vào thế giới của tư duy thiết kế, wireframing, tạo mẫu và thử nghiệm khả
                    năng sử dụng. Dưới đây là tổng quan về chương trình học
                </div>
            </div>
        </div>
    );
};

export default CourseDetail;
