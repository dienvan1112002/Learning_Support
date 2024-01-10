import React from 'react';
import Sidebar from 'src/components/Sidebar/Sidebar';
import './index.css'

const ChangePassword = () => {
    return (
        <div className='row' style={{ height: '100vh' }}>
            <div className='col-3' style={{ backgroundColor: '#7E9CDE' }}>
                <Sidebar />
            </div>
            <div className='col-9'>
                <div className='content'>
                    <h1>Đổi mật khẩu</h1>
                    <p>Mật khẩu của bạn phải có ít nhất 6 ký tự, bao gồm cả chữ số, chữ cái và ký tự đặc biệt (!$@%)</p>
                    <hr />
                    <div style={{ width: '70%', paddingTop: '40px' }}>
                        <div class="mb-3">
                            <label class="form-label">Mật khẩu hiện tại</label>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <input type="email" class="form-control" id="curPass" placeholder="Nhập mật khẩu hiện tại" />
                                <i class="ri-eye-fill"></i>
                            </div>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Mật khẩu mới</label>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <input type="email" class="form-control" id="newPass" placeholder="Nhập mật khẩu mới" />
                                <i class="ri-eye-fill"></i>
                            </div>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Nhập lại mật khẩu  mới</label>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <input type="email" class="form-control" id="retryNewPass" placeholder="Nhập lại mật khẩu mới" />
                                <i class="ri-eye-fill"></i>
                            </div>
                        </div>
                        <button className='btn btn-save' style={{ margin: '50px 0 0 300px' }}>
                            <div className='text-save'>
                                Đổi mật khẩu
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default ChangePassword;
