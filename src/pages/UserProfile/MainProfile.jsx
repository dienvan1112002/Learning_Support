import React, { useEffect, useState } from 'react';
import Sidebar from 'src/components/Sidebar/Sidebar';
import repository from 'src/repositories/repository';
import ImageUploading from 'react-images-uploading';
import './index.css';
import getImageFromBaseURL from 'src/helper/get_image';

const MainProfile = () => {
    const [singleImage, setSingleImage] = useState([]);
    const [user, setUser] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        email: [],
        image: '',
    });

    const onChangeImage = (imageList, addUpdateIndex) => {
        formData.image = imageList[0].file;
        setSingleImage(imageList);
    };

    const handleInputChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    useEffect(() => {
        const getUser = async () => {
            let res = await repository.getInfoUser();
            setUser(res.data.data)
        }
        getUser()
    }, [])

    const updateInfo = async (event) => {
        event.preventDefault();
        const data = new FormData();
        Object.keys(formData).forEach(key => {
            if (key === 'image' && formData[key]) {
                data.append('image', formData[key], formData[key].name);
            } else {
                data.append(key, formData[key]);
            }
        });

        const res = await repository.updateUserInfo(data)
        window.location.reload();
    }

    return (
        <div className='row' style={{ height: '100vh' }}>
            <div className='col-3' style={{ backgroundColor: '#7E9CDE' }}>
                <Sidebar user={user} />
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
                                        <input type="text" readonly class="form-control-plaintext" id="username" value={user?.username} />
                                    </div>
                                </div>
                                <div class="mb-4 row">
                                    <label class="col-sm-4 col-form-label">Họ và tên:</label>
                                    <div class="col-sm-8">
                                        <input
                                            type="text"
                                            style={{ fontSize: '2rem' }}
                                            class="form-control"
                                            name="name"
                                            // value={formData.name}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                                <div class="mb-4 row">
                                    <label class="col-sm-4 col-form-label">Email:</label>
                                    <div class="col-sm-8">
                                        <input
                                            type="text"
                                            style={{ fontSize: '2rem' }}
                                            class="form-control"
                                            name="email"
                                            // value={formData.email}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                                <button className='btn btn-save' style={{ margin: '50px 0 0 300px' }}>
                                    <div className='text-save' onClick={updateInfo}>
                                        Lưu
                                    </div>
                                </button>
                            </div>
                        </div>
                        <div className="col-4">
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center' }}>
                                <img
                                    style={{ width: '200px', height: '200px', borderRadius: '50%' }}
                                    src={getImageFromBaseURL(user?.image)}
                                    alt=""
                                />
                                <ImageUploading
                                    value={singleImage}
                                    onChange={onChangeImage}
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
                                                className='btn btn-save'
                                            >
                                                <div className="text-save">
                                                    Chọn ảnh
                                                </div>
                                            </button>
                                            &nbsp;
                                            {imageList.map((image, index) => (
                                                <div key={index} className="image-item" >
                                                    <img src={image.data_url} alt="" width="100" />
                                                    <div className="image-item__btn-wrapper">
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </ImageUploading>
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
