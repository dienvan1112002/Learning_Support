import React from 'react';
import classNames from 'classnames/bind';
import styles from './Contact.module.scss';

import { FaPhoneAlt } from 'react-icons/fa';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { IoMdMail } from 'react-icons/io';

const cx = classNames.bind(styles);

const Contact = () => {
    return (
        <div className={cx('contact')}>
            <div className={cx('contactHead')}>
                <p className={cx('contactHeadP')}>Chúng tôi mong nhận được góp ý từ bạn</p>
            </div>
            <div className={cx('contactInfo')}>
                <div className={cx('formLeft')}>
                    <div className={cx('formLeftInfo')}>
                        <div className={cx('hoTen')}>
                            <div className="flex flex-col items-start gap-10 flex-1">
                                <label className={cx('descriptionL')} htmlFor="name">
                                    Họ
                                </label>
                                <input className={cx('input')} type="text" placeholder="Họ" />
                            </div>
                            <div className="flex flex-col items-start gap-10 flex-1">
                                <label className={cx('descriptionL')} htmlFor="name">
                                    Tên
                                </label>
                                <input className={cx('input')} type="text" placeholder="Tên" />
                            </div>
                        </div>
                        <div className={cx('email')}>
                            <div className="flex flex-col items-start gap-10 flex-1">
                                <label className={cx('descriptionL')} htmlFor="name">
                                    Email
                                </label>
                                <input className={cx('input')} type="text" placeholder="Nhập email" />
                            </div>
                            <div className="flex flex-col items-start gap-10 flex-1">
                                <label className={cx('descriptionL')} htmlFor="name">
                                    Vấn đề
                                </label>
                                <input className={cx('input')} type="text" placeholder="Nhập vấn đề" />
                            </div>
                        </div>
                        <div className={cx('description')}>
                            <label className={cx('descriptionL')} htmlFor="name">
                                Mô tả
                            </label>
                            <textarea className={cx('descriptionI')} type="text" placeholder="Nhập mô tả" />
                        </div>
                    </div>
                    <div className={cx('formLeftInfoCheckBox')}>
                        <div className={cx('checkbox')}>
                            <input type="checkbox" />
                            <p className="m-0">Tôi đồng ý với điều khoản sử dụng và chính sách quyền riêng tư</p>
                        </div>
                        <div className={cx('btn')}>
                            <button>Gửi</button>
                        </div>
                    </div>
                </div>
                <div className={cx('formRight')}>
                    <div className={cx('phone')}>
                        <div className={cx('phoneIcon')}>
                            <FaPhoneAlt />
                        </div>
                        <div className={cx('phoneInfo')}>
                            <div className="flex flex-col items-start gap-4">
                                <p className={cx('formRightP')}>Phone</p>
                                <p>+91 00000 00000</p>
                            </div>
                            <div className={cx('formRightBtn')}>
                                <button className={cx('styleBtn')}>Call Us</button>
                            </div>
                        </div>
                    </div>
                    <div className={cx('office')}>
                        <div className={cx('officeIcon')}>
                            <FaMapMarkerAlt />
                        </div>
                        <div className={cx('officeInfo')}>
                            <div className="flex flex-col items-start gap-4">
                                <p className={cx('formRightP')}>Office</p>
                                <p>1901 Thornridge Cir. Shiloh, Hawaii 81063</p>
                            </div>
                            <div className={cx('formRightBtn')}>
                                <button className={cx('styleBtn')}>Location</button>
                            </div>
                        </div>
                    </div>
                    <div className={cx('mail')}>
                        <div className={cx('mailIcon')}>
                            <IoMdMail />
                        </div>
                        <div className={cx('mailInfo')}>
                            <div className="flex flex-col items-start gap-4">
                                <p className={cx('formRightP')}>Email</p>
                                <p>produce-ui@gmail.com</p>
                            </div>
                            <div className={cx('formRightBtn')}>
                                <button className={cx('styleBtn')}>Email Us</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
