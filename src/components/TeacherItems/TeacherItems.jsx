import React from 'react';
import styles from './TeacherItems.module.css';
import teacher from '../../assests/teacher/teacher.png';
import teacherAvt from '../../assests/teacher/teacher_avt/teacherAvt.png';
import green from '../../assests/teacher/teacher-active/Chamxanh.png';
import star from '../../assests/teacher/teacher-active/Star.png';
const TeacherItems = () => {
    return (
        <div className={styles.container}>
            <div className={styles.img}>
                <img src={teacher} alt="" />
            </div>
            <div className={styles.info}>
                <div className={styles.avt}>
                    <div className={styles.avtCon}>
                        <img src={teacherAvt} alt="" />
                    </div>
                    <div className={styles.infoActive}>
                        <div className={styles.infoName}>
                            <h3 className={styles.infoNameH}>Sandesh Koshti</h3>
                        </div>
                        <div className={styles.active}>
                            <div>
                                <img src={green} alt="" />
                            </div>
                            <p className={styles.activeP}>Đang hoạt động</p>
                        </div>
                    </div>
                    <div className={styles.star}>
                        <div className="w-6 h-6">
                            <img src={star} alt="" />
                        </div>
                        <p className={styles.starP}>4.9 (250)</p>
                    </div>
                </div>
                <div className={styles.subject}>
                    <p className={styles.subjectP}>Công nghệ thông tin</p>
                    <p className={styles.subjectP}>Lập trình c</p>
                </div>
                <div className={styles.para}>
                    <p className={styles.paraP}>Nhận dạy tất cả các môn đại cương và thiết kế</p>
                </div>
            </div>
            <div className={styles.btn}>
                <button className={styles.bt}>Xem hồ sơ</button>
            </div>
        </div>
    );
};

export default TeacherItems;
