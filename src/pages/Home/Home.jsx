import React from 'react';
import Footer from 'src/components/Footer/Footer';

import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import home from '../../assests/home/home.png';
import { Link } from 'react-router-dom';
import roleHeaders from '../../utils/role';

const cx = classNames.bind(styles);
const Home = () => {

    let role = localStorage.getItem('role') ?? '';

    const displayHeader = () => {
        if (role === 'instructor' || role === 'student') {
            role = 'student'
        }
        return role;
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                {roleHeaders[displayHeader()]}
            </div>
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
