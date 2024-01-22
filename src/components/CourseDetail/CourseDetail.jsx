import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import styles from './CourseDetail.module.scss';
import Star from '../../assests/teacher/teacher-active/Star.png';
import { useNavigate, useParams } from 'react-router-dom';
import repository from 'src/repositories/repository';
import CourseContent from './CourseContent/CourseContent';
import formatDate from 'src/helper/formatDate';
import getImageFromBaseURL from 'src/helper/get_image';
import HeaderKhach from '../Header/HeaderKhach/Header';
import HeaderHv from '../Header/HeaderHv/HeaderHv';
import HeaderGv from '../Header/HeaderGv/HeaderGv';
import HeaderDkgv from '../Header/HeaderDkgv/HeaderDkgv';
import Search from '../Search/Search';
const cx = classNames.bind(styles);

const CourseDetail = () => {
    const navigate = useNavigate();
    const [course, setCourse] = useState(null);
    const { id } = useParams();
    let role = localStorage.getItem('role') ?? '';
    let active = localStorage.getItem('active') ?? 'student';
    const [value, setValue] = React.useState(1);
    const [comment, setComment] = useState('');

    const updateBookmark = async () => {
        if (role != 'student' && role != 'instructor') {
            navigate('/login');
            return;
        }
        const res = await repository.updateBookmark(id);
        if (res.data.status === 'success') {
            window.location.reload();
        }
    }

    const redicrectBuyCourse = () => {
        if (role != 'student' && role != 'instructor') {
            navigate('/login');
            return;
        }
        navigate(`/user/course/${id}/buy`);
    }

    const redirectContinueLearn = () => {
        if (role != 'student' && role != 'instructor') {
            navigate('/login');
            return;
        }
        navigate(`/user/course/${id}/learn`);
    }

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

    const saveReview = async () => {
        try {
            const response = await repository.saveReviewCourse(course._id, {
                content: comment,
                star: value
            });
            const newReview = response.data.data;

            setCourse((prevCourse) => ({
                ...prevCourse,
                reviews: [...prevCourse.reviews, newReview],
            }));

            setComment('');
            setValue(1);

        } catch (error) {
            console.log(error);
        }
    };

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
        } else {
            role = 'instructor'
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
                            <div className={cx('author')}>
                                <div className={cx('avt')}>
                                    <img src={getImageFromBaseURL(course?.instructor.image)} alt="" />
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
                                            <button onClick={() => redicrectBuyCourse()}>Mua khóa học</button>
                                        ) : (
                                            <button onClick={() => redirectContinueLearn()}>Tiêp tục khóa học</button>
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
                                    <i class="ri-bookmark-fill"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={cx('course-detail-img')}>
                        <img src={getImageFromBaseURL(course?.cover_image)} alt="" />
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
                    {
                        !course?.hasReview && (
                            <div>
                                <h3>Vui lòng thêm comment cho bài giảng</h3>
                                <textarea name="comment" id="comment" cols="160" rows="8" onChange={(e) => setComment(e.target.value)}></textarea>
                                <Box
                                    sx={{
                                        '& > legend': { mt: 2 },
                                    }}
                                >
                                    <Rating
                                        name="simple-controlled"
                                        value={value}
                                        style={{ fontSize: '2rem' }}
                                        onChange={(event, newValue) => {
                                            setValue(newValue);
                                        }}
                                    />
                                </Box>
                                <button onClick={saveReview} style={{ padding: '10px 20px', fontSize: '11.25px', height: '36px' }} className='btn btn-primary'>Đánh giá</button>
                            </div>
                        )
                    }

                    <div className={cx('comment')}>
                        {course && course.reviews.map((review, index) => (
                            <div key={index}>
                                <div>
                                    <img style={{ width: '50px', borderRadius: '50%' }} src={getImageFromBaseURL(review.user.image)} alt="teacher" />
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

export default CourseDetail;
