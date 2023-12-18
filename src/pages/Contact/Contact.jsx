import React from 'react';
import styles from './Contact.module.scss';
import classNames from 'classnames/bind';

import Footer from 'src/components/Footer/Footer';
import HeaderKhach from 'src/components/Header/HeaderKhach/Header';
import Contact from 'src/components/Contact/Contact';

const cx = classNames.bind(styles);
const ContactP = () => {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <HeaderKhach />
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
