import React, { useState } from 'react';
import Sidebar from 'src/components/Sidebar/Sidebar';
import './index.css';

const MainProfile = () => {
    return (
        <div className='row' style={{ height: '100vh' }}>
            <div className='col-3' style={{ backgroundColor: '#7E9CDE' }}>
                <Sidebar />
            </div>
            <div className='col-9'>
                <div className='content'>
                    <h1>Hồ sơ của tôi</h1>
                    <hr />
                    <div className='row' style={{ paddingTop: '50px' }}>
                        <div className="col-8">
                            <div>
                                <div class="mb-4 row">
                                    <label for="staticEmail" class="col-sm-4 col-form-label">Tên đăng nhập:</label>
                                    <div class="col-sm-8">
                                        <input type="text" readonly class="form-control-plaintext" id="username" value="email@example.com" />
                                    </div>
                                </div>
                                <div class="mb-4 row">
                                    <label class="col-sm-4 col-form-label">Họ và tên:</label>
                                    <div class="col-sm-8">
                                        <input type="text" class="form-control" id="name" />
                                    </div>
                                </div>
                                <div class="mb-4 row">
                                    <label class="col-sm-4 col-form-label">Email:</label>
                                    <div class="col-sm-8">
                                        <input type="text" class="form-control" id="email" />
                                    </div>
                                </div>
                                <button className='btn btn-save' style={{ margin: '50px 0 0 300px' }}>
                                    <div className='text-save'>
                                        Lưu
                                    </div>
                                </button>
                            </div>
                        </div>
                        <div className="col-4">
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center' }}>
                                <img
                                    style={{ width: '200px', height: '200px', borderRadius: '50%' }}
                                    src="https://cdn.24h.com.vn/upload/2-2023/images/2023-06-06/kim5_1-1686027959-673-width740height480.jpg"
                                    alt=""
                                />
                                <button className='btn btn-save'>
                                    <div className="text-save">
                                        Chọn ảnh
                                    </div>
                                </button>
                                <span>Dung lượng file tối đa 1 MB</span>
                                <span>Định dạng:.JPEG, .PNG</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default MainProfile;
