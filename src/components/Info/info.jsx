import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import repository from 'src/repositories/repository';
import useApi from 'src/utils/useApi';

const Info = () => {
    const [state, setState] = useState(false);
    const [instructor, setInstructor] = useState(null);
    const apiFunc = () => repository.instructorInfo();

    const { result, error } = useApi(apiFunc);

    useEffect(() => {
        if (result?.status == "success") {
            setInstructor(result.data)
            console.log(result.data);
        }
    }, [result])
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
                        {instructor && instructor.subjects.map(sub => {
                            return <p style={{ paddingLeft: '10px' }}>{sub}</p>
                        })}
                    </div>
                    <hr />
                    <div>
                        <h2 style={{ color: '#4360A8' }}>Chứng chỉ</h2>
                        {instructor && instructor.certificates.map(cer => {
                            return <p style={{ paddingLeft: '10px' }}>{cer.name}</p>
                        })}
                    </div>
                    <hr />
                    <div>
                        <h2 style={{ color: '#4360A8' }}>Trình độ học vấn</h2>
                        {instructor && instructor.academic_level.map(lev => {
                            return <p style={{ paddingLeft: '10px' }}>{lev.name}</p>
                        })}
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