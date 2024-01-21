import React, { useEffect, useState } from 'react';

import classNames from 'classnames/bind';
import styles from './Teacher.module.scss';
import repository from 'src/repositories/repository';

import Footer from 'src/components/Footer/Footer';
import TeacherHeader from 'src/components/TeacherItems/TeacherHeader/TeacherHeader';
import TeacherItems from 'src/components/TeacherItems/TeacherItems';
import roleHeaders from 'src/utils/role';
import ReactPaginate from 'react-paginate';
import './pagination.css'
import HeaderKhach from 'src/components/Header/HeaderKhach/Header';
import HeaderHv from 'src/components/Header/HeaderHv/HeaderHv';
import HeaderGv from 'src/components/Header/HeaderGv/HeaderGv';
import HeaderDkgv from 'src/components/Header/HeaderDkgv/HeaderDkgv';

const cx = classNames.bind(styles);

const Teacher = () => {
    let role = localStorage.getItem('role') ?? '';
    let active = localStorage.getItem('active');
    const [listInstructors, setListInstructors] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [isSearchActive, setSearchActive] = useState(false);

    const itemsPerPage = 9;

    const totalItems = listInstructors.length;

    const pageCount = Math.ceil(totalItems / itemsPerPage);

    const displayedItems = listInstructors.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };

    useEffect(() => {
        const getListTeacher = async () => {
            const listTeacher = await repository.listAllTeacher();
            setListInstructors(listTeacher.data.data)
        }
        getListTeacher()
    }, [])

    const handleGetUrl = async (e) => {
        if (e === 'new') {
            const listTeacher = await repository.listNewTeacher();
            setListInstructors(listTeacher.data.data)
        } else if (e === 'all') {
            const listTeacher = await repository.listAllTeacher();
            setListInstructors(listTeacher.data.data)
        } else {
            const listTeacher = await repository.listAllTeacher(true);
            setListInstructors(listTeacher.data.data)
        }
    }

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
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                {roleHeaders[displayHeader()]}
            </div>
            <div className={cx('body')}>
                <div className={cx('teacher-head')}>
                    <TeacherHeader handleGetUrl={handleGetUrl} />
                </div>
                <div className={cx('container-item')}>
                    {displayedItems.map((ins) => (
                        <TeacherItems key={ins.id} ins={ins} />
                    ))}
                </div>
                <div className={cx('phan-trang')}>
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
            </div>
            <div className={cx('footer')}>
                <Footer />
            </div>
        </div>
    );
};

export default Teacher;
