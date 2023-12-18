import React from 'react';
import Header from 'src/components/Header/HeaderKhach/Header';
import HeaderHv from 'src/components/Header/HeaderHv/HeaderHv';
import Footer from 'src/components/Footer/Footer';

import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import home from '../../assests/home/home.png';

const cx = classNames.bind(styles);
const Home = () => {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <HeaderHv />
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
                        <button>Khám phá khóa học</button>
                        <button className={cx('bg-slate-100 rounded text-black')}>Tự chọn gia sư</button>
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
