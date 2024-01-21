import React from 'react';
import styles from './Course.module.scss';
import classNames from 'classnames/bind';
import no_img from '../../assests/sourse/no_img.jpg';
import daysFromNow from 'src/helper/function';
import getImageFromBaseURL from 'src/helper/get_image.js';
import { useNavigate } from 'react-router-dom';
import repository from 'src/repositories/repository';

const cx = classNames.bind(styles);
const Course = ({ course }) => {
    const navigate = useNavigate();
    const role = localStorage.getItem('role')

    const showCourse = (id) => {
        navigate(`/course/${id}`);
    }

    const deleteCourse = async (id) => {
        try {
            const userConfirmed = window.confirm("Bạn có chắc muốn xóa khóa học này chứ?");

            if (userConfirmed) {
                await repository.deleteCourse(id);
                window.location.reload();
            } else {
                console.log("Deletion canceled by user.");
            }
        } catch (error) {
            console.error("Error deleting course:", error);
        }
    };

    return (
        <div className="flex justify-center items-center">
            <div className={cx('course-wrapper')}>
                <div className={cx('course-top')}>
                    <div className={cx('course-info')}>
                        <h2>{course.title}</h2>
                        <p>
                            {course.description}
                        </p>
                    </div>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <button className={cx('btn-primary-no-bs')} onClick={() => showCourse(course._id)}>Xem khóa học</button>
                        {role === 'instructor' && <button onClick={() => deleteCourse(course._id)} style={{ fontWeight: 700, fontSize: '11.25px' }} type="button" className="btn btn-danger">Xóa</button>}
                    </div>
                </div>
                <div className={cx('course-img')}>
                    {course.thumbnails && course.thumbnails.map((thumbnail) => {
                        return <div key={thumbnail}>
                            <img
                                src={getImageFromBaseURL(thumbnail)}
                                alt="122"
                                onError={((e) => {
                                    e.target.onerror = null;
                                    e.target.src = no_img;
                                })}
                                style={{ width: '317px', height: '238px' }}
                            />
                        </div>
                    })}
                </div>
                <div className={cx('course-bottom')}>
                    <div className={cx('course-bottom-level')}>
                        <div className={cx('course-bottom-box')}>
                            <p>Được cập nhật cách đây {daysFromNow(course.updatedAt)} ngày</p>
                        </div>
                        {/* <div className={cx('course-bottom-box')}>
                            <p>{course.level[0]}</p>
                        </div> */}
                    </div>
                    <div className={cx('course-bottom-author')}>
                        <p>{course.instructor.name}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Course;
