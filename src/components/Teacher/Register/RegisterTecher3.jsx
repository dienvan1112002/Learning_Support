import React, { useEffect, useState } from 'react';
import styles from './RegisterTecher3.module.scss';
import classNames from 'classnames/bind';
import { MdModeEdit } from 'react-icons/md';
import { RiDeleteBin6Line } from 'react-icons/ri';

const cx = classNames.bind(styles);

const RegisterTecher3 = () => {
    const [editingItemId, setEditingItemId] = useState(null);
    const [avatar, setAvatar] = useState([]);

    const [items, setItems] = useState([
        {
            id: 1,
            checked: false,
            item: 'Chứng chỉ thiết kế hệ thống',
        },
        {
            id: 2,
            checked: false,
            item: 'Chứng chỉ tin học loại B',
        },
    ]);

    const [itemhv, setItemhv] = useState([
        {
            id: 1,
            checked: false,
            item: 'Sinh viên năm 4 KMA, GPA',
        },
        {
            id: 2,
            checked: false,
            item: 'Chứng chỉ tin học loại B',
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
        const newValue = prompt('Enter new value:', updatedList[index].item); // Thay prompt bằng cách nhập liệu thích hợp
        if (index !== -1 && newValue !== null) {
            updatedList[index].item = newValue;
            listType === 'items' ? setItems(updatedList) : setItemhv(updatedList);
        }
    };
    useEffect(() => {
        return () => {
            avatar && URL.revokeObjectURL(avatar.preview);
        };
    }, [avatar]);
    const handleChoseFile = (e, itemId, listType) => {
        const file = e.target.files[0];
        file.preview = URL.createObjectURL(file);

        // Cập nhật preview của item tương ứng trong items hoặc itemhv
        const updatedList = listType === 'items' ? [...items] : [...itemhv];
        const updatedItems = updatedList.map((item) => {
            if (item.id === itemId) {
                return { ...item, preview: file.preview };
            }
            return item;
        });

        listType === 'items' ? setItems(updatedItems) : setItemhv(updatedItems);
        e.target.value = null;
    };
    const [newItemValue, setNewItemValue] = useState(''); // State để lưu giá trị mới từ input

    const handleAddItem = () => {
        if (newItemValue.trim() !== '') {
            const newItem = {
                id: items.length + 1,
                checked: false,
                item: newItemValue,
            };
            setItems([...items, newItem]);
            setNewItemValue(''); // Reset giá trị của input
        } else {
            // Hiển thị thông báo hoặc xử lý khi giá trị input rỗng
            // (ví dụ: thông báo lỗi)
        }
    };
    const handleAddItemhv = () => {
        if (newItemValue.trim() !== '') {
            const newItem = {
                id: items.length + 1,
                checked: false,
                item: newItemValue,
            };
            setItemhv([...itemhv, newItem]);
            setNewItemValue(''); // Reset giá trị của input
        } else {
            // Hiển thị thông báo hoặc xử lý khi giá trị input rỗng
            // (ví dụ: thông báo lỗi)
        }
    };
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
                                                <MdModeEdit
                                                    role="button"
                                                    className={cx('icon-edit')}
                                                    onClick={(e) => handleEdit(item.id, 'items', e)}
                                                />
                                                <RiDeleteBin6Line
                                                    className={cx('icon-delete')}
                                                    onClick={() => handleDelete(item.id, 'items')}
                                                />
                                            </div>

                                            <div className={cx('item-btn-file')}>
                                                <input
                                                    type="file"
                                                    onChange={(e) => handleChoseFile(e, item.id, 'items')}
                                                />
                                                {item.preview && (
                                                    <img
                                                        style={{ width: '30rem' }}
                                                        src={item.preview}
                                                        alt=""
                                                        width="80%"
                                                    />
                                                )}
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className={cx('content-chungchi-btn')}>
                            <div className={cx('content-chungchi-btn-input')}>
                                <input
                                    type="text"
                                    value={newItemValue}
                                    onChange={(e) => setNewItemValue(e.target.value)}
                                />
                            </div>
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
                                                <MdModeEdit
                                                    role="button"
                                                    className={cx('icon-edit')}
                                                    onClick={(e) => handleEdit(item.id, 'itemhv', e)}
                                                />
                                                <RiDeleteBin6Line
                                                    className={cx('icon-delete')}
                                                    onClick={() => handleDelete(item.id, 'itemhv')}
                                                />
                                            </div>
                                            <div className={cx('item-btn-file')}>
                                                <input
                                                    type="file"
                                                    onChange={(e) => handleChoseFile(e, item.id, 'itemhv')}
                                                />
                                                {item.preview && (
                                                    <img
                                                        style={{ width: '30rem' }}
                                                        src={item.preview}
                                                        alt=""
                                                        width="80%"
                                                    />
                                                )}
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className={cx('content-chungchi-btn')}>
                            <div className={cx('content-chungchi-btn-input')}>
                                <input
                                    type="text"
                                    value={newItemValue}
                                    onChange={(e) => setNewItemValue(e.target.value)}
                                />
                            </div>
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
                    <button>Gửi đi</button>
                </div>
            </div>
        </div>
    );
};

export default RegisterTecher3;
