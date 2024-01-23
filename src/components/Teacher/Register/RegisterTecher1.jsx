import React, { useState } from 'react';
import styles from './RegisterTecher1.module.scss';
import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

const RegisterTecher1 = () => {
    const navigate = useNavigate();

    const [selectedSubjects, setSelectedSubjects] = useState([]);
    const subjects = [
        {
            id: 1,
            name: 'Toán học'
        },
        {
            id: 2,
            name: 'Vật lý'
        },
        {
            id: 3,
            name: 'Hóa học'
        },
        {
            id: 4,
            name: 'Sinh học'
        }, {
            id: 5,
            name: 'Văn học'
        },
        {
            id: 6,
            name: 'Lịch sử'
        },
        {
            id: 7,
            name: 'Địa lý'
        },
        {
            id: 8,
            name: 'GDCD'
        },
        {
            id: 9,
            name: 'Tiếng Anh'
        },
    ]
    const [checkedState, setCheckedState] = useState(
        new Array(subjects.length).fill(false)
    );

    function handleCheckboxChange(e) {
        console.log('value of checkbox : ', e.target.value);
        console.log('value of checkbox : ', e.target.checked);
    }

    const handleOnChange = (position) => {
        const updatedCheckedState = checkedState.map((item, index) => {
            if (index === position) {
                const isChecked = !item;

                const updatedSubjects = isChecked
                    ? [...selectedSubjects, subjects[index].name]
                    : selectedSubjects.filter((subject) => subject !== subjects[index].name);

                setSelectedSubjects(updatedSubjects);
                return isChecked;
            }
            return item;
        });

        setCheckedState(updatedCheckedState);
    };

    const handleRedirect = () => {
        localStorage.setItem('selectedSubjects', JSON.stringify(selectedSubjects));
        navigate('/user/register-instructor/step/2')
    }

    return (
        <div className={cx('body')}>
            <div className={cx('body-item')}>
                <h4>Bạn đã từng thực hiện giảng dạy qua cách thức nào dưới đây?</h4>
                <div className={cx('item')}>
                    <input type="radio" id="option1" name="teachingMethod" value="chuyenMon" onChange={(e) => handleCheckboxChange(e)} />
                    <label htmlFor="option1">Giảng dạy trực tiếp, có chuyên môn</label>
                </div>
                <div className={cx('item')}>
                    <input type="radio" id="option2" name="teachingMethod" value="chuachungnhan" onChange={(e) => handleCheckboxChange(e)} />
                    <label htmlFor="option2">Giảng dạy trực tiếp, chưa có chứng nhận giảng dạy</label>
                </div>
                <div className={cx('item')}>
                    <input type="radio" id="option3" name="teachingMethod" value="online" onChange={(e) => handleCheckboxChange(e)} />
                    <label htmlFor="option3">Dạy online</label>
                </div>
                <div className={cx('item')}>
                    <input type="radio" id="option4" name="teachingMethod" value="other" onChange={(e) => handleCheckboxChange(e)} />
                    <label htmlFor="option4">Khác</label>
                </div>
            </div>

            <div className={cx('body-item')}>
                <h4>Bạn đã từng có kinh nghiệm giảng dạy bao lâu?</h4>
                <div className={cx('item')}>
                    <input type="radio" id="experience1" name="teachingExperience" value="over10years" onChange={(e) => handleCheckboxChange(e)} />
                    <label htmlFor="experience1">Trên 10 năm</label>
                </div>
                <div className={cx('item')}>
                    <input type="radio" id="experience2" name="teachingExperience" value="over3years" onChange={(e) => handleCheckboxChange(e)} />
                    <label htmlFor="experience2">Trên 3 năm và nhỏ hơn 10 năm</label>
                </div>
                <div className={cx('item')}>
                    <input type="radio" id="experience3" name="teachingExperience" value="over1year" onChange={(e) => handleCheckboxChange(e)} />
                    <label htmlFor="experience3">Trên 1 năm</label>
                </div>
                <div className={cx('item')}>
                    <input type="radio" id="experience4" name="teachingExperience" value="knowledgeNoExperience" onChange={(e) => handleCheckboxChange(e)} />
                    <label htmlFor="experience4">Tôi có kiến thức nhưng chưa có kinh nghiệm giảng dạy</label>
                </div>
            </div>

            <div className={cx('body-item')}>
                <h4>Bạn giảng dạy chuyên về môn học gì?</h4>
                {
                    subjects?.map(({ id, name }, index) => {
                        return (
                            <div className={cx('item')}>
                                <input type="checkbox" name={name} value={name} checked={checkedState[index]} onChange={() => handleOnChange(index)} />
                                <p>{name}</p>
                            </div>
                        )
                    })
                }
            </div>
            <div className={cx('btn')}>
                <button onClick={handleRedirect}>Tiếp</button>
            </div>
        </div>
    );
};

export default RegisterTecher1;
