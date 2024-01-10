import React, { useEffect, useState } from 'react';
import { FaBookmark } from 'react-icons/fa';

import classNames from 'classnames/bind';
import styles from './CourseDetail.module.scss';
import course4 from '../../assests/sourse/course4.png';
import Star from '../../assests/teacher/teacher-active/Star.png';
import { useNavigate, useParams } from 'react-router-dom';
import repository from 'src/repositories/repository';
import useApi from 'src/utils/useApi';
import CourseContent from './CourseContent/CourseContent';
const cx = classNames.bind(styles);

const CourseDetail = () => {
    const navigate = useNavigate();
    const [course, setCourse] = useState(null);
    const { id } = useParams();
    const role = localStorage.getItem('role');

    const updateBookmark = async () => {
        if (role !== 'student') {
            navigate('/login');
            return;
        }
        const res = await repository.updateBookmark(id);
        if (res.data.status === 'success') {
            window.location.reload();
        }
    }

    const apiFunc = () => repository.courseById(id);

    const { result, error } = useApi(apiFunc);

    useEffect(() => {
        if (result?.status == "success") {
            setCourse(result.data)
            console.log(result.data);
        }
    }, [result])

    return (
        <div className={cx('container')}>
            <div className={cx('course-detail-top')}>
                <div className={cx('course-detail-info')}>
                    <div className={cx('course-detail-info-name')}>
                        <div className={cx('head')}>
                            <h2>{course?.title}</h2>
                        </div>
                        <div className={cx('chude')}>
                            <h3>Chủ đề:</h3> <h4 className={cx('thiet-ke')}>{course?.subject}</h4>
                        </div>
                        <div className={cx('danhgia')}>
                            <div>
                                <img src={Star} alt="" />
                            </div>
                            {course?.avg_rating && <p>{course.avg_rating} (410)</p>}
                            {!course?.avg_rating && <p>Chưa có đánh giá</p>}
                        </div>
                        <div className={cx('author')}>
                            <div className={cx('avt')}>
                                <img src={course?.instructor.image} alt="" />
                            </div>
                            <div className={cx('author-detail')}>
                                <div className={cx('author-detail-name')}>{course?.instructor.name}</div>
                                {/* <div className={cx('author-detail-act')}>
                                    <img src={chamxanh} alt="" />
                                    <div className={cx('author-detail-job')}>Design Services</div>
                                </div> */}
                            </div>
                        </div>
                    </div>
                    <div className={cx('course-detail-info-gia')}>
                        <div className={cx('gia')}>
                            <p>{course?.price} VND</p>
                        </div>
                        <div className={cx('course-detail-info-gia-btn')}>
                            <div className={cx('khoahoc')}>
                                {
                                    course?.isRegistered == false ? (
                                        <button>Mua khóa học</button>
                                    ) : (
                                        <button>Tiêp tục khóa học</button>
                                    )
                                }
                            </div>
                            <div className={cx('marked')}>
                                {
                                    course?.isBookmarked == false ? (
                                        <button onClick={() => updateBookmark()}>Đánh dấu</button>
                                    ) : (
                                        <button onClick={() => updateBookmark()}>Bỏ đánh dấu</button>
                                    )
                                }
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
                    {course?.description}
                </div>
            </div>

            {course?.chapters && course.chapters.map((chapter, index) => (
                <CourseContent key={index} chapter={{ chapter, index }} />
            ))}
        </div>
    );
};

export default CourseDetail;
