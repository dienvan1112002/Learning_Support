import React, { useEffect, useState } from 'react';
import Footer from 'src/components/Footer/Footer';
import { getFirestore, collection, onSnapshot } from 'firebase/firestore';

import classNames from 'classnames/bind';
import roleHeaders from '../../utils/role';
import styles from './Student.module.scss';
import repository from 'src/repositories/repository';
import formatDate from 'src/helper/formatDate';

const cx = classNames.bind(styles);
const Student = () => {
    const [data, setData] = useState([]);
    const [listApproved, setListApproved] = useState([]);
    const role = localStorage.getItem('role') ?? '';

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
                <h1>Hoc vien cho xac nhan</h1>
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
                                <button onClick={() => acceptConfirm(rentData._id)} style={{ height: '36px' }} type='button' className='btn btn-primary'>Chap nhan</button>
                                <button style={{ height: '36px' }} type='button' className='btn btn-primary'>Tu choi</button>
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
                <h1>Hoc vien da xac nhan</h1>
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
                                <button style={{ height: '36px' }} type='button' className='btn btn-primary'>Vao phong</button>
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
