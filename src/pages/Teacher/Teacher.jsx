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

const cx = classNames.bind(styles);

const Teacher = () => {
    const role = localStorage.getItem('role') ?? '';
    const [listInstructors, setListInstructors] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 3;

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

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                {roleHeaders[role]}
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
