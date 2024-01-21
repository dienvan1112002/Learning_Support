import React, { useEffect, useState } from 'react';
import Footer from 'src/components/Footer/Footer';
import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import home from '../../assests/home/home.png';
import { Link } from 'react-router-dom';
import { requestForToken } from 'src/firebase';
import Search from 'src/components/Search/Search';
import HeaderKhach from 'src/components/Header/HeaderKhach/Header';
import HeaderHv from 'src/components/Header/HeaderHv/HeaderHv';
import HeaderGv from 'src/components/Header/HeaderGv/HeaderGv';
import HeaderDkgv from 'src/components/Header/HeaderDkgv/HeaderDkgv';

const cx = classNames.bind(styles);
const Home = () => {
    let role = localStorage.getItem('role') ?? '';
    let active = localStorage.getItem('active') ?? 'student';
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
        } else {
            role = 'instructor'
        }
        return role;
    }

    useEffect(() => {
        requestForToken();
    }, [])

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                {roleHeaders[displayHeader()]}
            </div>
            {isSearchActive && <Search onClose={() => setSearchActive(false)} />}
            <div className={cx('body')}>
                <div className={cx('container-body')}>
                    <div className={cx('body-tieude')}>
                        <div className={cx('sub')}>
                            <h3>Nâng Cao Kiến Thức Của Bạn</h3>
                        </div>
                        <div className={cx('text')}>
                            <h4>với các khoá học trực tuyến và đội ngũ gia sư.</h4>
                            <p>Học hỏi từ các chuyên gia trong ngành và nâng cao kỹ năng của bạn.</p>
                        </div>
                    </div>
                    <div className={cx('btn')}>
                        <Link to="course">
                            <button>Khám phá khóa học</button>
                        </Link>
                        <Link to="teacher">
                            <button className={cx('bg-slate-100 rounded text-black')}>Tự chọn gia sư</button>
                        </Link>
                    </div>
                </div>
                <div className={cx('body-img')}>
                    <img src={home} alt="" />
                </div>
            </div>
            <div className={cx('footer')}>
                <Footer />
            </div>
        </div>
    );
};

export default Home;
