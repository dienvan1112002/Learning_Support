import React, { useState } from 'react';
import styles from './Contact.module.scss';
import classNames from 'classnames/bind';

import Footer from 'src/components/Footer/Footer';
import HeaderKhach from 'src/components/Header/HeaderKhach/Header';
import Contact from 'src/components/Contact/Contact';
import HeaderHv from 'src/components/Header/HeaderHv/HeaderHv';
import HeaderGv from 'src/components/Header/HeaderGv/HeaderGv';
import HeaderDkgv from 'src/components/Header/HeaderDkgv/HeaderDkgv';
import Search from 'src/components/Search/Search';

const cx = classNames.bind(styles);
const ContactP = () => {
    let role = localStorage.getItem('role') ?? '';
    let active = localStorage.getItem('active') ?? '';

    const [isSearchActive, setSearchActive] = useState(false);

    const roleHeaders = {
        '': <HeaderKhach toggleSearch={() => setSearchActive(!isSearchActive)} />,
        null: <HeaderKhach toggleSearch={() => setSearchActive(!isSearchActive)} />,
        'student': <HeaderHv toggleSearch={() => setSearchActive(!isSearchActive)} />,
        'instructor': <HeaderGv />,
        'admin': <HeaderDkgv />
    };

    const displayHeader = () => {
        if (role === 'instructor' || role === 'student') {
            role = 'student'
        }
        if (active == 'student') {
            role = 'student'
        } else if (active == 'instructor') {
            role = 'instructor'
        } else {
            role = ''
        }
        return role;
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                {roleHeaders[displayHeader()]}
            </div>
            {isSearchActive && <Search onClose={() => setSearchActive(false)} />}
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
