import React, { useEffect, useState } from 'react';
import Footer from 'src/components/Footer/Footer';
import CourseHead from 'src/components/Course/CourseHead/CourseHead';
import Course from 'src/components/Course/Course';
import repository from 'src/repositories/repository';

import classNames from 'classnames/bind';
import styles from './Course.module.scss';
import ReactPaginate from 'react-paginate';
import CourseHeader from './CourseHeader';
import HeaderKhach from 'src/components/Header/HeaderKhach/Header';
import HeaderHv from 'src/components/Header/HeaderHv/HeaderHv';
import HeaderGv from 'src/components/Header/HeaderGv/HeaderGv';
import HeaderDkgv from 'src/components/Header/HeaderDkgv/HeaderDkgv';
import Search from 'src/components/Search/Search';

const cx = classNames.bind(styles);
const CourseP = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const [courses, setCourses] = useState(null);
    let role = localStorage.getItem('role') ?? '';
    let active = localStorage.getItem('active') ?? '';

    const itemsPerPage = 3;

    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };

    useEffect(() => {
        const getCourse = async () => {
            let res = await repository.listCourse();
            setCourses(res.data.data)
        }
        getCourse()
    }, [])


    const totalItems = courses?.length;

    const pageCount = Math.ceil(totalItems / itemsPerPage);

    const displayedItems = courses && courses.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

    const handleGetUrl = async (e) => {
        if (e === 'bookmarked') {
            const listCourse = await repository.getCourseBookmark();
            setCourses(listCourse.data.data)
        } else if (e === 'all') {
            const listCourse = await repository.listCourse();
            setCourses(listCourse.data.data)
        } else {
            const listCourse = await repository.getCourseWatching();
            setCourses(listCourse.data.data)
        }
    }

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
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                {roleHeaders[displayHeader()]}
            </div>
            {isSearchActive && <Search onClose={() => setSearchActive(false)} />}
            <div className={cx('body')}>
                {role == 'instructor' && <CourseHead />}
                {role != 'instructor' && <CourseHeader handleGetUrl={handleGetUrl} />}
                <div className={cx('course-item')}>
                    {displayedItems && displayedItems.map((course) => {
                        return <Course
                            key={course._id}
                            course={course}
                        />
                    })}
                </div>
                <ReactPaginate
                    pageCount={pageCount}
                    pageRangeDisplayed={5}
                    marginPagesDisplayed={2}
                    onPageChange={handlePageClick}
                    containerClassName={'pagination-container'}
                    activeClassName={'active'}
                    previousLabel={'<'}
                    nextLabel={'>'}
                />
            </div>
            <div className={cx('footer')}>
                <Footer />
            </div>
        </div>
    );
};

export default CourseP;
