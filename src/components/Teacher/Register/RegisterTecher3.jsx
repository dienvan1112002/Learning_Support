import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import styles from './RegisterTecher3.module.scss';
import classNames from 'classnames/bind';
import repository from 'src/repositories/repository';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

const RegisterTecher3 = () => {
    const [show, setShow] = useState(false);
    const navigate = useNavigate()
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [editingItemId, setEditingItemId] = useState(null);
    const [singleImage, setSingleImage] = useState([]);
    const [certificateImage, setCertificateImage] = useState([]);
    const [academicLevelImage, setAcademicLevelImage] = useState([]);
    const [avatar, setAvatar] = useState([]);

    const [items, setItems] = useState([
        {
            id: 1,
            item: 'Chứng chỉ thiết kế hệ thống',
            isEditting: false
        },
        {
            id: 2,
            item: 'Chứng chỉ tin học loại B',
            isEditting: false
        },
    ]);

    const [itemhv, setItemhv] = useState([
        {
            id: 1,
            item: 'Sinh viên năm 4 KMA, GPA',
            isEditting: false
        },
        {
            id: 2,
            item: 'Chứng chỉ tin học loại B',
            isEditting: false
        },
    ]);

    const handleDelete = (itemId, listType) => {
        let updatedList = listType === 'items' ? [...items] : [...itemhv];
        updatedList = updatedList.filter((item) => item.id !== itemId);
        listType === 'items' ? setItems(updatedList) : setItemhv(updatedList);
    };

    const handleEdit = (itemId, listType, e) => {
        const updatedList = listType === 'items' ? [...items] : [...itemhv];
        const index = updatedList.findIndex((item) => item.id === itemId);
        updatedList[index].isEditting = true;
        listType === 'items' ? setItems(updatedList) : setItemhv(updatedList);
    };

    const handleOnChangeItem = (itemId, value) => {
        setItems((prevChapters) =>
            prevChapters.map((chapter) =>
                chapter.id === itemId ? { ...chapter, item: value } : chapter
            )
        );
    }

    const handleSaveItem = (itemId, value) => {
        setItems((prevChapters) =>
            prevChapters.map((chapter) =>
                chapter.id === itemId ? { ...chapter, item: value, isEditting: false } : chapter
            )
        );
    }

    const handleCancelEdit = (itemId) => {
        setItems((prevChapters) =>
            prevChapters.map((chapter) =>
                chapter.id === itemId ? { ...chapter, isEditting: false } : chapter
            )
        );
    }

    useEffect(() => {
        return () => {
            avatar && URL.revokeObjectURL(avatar.preview);
        };
    }, [avatar]);

    const handleChoseFile = (e) => {
        const file = e.target.files[0];
        setCertificateImage(old => [...old, file])
    };

    const handleChoseAceFile = (e) => {
        const file = e.target.files[0];
        setAcademicLevelImage(old => [...old, file])
    };

    const handleAddItem = () => {
        const newItem = {
            id: items.length + 1,
            checked: false,
            item: 'New Chứng chỉ',
        };

        setItems([...items, newItem]);
    };
    const handleAddItemhv = () => {
        const newItemhv = {
            id: itemhv.length + 1,
            checked: false,
            item: 'New Trình độ',
        };

        setItemhv([...itemhv, newItemhv]);
    };

    const handleSaveCer = async () => {
        const data = new FormData();
        certificateImage.forEach((image, index) => {
            if (image && image.name) {
                data.append('certificates', image, image.name);
                data.append('certificates', items[index].item);
            }
        });

        academicLevelImage.forEach((image, index) => {
            if (image && image.name) {
                data.append('academic_level', image, image.name);
                data.append('academic_level', itemhv[index].item);
            }
        });

        JSON.parse(localStorage.getItem('selectedSubjects')).forEach(sub => {
            data.append('subjects', sub);
        })
        let res = await repository.registerInstructor(data);
        if (res.status == 200) {
            setShow(true)
        }
    }

    return (
        <div className={cx('body')}>
            <div className={cx('wrapper')}>
                <div className={cx('container')}>
                    <div className={cx('title-chungchi')}>
                        <h4>Chứng Chỉ</h4>
                    </div>
                    <div className={cx('content-chungchi')}>
                        <div className={cx('content-chungchi-item')}>
                            <ul>
                                {items.map((item) => (
                                    <li className={cx('item')} key={item.id}>
                                        <div className={cx('item-list')}>
                                            {item.isEditting ? (
                                                <>
                                                    <input
                                                        type="text"
                                                        value={item.item}
                                                        onChange={(e) => handleOnChangeItem(item.id, e.target.value)}
                                                    />
                                                    <i class="ri-save-3-line" onClick={() => handleSaveItem(item.id, item.item)}></i>
                                                    <i class="ri-delete-bin-line" onClick={() => handleCancelEdit(item.id)}></i>
                                                </>
                                            ) : (
                                                <>
                                                    <span>{item.item}</span>
                                                    <div className={cx('item-btn')}>
                                                        <div className={cx('item-btn-icon')}>
                                                            <i className="ri-pencil-line" onClick={(e) => handleEdit(item.id, 'items', e)}></i>
                                                            <i class="ri-delete-bin-line" onClick={() => handleDelete(item.id, 'items')}></i>
                                                        </div>
                                                    </div>
                                                </>
                                            )}
                                        </div>

                                        <div className={cx('item-btn-file')}>
                                            <input
                                                type="file"
                                                onChange={(e) => handleChoseFile(e, item.id, 'items')}
                                            />
                                            {item.preview}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className={cx('content-chungchi-btn')}>
                            <div className={cx('content-chungchi-btn-button')}>
                                <button onClick={handleAddItem}>+ Chứng chỉ</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={cx('container')}>
                    <div className={cx('title-chungchi')}>
                        <h4>Trình độ học vấn</h4>
                    </div>
                    <div className={cx('content-chungchi')}>
                        <div className={cx('content-chungchi-item')}>
                            <ul>
                                {itemhv.map((item) => (
                                    <li className={cx('item')} key={item.id}>
                                        <div className={cx('item-list')}>
                                            <input
                                                type="text"
                                                value={item.item}
                                                disabled={editingItemId !== item.id}
                                                checked={item.checked}
                                                onChange={(e) => setItems(e.target.value)}
                                            />
                                        </div>
                                        <div className={cx('item-btn')}>
                                            <div className={cx('item-btn-icon')}>
                                                <i className="ri-pencil-line" onClick={(e) => handleEdit(item.id, 'itemhv', e)}></i>
                                                <i class="ri-delete-bin-line" onClick={() => handleDelete(item.id, 'itemhv')}></i>
                                            </div>
                                        </div>
                                        <div className={cx('item-btn-file')}>
                                            <input
                                                type="file"
                                                onChange={(e) => handleChoseAceFile(e, item.id, 'itemhv')}
                                            />
                                            {item.preview}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className={cx('content-chungchi-btn')}>
                            <div className={cx('content-chungchi-btn-button')}>
                                <button onClick={handleAddItemhv}>+ Trình độ</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={cx('checkbox')}>
                    <input type="checkbox" />
                    <p>Đồng ý với điều khoản sử dụng và chính sách quyền riêng tư</p>
                </div>
                <div className={cx('wrapper-bottom')}>
                    <button onClick={handleSaveCer}>
                        Gửi đi
                    </button>
                </div>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header>
                        <Modal.Title>Hoàn tất</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Hệ thống sẽ kiểm tra và trả kết quả phê duyệt tới bạn</Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={() => navigate('/')}>
                            Tới trang chủ
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    );
};

export default RegisterTecher3;
