import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import repository from 'src/repositories/repository';
import useApi from 'src/utils/useApi';
import subjects from 'src/constant/subject';

const UpdateInfo = () => {
    const [state, setState] = useState(false);
    const [instructor, setInstructor] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [selectedSubjects, setSelectedSubjects] = useState([]);
    const apiFunc = () => repository.instructorInfo();

    const { result, error } = useApi(apiFunc);

    useEffect(() => {
        if (result?.status == "success") {
            setInstructor(result.data)
        }
    }, [result])

    const handleUpdate = () => {
        setEditMode(false);
    };

    return (
        <div style={{ backgroundColor: '#F7F7F8', padding: '50px 100px' }}>
            <div style={{ padding: '50px 100px 25px 100px', backgroundColor: '#fff' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h2>Thông tin hiển thị</h2>
                    <button
                        style={{ padding: '10px 20px' }}
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() => setEditMode(true)}
                    >
                        Sửa thông tin
                    </button>
                </div>
                <div style={{ padding: '50px' }}>
                    {!editMode && (
                        <div>
                            <h2 style={{ color: '#4360A8' }}>Môn học</h2>
                            {instructor && instructor.subjects.map((sub, index) => {
                                return <p key={index} style={{ paddingLeft: '10px' }}>{sub}</p>
                            })}
                        </div>
                    )}
                    {editMode && (
                        <>
                            <div style={{ marginBottom: '15px' }}>
                                <h2 style={{ color: '#4360A8' }}>Chọn Môn học</h2>
                                <select
                                    id="subjects"
                                    name="subjects"
                                    multiple
                                    value={selectedSubjects}
                                    style={{
                                        width: '100%',
                                        padding: '8px',
                                        marginTop: '5px',
                                        marginBottom: '10px',
                                        border: '1px solid #ccc',
                                        borderRadius: '4px',
                                        boxSizing: 'border-box',
                                    }}
                                    onChange={(e) => setSelectedSubjects(Array.from(e.target.selectedOptions, (option) => option.value))}
                                >
                                    {subjects.map((subject) => (
                                        <option key={subject} value={subject}>{subject}</option>
                                    ))}
                                </select>
                            </div>
                            <div style={{ paddingTop: '10px' }}>
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={handleUpdate}
                                >
                                    Cập nhật
                                </button>
                            </div>
                        </>
                    )}
                    <hr />
                    <div>
                        <h2 style={{ color: '#4360A8' }}>Chứng chỉ</h2>
                        {instructor && instructor.certificates.map((cer, index) => {
                            return <p key={index} style={{ paddingLeft: '10px' }}>{cer.name}</p>
                        })}
                    </div>
                    <hr />
                    <div>
                        <h2 style={{ color: '#4360A8' }}>Trình độ học vấn</h2>
                        {instructor && instructor.academic_level.map((lev, index) => {
                            return <p key={index} style={{ paddingLeft: '10px' }}>{lev.name}</p>
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
        </div >
    )
}

export default UpdateInfo;