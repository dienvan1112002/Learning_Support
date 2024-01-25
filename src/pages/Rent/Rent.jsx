import React, { useEffect, useState } from 'react';
import Footer from 'src/components/Footer/Footer';
import { getFirestore, collection, onSnapshot, getDocs, query, where, doc, updateDoc } from 'firebase/firestore';
import classNames from 'classnames/bind';
import styles from './Rent.module.scss';
import repository from 'src/repositories/repository';
import formatDate from 'src/helper/formatDate';
import HeaderKhach from 'src/components/Header/HeaderKhach/Header';
import HeaderHv from 'src/components/Header/HeaderHv/HeaderHv';
import HeaderGv from 'src/components/Header/HeaderGv/HeaderGv';
import HeaderDkgv from 'src/components/Header/HeaderDkgv/HeaderDkgv';
import numberWithCommas from 'src/helper/formatNumber';
import Search from 'src/components/Search/Search';

const cx = classNames.bind(styles);
const Rent = () => {
    const [data, setData] = useState([]);
    const [listApproved, setListApproved] = useState([]);
    let role = localStorage.getItem('role') ?? '';
    const active = localStorage.getItem('active') ?? '';
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

    const fetchDataFromDatabase = async () => {
        try {
            const apiData = await repository.getListRentByUser('waiting');
            setData(apiData.data.data);
        } catch (error) {
            console.error('Error fetching data from database:', error);
        }
    };

    const fetchApproved = async () => {
        try {
            const apiData = await repository.getListRentByUser('approve');
            setListApproved(apiData.data.data);
        } catch (error) {
            console.error('Error fetching data from database:', error);
        }
    }

    const handleFirestoreUpdates = () => {
        const db = getFirestore();
        const rentsCollection = collection(db, 'rents')

        const unsubscribe = onSnapshot(rentsCollection, (snapshot) => {
            try {
                snapshot.docChanges().forEach((change) => {
                    if (change.type == 'added') {
                        const newData = change.doc.data();
                        setData((prevData) => {
                            const isDataAlreadyExists = prevData.some(item => item.user._id === newData.user._id && item.instructor === newData.instructor);
                            if (!isDataAlreadyExists && newData.instructor == localStorage.getItem('userId') && newData.status == 'waiting') {
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

    const rejectConfirm = async (id) => {
        const db = getFirestore();
        const rentsCollection = collection(db, 'rents');

        try {
            await repository.cancelRentByUser(id);
            const q = query(rentsCollection, where('_id', '==', id));
            const querySnapshot = await getDocs(q);

            const updates = querySnapshot.docs.map((doc) => updateDoc(doc.ref, { status: 'rejected' }));
            await Promise.all(updates);

            console.log('Status updated successfully.');
        } catch (error) {
            console.error('Error updating status:', error);
        }

        window.location.reload();
    };

    const redirectRoom = (id) => {
        window.open(`https://topaz-nine-sunstone.glitch.me/?room=${id}`, "_blank");
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                {roleHeaders[displayHeader()]}
            </div>
            {isSearchActive && <Search onClose={() => setSearchActive(false)} />}
            <div style={{ padding: '50px', backgroundColor: '#F7F7F8' }}>
                <h1>Đơn chờ xác nhận</h1>
                {data.map((rentData, index) => (
                    <div key={index} style={{ backgroundColor: '#fff', padding: '50px', margin: '25px' }}>
                        <div className='row'>
                            <div className="col-md-9">
                                <p>Giảng viên: {rentData.instructor.user.name}</p>
                                <p>Môn học: {rentData.subject}</p>
                                <p>Mô tả: {rentData.description}</p>
                                <p>Thời gian thuê: {rentData.time} giờ</p>
                                <p>Giá: {numberWithCommas(rentData.price)}</p>
                                <p>Thời gian bắt đầu: {formatDate(rentData.timeStart)} </p>
                            </div>
                            <div className="col-md-3" style={{ display: 'flex', gap: '10px' }}>
                                <button onClick={() => rejectConfirm(rentData._id)} className={`${cx('button-action')} btn btn-primary`} type='button'>Hủy</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <br />
            <div style={{ padding: '50px', backgroundColor: '#F7F7F8' }}>
                <h1>Đơn đã xác nhận</h1>
                {listApproved.map((rentData, index) => (
                    <div key={index} style={{ backgroundColor: '#fff', padding: '50px', margin: '25px' }}>
                        <div className='row'>
                            <div className="col-md-9">
                                <p>Giảng viên: {rentData.instructor.user.name}</p>
                                <p>Môn học: {rentData.subject}</p>
                                <p>Mô tả: {rentData.description}</p>
                                <p>Thời gian thuê: {rentData.time} giờ</p>
                                <p>Giá: {numberWithCommas(rentData.price)}</p>
                                <p>Thời gian bắt đầu: {formatDate(rentData.timeStart)} </p>
                            </div>
                            <div className="col-md-2" style={{ display: 'flex', gap: '10px' }}>
                                <button className={`${cx('button-action')} btn btn-primary`}
                                    onClick={() => redirectRoom(rentData.roomId)} type='button'>Vào phòng</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className={cx('footer')}>
                <Footer />
            </div>
        </div>
    );
}

export default Rent;
