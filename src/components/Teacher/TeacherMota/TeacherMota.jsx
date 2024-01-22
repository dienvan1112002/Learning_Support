import React, { useState } from 'react';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import classNames from 'classnames/bind';
import styles from './TeacherMota.module.scss';
import star from '../../../assests/teacher/teacher-active/Star.png';
import ReactPaginate from 'react-paginate';
import repository from 'src/repositories/repository';
import getImageFromBaseURL from 'src/helper/get_image';

const cx = classNames.bind(styles);
const TeacherMota = ({ teacher }) => {
    const [value, setValue] = React.useState(1);
    const [comment, setComment] = useState('');
    const [currentReviewPage, setCurrentReviewPage] = useState(0);
    const reviewsPerPage = 5;
    const startReviewIndex = currentReviewPage * reviewsPerPage;
    const endReviewIndex = (currentReviewPage + 1) * reviewsPerPage;

    const displayedReviews = teacher?.reviews?.slice(startReviewIndex, endReviewIndex) || [];

    const handleReviewPageClick = ({ selected }) => {
        setCurrentReviewPage(selected);
    };

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

    const saveReview = async () => {
        try {
            const response = await repository.saveReviewInstructor(teacher._id, {
                content: comment,
                star: value
            });
            const newReview = response.data.data;

            teacher?.reviews.unshift(newReview)

            setComment('');
            setValue(1);

        } catch (error) {
            console.log(error);
        }
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
                {teacher?.hasReview && (
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
                )}
                <div className={cx('comment')}>
                    {displayedReviews.map((review, index) => (
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
                <ReactPaginate
                    pageCount={Math.ceil((teacher?.reviews?.length || 0) / reviewsPerPage)}
                    pageRangeDisplayed={5}
                    marginPagesDisplayed={2}
                    onPageChange={handleReviewPageClick}
                    containerClassName={'pagination-container'}
                    activeClassName={'active'}
                    previousLabel={'<'}
                    nextLabel={'>'}
                />
            </div>
        </div>
    );
};

export default TeacherMota;
