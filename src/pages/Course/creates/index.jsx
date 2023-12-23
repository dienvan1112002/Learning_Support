import React, { useEffect, useState, useCallback } from 'react';
import styles from './create.module.scss';
import classNames from 'classnames/bind';
import Header from 'src/components/Header/HeaderKhach/Header';
import Footer from 'src/components/Footer/Footer';
import subjects from 'src/constant/subject';
import levels from 'src/constant/level';
import repository from 'src/repositories/repository';
import ImageUploading from 'react-images-uploading';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

const CreateCourse = () => {
    const navigate = useNavigate();
    const [singleImage, setSingleImage] = useState([]);
    const [multipleImages, setMultipleImages] = useState([]);

    const maxNumber = 69;
    const onChangeImageMutiple = (imageList, addUpdateIndex) => {
        formData.thumbnails = imageList;
        setMultipleImages(imageList);
    };

    const onChangeImage = (imageList, addUpdateIndex) => {
        formData.cover_image = imageList[0].file;
        setSingleImage(imageList);
    };

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        thumbnails: [],
        cover_image: '',
        subject: subjects[0], 
        level: levels[0], 
        price: '',
    });
    const handleInputChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };
    
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData();

        Object.keys(formData).forEach(key => {
            if (key === 'cover_image' && formData[key] && formData[key][0] && formData[key][0].file) {
              data.append('cover_image', formData[key][0].file, formData[key][0].file.name);
            } else if (key === 'thumbnails' && formData[key]) {
              formData[key].forEach((image, index) => {
                if (image && image.file) {
                  data.append('thumbnails', image.file, image.file.name);
                }
              });
            } else {
              data.append(key, formData[key]);
            }
          });

        try {
            const response = await repository.registerCourseOfInstructor(data);
            if (response.status === 200) {
                alert('Đăng kí khóa học thành công');
                navigate('/course');
            }
        } catch (error) {
            alert('Đăng kí khóa học thất bại');
            console.log(error);
        }
      };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <Header />
            </div>
            <div className={cx('body')}>
                <div className={cx('container')}>
                   <div className={cx('form-wrapper')} action="">
                   <div>
                        <label htmlFor="title">Tên khóa học</label>
                        <input
                            className={cx('input-create')}
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                        />
                    </div>
                        <div className={cx('display-subject-level')}>
                        <div>
                            <label htmlFor="subject">Môn học</label>
                            <select className={cx('input-create')} id="subject" name="subject" value={formData.subject} onChange={handleInputChange}>
                                {subjects.map((subject) => {
                                return <option key={subject} value={subject}>{subject}</option>
                                })}
                            </select>
                            </div>
                            <div className={cx('pl-10')}>
                            <label htmlFor="level">Cấp độ</label>
                            <select className={cx('input-create')} id="level" name="level" value={formData.level} onChange={handleInputChange}>
                                {levels.map((level) => {
                                return <option key={level} value={level}>{level}</option>
                                })}
                            </select>
                            </div>
                        </div>
                        <div>
                        <label htmlFor="description">Mô tả</label>
                        <textarea
                            className={cx('input-create')}
                            id="description"
                            name="description"
                            cols="30"
                            rows="10"
                            value={formData.description}
                            onChange={handleInputChange}
                        />
                        </div>
                        <div className="image-primary">
                            <ImageUploading
                                value={singleImage}
                                onChange={onChangeImage}
                                maxNumber={maxNumber}
                                dataURLKey="data_url"
                                acceptType={["jpg"]}
                            >
                                {({
                                imageList,
                                onImageUpload,
                                onImageRemoveAll,
                                onImageUpdate,
                                onImageRemove,
                                isDragging,
                                dragProps
                                }) => (
                                <div>
                                    <button
                                    style={isDragging ? { color: "red" } : null}
                                    onClick={onImageUpload}
                                    {...dragProps}
                                    className={cx("btn btn-primary btn-file")}
                                    >
                                    Tải ảnh chính
                                    </button>
                                    &nbsp;
                                    {/* <button onClick={onImageRemoveAll} style={singleImage.length > 0 ? { display: "none" } : { display: "none"}}>Remove all images</button> */}
                                    {imageList.map((image, index) => (
                                        <div key={index} className="image-item" >
                                            <img src={image.data_url} alt="" width="100" />
                                            <div className="image-item__btn-wrapper">
                                            {/* <button onClick={() => onImageUpdate(index)}>Update</button> */}
                                            {/* <button onClick={() => onImageRemove(index)}>Remove</button> */}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                )}
                            </ImageUploading>
                        </div>
                        
                        <ImageUploading
                            multiple
                            value={multipleImages}
                            onChange={onChangeImageMutiple}
                            maxNumber={maxNumber}
                            dataURLKey="data_url"
                            acceptType={["jpg"]}
                        >
                            {({
                            imageList,
                            onImageUpload,
                            onImageRemoveAll,
                            onImageUpdate,
                            onImageRemove,
                            isDragging,
                            dragProps
                            }) => (
                            <div>
                                <button
                                style={isDragging ? { color: "red" } : null}
                                onClick={onImageUpload}
                                {...dragProps}
                                className={cx("btn btn-primary btn-file")}
                                >
                                Tải 3 ảnh bìa
                                </button>
                                &nbsp;
                                {/* <button onClick={onImageRemoveAll}>Remove all images</button> */}
                                {imageList.map((image, index) => (
                                <div key={index} className="image-item">
                                    <img src={image.data_url} alt="" width="100" />
                                    <div className="image-item__btn-wrapper">
                                    {/* <button onClick={() => onImageUpdate(index)}>Update</button> */}
                                    {/* <button onClick={() => onImageRemove(index)}>Remove</button> */}
                                    </div>
                                </div>
                                ))}
                            </div>
                            )}
                        </ImageUploading>
                        <div>
                            <label htmlFor="">Giá khóa học</label>
                            <input className={cx('input-create')} name="price"  type="text" value={formData.price} onChange={handleInputChange} />
                        </div>
                        <button className={cx("btn btn-primary btn-file")} onClick={handleFormSubmit}>Đăng kí khóa học</button>
                   </div>


                </div>
            </div>
            <div className={cx('footer')}>
                <Footer />
            </div>
        </div>
    );
}

export default CreateCourse;
