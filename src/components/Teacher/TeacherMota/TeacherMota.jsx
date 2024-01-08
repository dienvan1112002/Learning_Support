import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './TeacherMota.module.scss';
import star from '../../../assests/teacher/teacher-active/Star.png';
import ReactPaginate from 'react-paginate';

const cx = classNames.bind(styles);
const TeacherMota = ({ teacher }) => {
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
                    {displayedReviews.map((review, index) => (
                        <div key={index}>
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
