import React from 'react';
import Sidebar from 'src/components/Sidebar/Sidebar';
import './index.css'

const NotiSetting = () => {
    return (
        <div className='row' style={{ height: '100vh' }}>
            <div className='col-3' style={{ backgroundColor: '#7E9CDE' }}>
                <Sidebar />
            </div>
            <div className='col-9'>
                <div className='content'>
                    <h1>Cài đặt thông báo</h1>
                    <hr />
                    <div style={{ marginTop: '40px' }}>
                        <div className="row mb-3">
                            <div className="col-9">
                                <p className='title-noti'>Thông báo email</p>
                            </div>
                            <div className="col-3">
                                <input className='' type="checkbox" name="" id="" />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-9">
                                <p className='title-noti'>Cap nhat khoa hoc</p>
                                <p className='content-noti'>Thông báo khi có cập nhật về khóa học của tôi, bao gồm cả việc cập nhật thanh toán.</p>
                            </div>
                            <div className="col-3">
                                <input className='' type="checkbox" name="" id="" />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-9">
                                <p className='title-noti'>Bản tin</p>
                                <p className='content-noti'>Gửi tôi thông tin xu hướng, chương trình khuyến mãi & cập nhật mới nhất.</p>
                            </div>
                            <div className="col-3">
                                <input className='' type="checkbox" name="" id="" />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-9">
                                <p className='title-noti'>Nội dung cá nhân</p>
                                <p className='content-noti'>Gửi tôi cập nhật cá nhân (ví dụ: quà sinh nhật)</p>
                            </div>
                            <div className="col-3">
                                <input className='' type="checkbox" name="" id="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default NotiSetting;
