import React, { useEffect, useState } from 'react';
import Sidebar from 'src/components/Sidebar/Sidebar';
import repository from 'src/repositories/repository';
import './index.css'

const ChangePassword = () => {
    const [user, setUser] = useState(null);
    const [formData, setFormData] = useState({
        new_password: '',
        old_password: '',
        retry_password: ''
    });
    const [passwordVisibility, setPasswordVisibility] = useState({
        new_password: false,
        old_password: false,
        retry_password: false
    });
    const [errorMessage, setErrorMessage] = useState('');

    const togglePasswordVisibility = (field) => {
        setPasswordVisibility({
            ...passwordVisibility,
            [field]: !passwordVisibility[field]
        });
    };

    useEffect(() => {
        const getUser = async () => {
            try {
                let res = await repository.getInfoUser();
                setUser(res.data.data);
            } catch (error) {
                console.log(error);
            }
        };
        getUser();
    }, []);

    const handleInputChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    const updatePassword = async () => {
        if (formData.new_password !== formData.retry_password) {
            setErrorMessage("Mật khẩu mới và nhập lại mật khẩu không khớp. Vui lòng thử lại.");
            return;
        }
        if (formData.new_password === formData.old_password) {
            setErrorMessage("Mật khẩu mới phải khác mật khẩu cũ. Vui lòng thử lại.");
            return;
        }

        try {
            let res = await repository.updatePassword(formData);
            setPasswordVisibility({
                new_password: false,
                old_password: false,
                retry_password: false
            });
            console.log(res);
            setErrorMessage(res.data.message);
            window.location.reload();
        } catch (error) {
            console.log(error);
            setErrorMessage(error.response.data.message);
        }
    };

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
                                <input type={passwordVisibility.old_password ? 'text' : 'password'} style={{ fontSize: '1.5rem' }} class="form-control" name="old_password" placeholder="Nhập mật khẩu hiện tại"
                                    onChange={handleInputChange}
                                />
                                <i
                                    className={`ri-eye-${passwordVisibility.old_password ? 'off-fill' : 'fill'}`}
                                    onClick={() => togglePasswordVisibility('old_password')}
                                ></i>
                            </div>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Mật khẩu mới</label>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <input type={passwordVisibility.new_password ? 'text' : 'password'} style={{ fontSize: '1.5rem' }} class="form-control" name="new_password" placeholder="Nhập mật khẩu mới"
                                    onChange={handleInputChange}
                                    onPaste={(e) => {
                                        e.preventDefault()
                                        return false;
                                    }} onCopy={(e) => {
                                        e.preventDefault()
                                        return false;
                                    }}
                                />
                                <i
                                    className={`ri-eye-${passwordVisibility.new_password ? 'off-fill' : 'fill'}`}
                                    onClick={() => togglePasswordVisibility('new_password')}
                                ></i>
                            </div>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Nhập lại mật khẩu  mới</label>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <input type={passwordVisibility.retry_password ? 'text' : 'password'} style={{ fontSize: '1.5rem' }} class="form-control" name="retry_password" placeholder="Nhập lại mật khẩu mới"
                                    onChange={handleInputChange}
                                    onPaste={(e) => {
                                        e.preventDefault()
                                        return false;
                                    }} onCopy={(e) => {
                                        e.preventDefault()
                                        return false;
                                    }}
                                />
                                <i
                                    className={`ri-eye-${passwordVisibility.retry_password ? 'off-fill' : 'fill'}`}
                                    onClick={() => togglePasswordVisibility('retry_password')}
                                ></i>
                            </div>
                        </div>
                        <div style={{ color: 'red' }}>{errorMessage}</div>
                        <button className="btn btn-save" style={{ margin: '50px 0 0 300px' }} onClick={updatePassword}>
                            <div className="text-save">Đổi mật khẩu</div>
                        </button>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default ChangePassword;
