import React, { useEffect, useState } from 'react';
import Footer from 'src/components/Footer/Footer';
import { getFirestore, collection, getDocs, onSnapshot } from 'firebase/firestore';

import classNames from 'classnames/bind';
import roleHeaders from '../../utils/role';
import styles from './Student.module.scss';
import repository from 'src/repositories/repository';

const cx = classNames.bind(styles);
const Student = () => {
    const [initialData, setInitialData] = useState([]);
    const [realtimeData, setRealtimeData] = useState([]);
    const role = localStorage.getItem('role') ?? '';

    const fetchInitialData = async () => {
        try {
            const apiData = await repository.studentWaitForConfirmation();
            setInitialData(apiData.data.data);
        } catch (error) {
            console.error('Error fetching initial data:', error);
        }
    };

    const handleFirestoreUpdates = () => {
        const db = getFirestore();
        const rentsCollection = collection(db, 'rents');

        const unsubscribe = onSnapshot(rentsCollection, (snapshot) => {
            snapshot.docChanges().forEach((change) => {
                if (change.type === 'added') {
                    setRealtimeData((prevData) => [...prevData, change.doc.data()]);
                }
            });
        });

        return () => unsubscribe();
    };

    useEffect(() => {
        fetchInitialData();

        const unsubscribeFirestore = handleFirestoreUpdates();

        return () => {
            unsubscribeFirestore();
        };
    }, []);

    const combinedData = [...initialData, ...realtimeData];

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                {roleHeaders[role]}
            </div>
            <div style={{ padding: '50px', backgroundColor: '#F7F7F8' }}>
                <h1>Hoc vien cho xac nhan</h1>
                {combinedData.map((rentData, index) => (
                    <div key={index} style={{ backgroundColor: '#fff', padding: '50px', margin: '25px' }}>
                        <div className='row'>
                            <div className="col-md-9">
                                <p>{rentData.instructor} đã yêu cầu giảng dạy trực tuyến</p>
                                <p>Môn học: {rentData.subject}</p>
                                <p>Mô tả: {rentData.desc}</p>
                                <p>Thời gian thuê: {rentData.time} giờ</p>
                            </div>
                            <div className="col-md-3" style={{ display: 'flex', gap: '10px' }}>
                                <button style={{ height: '36px' }} type='button' className='btn btn-primary'>Chap nhan</button>
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
                <div style={{ backgroundColor: '#fff', padding: '50px', margin: '25px' }}>
                    <div className='row'>
                        <div className="col-md-10">
                            <p>Phạm Hoàng Trung đã yêu cầu giảng dạy trực tuyến</p>
                            <p>Môn học: Toán</p>
                            <p>Mô tả: Em cần giảng dạy về bài toán hình học không gian mức độ vận dụng cao</p>
                            <p>Thời gian thuê : 60 phút</p>
                        </div>
                        <div className="col-md-2" style={{ display: 'flex', gap: '10px' }}>
                            <button style={{ height: '36px' }} type='button' className='btn btn-primary'>Vao phong</button>
                        </div>
                    </div>
                </div>
                <div style={{ backgroundColor: '#fff', padding: '50px', margin: '25px' }}>
                    <div className='row'>
                        <div className="col-md-10">
                            <p>Phạm Hoàng Trung đã yêu cầu giảng dạy trực tuyến</p>
                            <p>Môn học: Toán</p>
                            <p>Mô tả: Em cần giảng dạy về bài toán hình học không gian mức độ vận dụng cao</p>
                            <p>Thời gian thuê : 60 phút</p>
                        </div>
                        <div className="col-md-2" style={{ display: 'flex', gap: '10px' }}>
                            <button style={{ height: '36px' }} type='button' className='btn btn-primary'>Vao phong</button>
                        </div>
                    </div>
                </div>
                <div style={{ backgroundColor: '#fff', padding: '50px', margin: '25px' }}>
                    <div className='row'>
                        <div className="col-md-10">
                            <p>Phạm Hoàng Trung đã yêu cầu giảng dạy trực tuyến</p>
                            <p>Môn học: Toán</p>
                            <p>Mô tả: Em cần giảng dạy về bài toán hình học không gian mức độ vận dụng cao</p>
                            <p>Thời gian thuê : 60 phút</p>
                        </div>
                        <div className="col-md-2" style={{ display: 'flex', gap: '10px' }}>
                            <button style={{ height: '36px' }} type='button' className='btn btn-primary'>Vao phong</button>
                        </div>
                    </div>
                </div>
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
