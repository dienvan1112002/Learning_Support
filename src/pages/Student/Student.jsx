import React from 'react';
import Footer from 'src/components/Footer/Footer';

import classNames from 'classnames/bind';
import roleHeaders from '../../utils/role';
import styles from './Student.module.scss';

const cx = classNames.bind(styles);
const Student = () => {
    const role = localStorage.getItem('role') ?? '';
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                {roleHeaders[role]}
            </div>
            <div style={{ padding: '50px', backgroundColor: '#F7F7F8' }}>
                <h1>Hoc vien cho xac nhan</h1>
                <div style={{ backgroundColor: '#fff', padding: '50px', margin: '25px' }}>
                    <div className='row'>
                        <div className="col-md-9">
                            <p>Phạm Hoàng Trung đã yêu cầu giảng dạy trực tuyến</p>
                            <p>Môn học: Toán</p>
                            <p>Mô tả: Em cần giảng dạy về bài toán hình học không gian mức độ vận dụng cao</p>
                            <p>Thời gian thuê : 60 phút</p>
                        </div>
                        <div className="col-md-3" style={{ display: 'flex', gap: '10px' }}>
                            <button style={{ height: '36px' }} type='button' className='btn btn-primary'>Chap nhan</button>
                            <button style={{ height: '36px' }} type='button' className='btn btn-primary'>Tu choi</button>
                        </div>
                    </div>
                </div>
                <div style={{ backgroundColor: '#fff', padding: '50px', margin: '25px' }}>
                    <div className='row'>
                        <div className="col-md-9">
                            <p>Phạm Hoàng Trung đã yêu cầu giảng dạy trực tuyến</p>
                            <p>Môn học: Toán</p>
                            <p>Mô tả: Em cần giảng dạy về bài toán hình học không gian mức độ vận dụng cao</p>
                            <p>Thời gian thuê : 60 phút</p>
                        </div>
                        <div className="col-md-3" style={{ display: 'flex', gap: '10px' }}>
                            <button style={{ height: '36px' }} type='button' className='btn btn-primary'>Chap nhan</button>
                            <button style={{ height: '36px' }} type='button' className='btn btn-primary'>Tu choi</button>
                        </div>
                    </div>
                </div>
                <div style={{ backgroundColor: '#fff', padding: '50px', margin: '25px' }}>
                    <div className='row'>
                        <div className="col-md-9">
                            <p>Phạm Hoàng Trung đã yêu cầu giảng dạy trực tuyến</p>
                            <p>Môn học: Toán</p>
                            <p>Mô tả: Em cần giảng dạy về bài toán hình học không gian mức độ vận dụng cao</p>
                            <p>Thời gian thuê : 60 phút</p>
                        </div>
                        <div className="col-md-3" style={{ display: 'flex', gap: '10px' }}>
                            <button style={{ height: '36px' }} type='button' className='btn btn-primary'>Chap nhan</button>
                            <button style={{ height: '36px' }} type='button' className='btn btn-primary'>Tu choi</button>
                        </div>
                    </div>
                </div>
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
            </div>
            <div className={cx('footer')}>
                <Footer />
            </div>
        </div>
    );
}

export default Student;
