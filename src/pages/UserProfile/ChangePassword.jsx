import React, { useEffect, useState } from 'react';
import Sidebar from 'src/components/Sidebar/Sidebar';
import repository from 'src/repositories/repository';
import './index.css'

const ChangePassword = () => {
    const [user, setUser] = useState(null);
    const [formData, setFormData] = useState({
        new_password: '',
        old_password: '',
        rety_password: ''
    });

    useEffect(() => {
        const getUser = async () => {
            let res = await repository.getInfoUser();
            setUser(res.data.data)
        }
        getUser()
    }, [])

    const handleInputChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    const updatePassword = async () => {
        if (formData.new_password != formData.rety_password) {
            alert("Mật khẩu mới và nhập lại mật khẩu không khớp. Vui lòng thử lại.")
        }
        if (formData.new_password == formData.old_password) {
            alert("Mật khẩu mới phải khác mật khẩu cũ. Vui lòng thử lại.")
        }
        try {
            let res = await repository.updatePassword(formData);
            console.log(res);
            alert(res.data.message)
            window.location.reload();
        } catch (error) {
            console.log(error);
            alert(error.response.data.message)
        }
    }

    return (
        <div className='row' style={{ height: '100vh' }}>
            <div className='col-3' style={{ backgroundColor: '#7E9CDE' }}>
                <Sidebar user={user} />
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
                                <input type="text" class="form-control" name="old_password" placeholder="Nhập mật khẩu hiện tại"
                                    onChange={handleInputChange}
                                />
                                <i class="ri-eye-fill"></i>
                            </div>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Mật khẩu mới</label>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <input type="password" class="form-control" name="new_password" placeholder="Nhập mật khẩu mới"
                                    onChange={handleInputChange}
                                    onPaste={(e) => {
                                        e.preventDefault()
                                        return false;
                                    }} onCopy={(e) => {
                                        e.preventDefault()
                                        return false;
                                    }}
                                />
                                <i class="ri-eye-fill"></i>
                            </div>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Nhập lại mật khẩu  mới</label>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <input type="password" class="form-control" name="rety_password" placeholder="Nhập lại mật khẩu mới"
                                    onChange={handleInputChange}
                                    onPaste={(e) => {
                                        e.preventDefault()
                                        return false;
                                    }} onCopy={(e) => {
                                        e.preventDefault()
                                        return false;
                                    }}
                                />
                                <i class="ri-eye-fill"></i>
                            </div>
                        </div>
                        <button className='btn btn-save' style={{ margin: '50px 0 0 300px' }} onClick={updatePassword}>
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
