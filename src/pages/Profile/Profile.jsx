import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames/bind';
import HeaderGv from 'src/components/Header/HeaderGv/HeaderGv';
import styles from './Profile.module.scss';
import Footer from 'src/components/Footer/Footer';
import Info from 'src/components/Info/info';
import repository from 'src/repositories/repository';
import useApi from 'src/utils/useApi';

const cx = classNames.bind(styles);

const Profile = () => {
    const { id } = useParams();

    const apiFunc = () => repository.teacherInfo(id);

    const { result, error } = useApi(apiFunc);

    if (result?.status === "success") {
        var teacher = result.data;
        console.log("teacher == ", teacher);
    }

    return (
        <div>
            <HeaderGv />
            <div style={{ background: '#7E9CDE' }}>
                <div className='row' style={{ padding: '50px 250px' }}>
                    <div className='card'>
                        <div className='card-body' style={{ display: 'flex', padding: '50px' }}>
                            <div className="col-md-8">
                                <div className='row' style={{ display: 'flex', padding: '10px' }}>
                                    <div style={{ fontStyle: 'bold', fontWeight: 700 }} className='col-md-4'>Tên:</div>
                                    <div className='col-md-8'>Thu Thảo</div>
                                </div>
                                <div className='row' style={{ display: 'flex', padding: '10px' }}>
                                    <div style={{ fontStyle: 'bold', fontWeight: 700 }} className='col-md-4'>Giá thuê:</div>
                                    <div className='col-md-8'>100000 đ/h</div>
                                </div>
                                <div className='row' style={{ display: 'flex', padding: '10px' }}>
                                    <div style={{ fontStyle: 'bold', fontWeight: 700 }} className='col-md-4'>Mô tả:</div>
                                    <div className='col-md-8'>Nhận dạy tất cả các môn khoa học tự nhiên</div>
                                </div>
                                <div style={{ paddingTop: '60px', paddingLeft: '180px' }}>
                                    <button type="button" class="btn btn-primary">Lưu</button>
                                </div>
                            </div>
                            <div className="col-md-4" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
                                <img style={{ width: '200px', height: '200px', borderRadius: '50%' }} src="https://i.pinimg.com/564x/c1/9a/1d/c19a1d3823b60a19194fe700f0524ae6.jpg" alt="" />
                                <button type="button" class="btn btn-primary">Chọn ảnh</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Info />
            <div>
                <Footer />
            </div>
        </div >
    );
};

export default Profile;
