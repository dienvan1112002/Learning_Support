import React from 'react';
import styles from './RegisterTecher1.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const RegisterTecher1 = () => {
    return (
        <div className={cx('body')}>
            <div className={cx('body-item')}>
                <h4>Bạn đã từng thực hiện giảng dạy qua cách thức nào dưới đây?</h4>
                <div className={cx('item')}>
                    <input type="radio" id="option1" name="teachingMethod" value="chuyenMon" />
                    <label htmlFor="option1">Giảng dạy trực tiếp, có chuyên môn</label>
                </div>
                <div className={cx('item')}>
                    <input type="radio" id="option2" name="teachingMethod" value="chuachungnhan" />
                    <label htmlFor="option2">Giảng dạy trực tiếp, chưa có chứng nhận giảng dạy</label>
                </div>
                <div className={cx('item')}>
                    <input type="radio" id="option3" name="teachingMethod" value="online" />
                    <label htmlFor="option3">Dạy online</label>
                </div>
                <div className={cx('item')}>
                    <input type="radio" id="option4" name="teachingMethod" value="other" />
                    <label htmlFor="option4">Khác</label>
                </div>
            </div>

            <div className={cx('body-item')}>
                <h4>Bạn đã từng có kinh nghiệm giảng dạy bao lâu?</h4>
                <div className={cx('item')}>
                    <input type="radio" id="experience1" name="teachingExperience" value="over10years" />
                    <label htmlFor="experience1">Trên 10 năm</label>
                </div>
                <div className={cx('item')}>
                    <input type="radio" id="experience2" name="teachingExperience" value="over3years" />
                    <label htmlFor="experience2">Trên 3 năm và nhỏ hơn 10 năm</label>
                </div>
                <div className={cx('item')}>
                    <input type="radio" id="experience3" name="teachingExperience" value="over1year" />
                    <label htmlFor="experience3">Trên 1 năm</label>
                </div>
                <div className={cx('item')}>
                    <input type="radio" id="experience4" name="teachingExperience" value="knowledgeNoExperience" />
                    <label htmlFor="experience4">Tôi có kiến thức nhưng chưa có kinh nghiệm giảng dạy</label>
                </div>
            </div>

            <div className={cx('body-item')}>
                <h4>Bạn giảng dạy chuyên về môn học gì?</h4>
                <div className={cx('item')}>
                    <input type="checkbox" />
                    <p>Toán</p>
                </div>
                <div className={cx('item')}>
                    <input type="checkbox" />
                    <p>Ngoại Ngữ</p>
                </div>
                <div className={cx('item')}>
                    <input type="checkbox" />
                    <p>Ngữ Văn</p>
                </div>
                <div className={cx('item')}>
                    <input type="checkbox" />
                    <p>Vật Lý</p>
                </div>
                <div className={cx('item')}>
                    <input type="checkbox" />
                    <p>Hóa học</p>
                </div>
                <div className={cx('item')}>
                    <input type="checkbox" />
                    <p>Sinh học</p>
                </div>
                <div className={cx('item')}>
                    <input type="checkbox" />
                    <p>Lịch sử</p>
                </div>
                <div className={cx('item')}>
                    <input type="checkbox" />
                    <p>Địa lí</p>
                </div>
                <div className={cx('item')}>
                    <input type="checkbox" />
                    <p>Giáo dục công dân</p>
                </div>
            </div>
            <div className={cx('btn')}>
                <button>Tiếp</button>
            </div>
        </div>
    );
};

export default RegisterTecher1;
