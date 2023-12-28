import React, { useState } from 'react';
import classNames from 'classnames/bind';

const Info = () => {
    const [state, setState] = useState(false);
    return (
        <div style={{ backgroundColor: '#F7F7F8', padding: '50px 100px' }}>
            <div style={{ padding: '50px 100px 25px 100px', backgroundColor: '#fff' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h2>Thông tin hiển thị</h2>
                    <button style={{ padding: '10px 20px' }} type="button" class="btn btn-outline-secondary">Sửa thông tin</button>
                </div>
                <div style={{ padding: '50px' }}>
                    <div>
                        <h2 style={{ color: '#4360A8' }}>Môn học</h2>
                        <p style={{ paddingLeft: '10px' }}>Toán</p>
                        <p style={{ paddingLeft: '10px' }}>Vật lý</p>
                    </div>
                    <hr />
                    <div>
                        <h2 style={{ color: '#4360A8' }}>Chứng chỉ</h2>
                        <p style={{ paddingLeft: '10px' }}>Chứng chỉ thiết kế hệ thống</p>
                        <p style={{ paddingLeft: '10px' }}>Chứng chỉ tin học loại B</p>
                    </div>
                    <hr />
                    <div>
                        <h2 style={{ color: '#4360A8' }}>Trình độ học vấn</h2>
                        <p style={{ paddingLeft: '10px' }}>Sinh viên năm 4 KMA, GPA 3.9</p>
                    </div>
                    <hr />
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h2 style={{ color: '#4360A8', fontWeight: 700 }}>Chế độ online</h2>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <span>On/off</span>
                            <div onClick={() => setState(!state)}
                                className={classNames('flex w-20 h-10 m-10 bg-gray-600 rounded-full transition-all duration-500', {
                                    'bg-green-500': state,
                                })}
                            >
                                <span
                                    className={classNames('h-10 w-10 bg-white rounded-full transition-all duration-500', {
                                        'ml-10': state,
                                    })}
                                />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Info;