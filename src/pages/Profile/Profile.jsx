import React, { useEffect, useState } from 'react';
import ImageUploading from 'react-images-uploading';
import classNames from 'classnames/bind';
import HeaderGv from 'src/components/Header/HeaderGv/HeaderGv';
import styles from './Profile.module.scss';
import Footer from 'src/components/Footer/Footer';
import repository from 'src/repositories/repository';
import UpdateInfo from 'src/components/Info/UpdateInfo';
import getImageFromBaseURL from 'src/helper/get_image';

const cx = classNames.bind(styles);

const Profile = () => {
    const [editMode, setEditMode] = useState(false);
    const [singleImage, setSingleImage] = useState([]);
    const [editedTeacher, setEditedTeacher] = useState({});
    const [selectedImage, setSelectedImage] = useState(null);
    const [teacher, setTeacher] = useState();

    const maxNumber = 1;

    useEffect(() => {
        const teacherInfo = async () => {
            const teacherData = await repository.instructorInfo();
            console.log(teacherData.data.data);
            setTeacher(teacherData.data.data)
        }
        teacherInfo()
    }, [])

    const handleEdit = () => {
        setEditMode(true);
        setEditedTeacher({
            name: teacher?.user.name,
            price: teacher.price,
            description: 'Nhận dạy tất cả các môn khoa học tự nhiên',
        });
    };

    const handleSave = async (event) => {
        event.preventDefault();
        const data = new FormData();
        if (selectedImage) {
            data.append('image', selectedImage, selectedImage.name)
        }
        data.append('description', editedTeacher.description)
        data.append('active_status', teacher.active_status)
        data.append('price', editedTeacher.price)
        teacher.subjects.forEach(element => {
            data.append('subjects', element)
        });

        await repository.updateInstructorInfo(data)
        setEditMode(false);
        window.location.reload();
    };

    const onChange = (imageList) => {
        setSelectedImage(imageList[0]?.file);
        setSingleImage(imageList)
    };

    return (
        <div>
            <HeaderGv />
            <div style={{ background: '#7E9CDE' }}>
                <div className='row' style={{ padding: '50px 250px' }}>
                    <div className='card'>
                        <div className='card-body' style={{ display: 'flex', padding: '50px' }}>
                            <div className="col-md-8">
                                {editMode ? (
                                    <>
                                        <div className='row' style={{ display: 'flex', padding: '10px' }}>
                                            <div style={{ fontStyle: 'bold', fontWeight: 700 }} className='col-md-4'>Tên:</div>
                                            <input
                                                className='col-md-8 form-control'
                                                style={{ fontSize: '1.5rem' }}
                                                value={editedTeacher.name}
                                                onChange={(e) => setEditedTeacher({ ...editedTeacher, name: e.target.value })}
                                            />
                                        </div>
                                        <div className='row' style={{ display: 'flex', padding: '10px' }}>
                                            <div style={{ fontStyle: 'bold', fontWeight: 700 }} className='col-md-4'>Giá thuê:</div>
                                            <input
                                                className='col-md-8 form-control'
                                                style={{ fontSize: '1.5rem' }}
                                                value={editedTeacher.price}
                                                onChange={(e) => setEditedTeacher({ ...editedTeacher, price: e.target.value })}
                                            />
                                        </div>
                                        <div className='row' style={{ display: 'flex', padding: '10px' }}>
                                            <div style={{ fontStyle: 'bold', fontWeight: 700 }} className='col-md-4'>Mô tả:</div>
                                            <input
                                                className='col-md-8 form-control'
                                                style={{ fontSize: '1.5rem' }}
                                                value={editedTeacher.description}
                                                onChange={(e) => setEditedTeacher({ ...editedTeacher, description: e.target.value })}
                                            />
                                        </div>
                                        <ImageUploading
                                            value={singleImage}
                                            onChange={onChange}
                                            maxNumber={maxNumber}
                                            dataURLKey="data_url"
                                        >
                                            {({ imageList, onImageUpload }) => (
                                                <div className='row' style={{ display: 'flex', padding: '10px' }}>
                                                    <div style={{ fontStyle: 'bold', fontWeight: 700 }} className='col-md-4'>Chọn ảnh:</div>
                                                    <div className='col-md-8'>
                                                        <button style={{ padding: '10px 20px', fontSize: '11.25px' }} type="button" className="btn btn-primary" onClick={onImageUpload}>Chọn ảnh</button>
                                                        {imageList.map((image) => (
                                                            <img key={image.key} src={getImageFromBaseURL(image.data_url)} alt="Selected" style={{ width: '100px', height: '100px', margin: '10px' }} />
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </ImageUploading>
                                    </>
                                ) : (
                                    <>
                                        <div className='row' style={{ display: 'flex', padding: '10px' }}>
                                            <div style={{ fontStyle: 'bold', fontWeight: 700 }} className='col-md-4'>Tên:</div>
                                            <div className='col-md-8'>{teacher?.user.name}</div>
                                        </div>
                                        <div className='row' style={{ display: 'flex', padding: '10px' }}>
                                            <div style={{ fontStyle: 'bold, fontWeight: 700' }} className='col-md-4'>Giá thuê:</div>
                                            <div className='col-md-8'>{teacher?.price} đ/h</div>
                                        </div>
                                        <div className='row' style={{ display: 'flex', padding: '10px' }}>
                                            <div style={{ fontStyle: 'bold', fontWeight: 700 }} className='col-md-4'>Mô tả:</div>
                                            <div className='col-md-8'>Nhận dạy tất cả các môn khoa học tự nhiên</div>
                                        </div>
                                    </>
                                )}
                                <div style={{ paddingTop: '60px', paddingLeft: '180px' }}>
                                    {editMode ? (
                                        <button style={{ padding: '10px 20px', fontSize: '11.25px' }} type="button" className="btn btn-success" onClick={handleSave}>Lưu</button>
                                    ) : (
                                        <button style={{ padding: '10px 20px', fontSize: '11.25px' }} type="button" className="btn btn-primary" onClick={handleEdit}>Sửa</button>
                                    )}
                                </div>
                            </div>
                            <div className="col-md-4" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
                                <img style={{ width: '200px', height: '200px', borderRadius: '50%' }} src={getImageFromBaseURL(selectedImage || teacher?.user.image)} alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <UpdateInfo />
            <div>
                <Footer />
            </div>
        </div >
    );
};

export default Profile;
