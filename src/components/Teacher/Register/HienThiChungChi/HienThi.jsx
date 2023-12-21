import React, { useState } from 'react';
import styles from './HienThi.module.scss';
import classNames from 'classnames/bind';
import Switch from 'src/components/Btn/Switch';

import { FaAngleRight } from 'react-icons/fa6';

const cx = classNames.bind(styles);

const HienThi = () => {
    const [monhocs, setMonHocs] = useState([
        {
            id: 1,
            content: 'Toán',
        },
        {
            id: 2,
            content: 'Vật Lý',
        },
    ]);
    const [chungChis, setChungChis] = useState([
        {
            id: 1,
            content: 'Chứng chỉ thiết kế hệ thống ',
        },
        {
            id: 2,
            content: 'Chứng chỉ tin học loại B',
        },
    ]);
    const [hocVans, sethocVans] = useState([
        {
            id: 1,
            content: 'Sinh viên năm 4 KMA, GPA 3.9 ',
        },
    ]);
    console.log(monhocs.title);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('wrapper-title')}>
                <h2>Thông tin hiển thị</h2>
                <div className={cx('title-btn')}>
                    <button>Sửa thông tin </button>
                    <FaAngleRight />
                </div>
            </div>
            <div className={cx('wrapper-bottom')}>
                <div className={cx('wrapper-content')}>
                    <div className={cx('monhoc')}>
                        <h3>Môn học</h3>
                        <ul className={cx('item')}>
                            {monhocs.map((monhoc) => (
                                <li key={monhoc.id}>{monhoc.content}</li>
                            ))}
                        </ul>
                    </div>
                    <div className={cx('chungchi')}>
                        <h3>Chứng chỉ</h3>
                        <ul className={cx('item')}>
                            {chungChis.map((chungchi) => (
                                <li key={chungchi.id}>{chungchi.content}</li>
                            ))}
                        </ul>
                    </div>
                    <div className={cx('hocvan')}>
                        <h3>Trình độ học vấn</h3>
                        <ul className={cx('item')}>
                            {hocVans.map((hocvan) => (
                                <li key={hocvan.id}>{hocvan.content}</li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className={cx('wrapper-active')}>
                    <div className={cx('wrapper-active-title')}>
                        <h4>Chế độ online</h4>
                    </div>
                    <div className={cx('wrapper-active-content')}>
                        <Switch onChange={() => console.log('asd')} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HienThi;
