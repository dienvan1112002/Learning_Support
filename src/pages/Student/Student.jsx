import React, { useEffect, useState } from 'react';
import Footer from 'src/components/Footer/Footer';
import { getFirestore, collection, onSnapshot } from 'firebase/firestore';

import classNames from 'classnames/bind';
import styles from './Student.module.scss';
import repository from 'src/repositories/repository';
import formatDate from 'src/helper/formatDate';
import HeaderKhach from 'src/components/Header/HeaderKhach/Header';
import HeaderHv from 'src/components/Header/HeaderHv/HeaderHv';
import HeaderGv from 'src/components/Header/HeaderGv/HeaderGv';
import HeaderDkgv from 'src/components/Header/HeaderDkgv/HeaderDkgv';

const cx = classNames.bind(styles);
const Student = () => {
    const [data, setData] = useState([]);
    const [listApproved, setListApproved] = useState([]);
    let role = localStorage.getItem('role') ?? '';
    const active = localStorage.getItem('active') ?? 'student';
    const [isSearchActive, setSearchActive] = useState(false);

    const roleHeaders = {
        '': <HeaderKhach toggleSearch={() => setSearchActive(!isSearchActive)} />,
        null: <HeaderKhach toggleSearch={() => setSearchActive(!isSearchActive)} />,
        'student': <HeaderHv toggleSearch={() => setSearchActive(!isSearchActive)} />,
        'instructor': <HeaderGv />,
        'admin': <HeaderDkgv />
    };

    if (active == 'student') {
        role = 'student'
    } else {
        role = 'instructor'
    }

    const fetchDataFromDatabase = async () => {
        try {
            const apiData = await repository.studentWaitForConfirmation('waiting');
            setData(apiData.data.data);
        } catch (error) {
            console.error('Error fetching data from database:', error);
        }
    };

    const fetchApproved = async () => {
        try {
            const apiData = await repository.studentWaitForConfirmation('approve');
            setListApproved(apiData.data.data);
        } catch (error) {
            console.error('Error fetching data from database:', error);
        }
    }

    const handleFirestoreUpdates = () => {
        const db = getFirestore();
        const rentsCollection = collection(db, 'rents');

        const unsubscribe = onSnapshot(rentsCollection, (snapshot) => {
            try {
                snapshot.docChanges().forEach((change) => {
                    if (change.type == 'added') {
                        const newData = change.doc.data();
                        setData((prevData) => {
                            const isDataAlreadyExists = prevData.some(item => item.user._id === newData.user._id && item.instructor === newData.instructor);
                            if (!isDataAlreadyExists) {
                                return [...prevData, newData];
                            } else {
                                return prevData;
                            }
                        });
                    }
                });
            } catch (error) {
                console.error('Error in handleFirestoreUpdates:', error);
            }
        });

        return () => unsubscribe();
    };

    useEffect(() => {
        fetchDataFromDatabase();
        fetchApproved();
    }, []);

    useEffect(() => {
        const unsubscribeFirestore = handleFirestoreUpdates();

        return () => {
            unsubscribeFirestore();
        };
    }, []);

    const acceptConfirm = (id) => {
        console.log("id == ", id);
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                {roleHeaders[role]}
            </div>
            <div style={{ padding: '50px', backgroundColor: '#F7F7F8' }}>
                <h1>Học viên chờ xác nhận</h1>
                {data.map((rentData, index) => (
                    <div key={index} style={{ backgroundColor: '#fff', padding: '50px', margin: '25px' }}>
                        <div className='row'>
                            <div className="col-md-9">
                                <p>{rentData.user.name} đã yêu cầu giảng dạy trực tuyến</p>
                                <p>Môn học: {rentData.subject}</p>
                                <p>Mô tả: {rentData.description}</p>
                                <p>Thời gian thuê: {rentData.time} giờ</p>
                                <p>Thời gian bắt đầu: {formatDate(rentData.timeStart)} </p>
                            </div>
                            <div className="col-md-3" style={{ display: 'flex', gap: '10px' }}>
                                <button onClick={() => acceptConfirm(rentData._id)} style={{ height: '36px' }} type='button' className='btn btn-primary'>Chấp nhận</button>
                                <button style={{ height: '36px' }} type='button' className='btn btn-primary'>Từ chối</button>
                            </div>
                        </div>
                    </div>
                ))}
                <nav aria-label="Page navigation example">
                    <ul className="pagination justify-content-center">
                        <li className="page-item disabled">
                            <a className="page-link" href="#" tabIndex="-1" aria-disabled="true">Previous</a>
                        </li>
                        <li className="page-item"><a className="page-link" href="#">1</a></li>
                        <li className="page-item"><a className="page-link" href="#">2</a></li>
                        <li className="page-item"><a className="page-link" href="#">3</a></li>
                        <li className="page-item">
                            <a className="page-link" href="#">Next</a>
                        </li>
                    </ul>
                </nav>
            </div>

            <br />
            <div style={{ padding: '50px', backgroundColor: '#F7F7F8' }}>
                <h1>Học viên đã xác nhận</h1>
                {listApproved.map((rentData, index) => (
                    <div key={index} style={{ backgroundColor: '#fff', padding: '50px', margin: '25px' }}>
                        <div className='row'>
                            <div className="col-md-9">
                                <p>{rentData.user.name} đã yêu cầu giảng dạy trực tuyến</p>
                                <p>Môn học: {rentData.subject}</p>
                                <p>Mô tả: {rentData.description}</p>
                                <p>Thời gian thuê: {rentData.time} giờ</p>
                                <p>Thời gian bắt đầu: {formatDate(rentData.timeStart)} </p>
                            </div>
                            <div className="col-md-2" style={{ display: 'flex', gap: '10px' }}>
                                <button style={{ height: '36px' }} type='button' className='btn btn-primary'>Vào phòng</button>
                            </div>
                        </div>
                    </div>
                ))}
                <nav aria-label="Page navigation example">
                    <ul className="pagination justify-content-center">
                        <li className="page-item disabled">
                            <a className="page-link" href="#" tabIndex="-1" aria-disabled="true">Previous</a>
                        </li>
                        <li className="page-item"><a className="page-link" href="#">1</a></li>
                        <li className="page-item"><a className="page-link" href="#">2</a></li>
                        <li className="page-item"><a className="page-link" href="#">3</a></li>
                        <li className="page-item">
                            <a className="page-link" href="#">Next</a>
                        </li>
                    </ul>
                </nav>
            </div>

            <div className={cx('footer')}>
                <Footer />
            </div>
        </div>
    );
}

export default Student;
