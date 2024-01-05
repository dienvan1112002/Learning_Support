import React from 'react';
import styles from './Contact.module.scss';
import classNames from 'classnames/bind';

import Footer from 'src/components/Footer/Footer';
import HeaderKhach from 'src/components/Header/HeaderKhach/Header';
import Contact from 'src/components/Contact/Contact';
import roleHeaders from 'src/utils/role';

const cx = classNames.bind(styles);
const ContactP = () => {
    const role = localStorage.getItem('role') ?? '';
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                {roleHeaders[role]}
            </div>
            <div className={cx('body')}>
                <Contact />
            </div>
            <div className={cx('footer')}>
                <Footer />
            </div>
        </div>
    );
};

export default ContactP;
