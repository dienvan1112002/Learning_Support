import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import Rating from '@mui/material/Rating';
import styles from './CourseInstructor.module.scss';
import Star from '../../../assests/teacher/teacher-active/Star.png';
import { useNavigate, useParams } from 'react-router-dom';
import formatDate from 'src/helper/formatDate';
import getImageFromBaseURL from 'src/helper/get_image';
import HeaderKhach from 'src/components/Header/HeaderKhach/Header';
import HeaderHv from 'src/components/Header/HeaderHv/HeaderHv';
import HeaderDkgv from 'src/components/Header/HeaderDkgv/HeaderDkgv';
import Search from 'src/components/Search/Search';
import repository from 'src/repositories/repository';
import HeaderGv from 'src/components/Header/HeaderGv/HeaderGv';
import CourseContent from '../CourseContent/CourseContent';
import numberWithCommas from 'src/helper/formatNumber';
const cx = classNames.bind(styles);

const CourseInstructor = () => {
    const [course, setCourse] = useState(null);
    const { id } = useParams();
    let role = localStorage.getItem('role') ?? '';
    let active = localStorage.getItem('active') ?? '';

    useEffect(() => {
        const getCourse = async () => {
            let res;
            if (role == 'student' || role == 'instructor') {
                res = await repository.getCourseByUserOrInstructor(id);
            } else {
                res = await repository.courseById(id);
            }
            setCourse(res.data.data);
        }
        getCourse();
    }, [])

    const [isSearchActive, setSearchActive] = useState(false);

    const roleHeaders = {
        '': <HeaderKhach toggleSearch={() => setSearchActive(!isSearchActive)} />,
        null: <HeaderKhach toggleSearch={() => setSearchActive(!isSearchActive)} />,
        'student': <HeaderHv toggleSearch={() => setSearchActive(!isSearchActive)} />,
        'instructor': <HeaderGv />,
        'admin': <HeaderDkgv />
    };

    const displayHeader = () => {
        if (role === 'instructor' || role === 'student') {
            role = 'student'
        }
        if (active == 'student') {
            role = 'student'
        } else if (active == 'instructor') {
            role = 'instructor'
        } else {
            role = ''
        }
        return role;
    }

    return (
        <div>
            <div className={cx('header')}>
                {roleHeaders[displayHeader()]}
            </div>
            {isSearchActive && <Search onClose={() => setSearchActive(false)} />}
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
                            <div className={cx('danhgia1')}>
                                <div>
                                    <img src={Star} alt="" />
                                </div>
                                {course?.avg_rating > 0 && <p>{Math.round(course?.avg_rating * 10) / 10} ({course?.reviews?.length})</p>}
                                {course?.avg_rating == 0 && <p>Chưa có đánh giá</p>}
                            </div>
                            <div>
                                {course?.num_registration && <p>Số lượt đăng ký: <strong>{course?.num_registration}</strong> </p>}
                                {course?.level && <p>Mức độ: <strong>{course?.level}</strong></p>}
                            </div>
                            <div className={cx('author')}>
                                <div className={cx('avt')}>
                                    <img style={{ borderRadius: '50%', width: '100%', height: '100%' }} src={getImageFromBaseURL(course?.instructor.image)} alt="" />
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
                                <p>{numberWithCommas(course?.price || '')} VND</p>
                            </div>
                        </div>
                    </div>
                    <div className={cx('course-detail-img')}>
                        <img style={{ width: '100%', height: '100%' }} src={getImageFromBaseURL(course?.cover_image)} alt="" />
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
                    <CourseContent key={index} chapter={{ chapter, index }} status={course?.isRegistered} />
                ))}

                <div className={cx('danhgia')}>
                    <div className={cx('danhgia-head')}>
                        <h3>Đánh giá</h3>
                    </div>
                    <div className={cx('comment')}>
                        {course && course.reviews.map((review, index) => (
                            <div key={index}>
                                <div>
                                    <img style={{ width: '50px', borderRadius: '50%', height: '50px' }} src={getImageFromBaseURL(review.user.image)} alt="teacher" />
                                </div>
                                <div className={cx('comment-info-chitiet')}>
                                    <div className={cx('comment-info-chitiet-top')}>
                                        <div className={cx('comment-info-name')}>
                                            <div>{review.user.name}</div>
                                        </div>
                                        <div className={cx('comment-info-time')}>
                                            <div>{formatDate(review.user.updatedAt)}</div>
                                        </div>
                                        <Rating style={{ fontSize: '2rem' }} name="read-only" value={review.star} readOnly />
                                    </div>
                                    <div className={cx('comment-info-chitiet-nd')}>
                                        <div>{review.content}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>

    );
};

export default CourseInstructor;
