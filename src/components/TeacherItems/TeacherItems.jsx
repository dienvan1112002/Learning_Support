import React from 'react';
import styles from './TeacherItems.module.css';
import green from '../../assests/teacher/teacher-active/Chamxanh.png';
import star from '../../assests/teacher/teacher-active/Star.png';

const TeacherItems = ({ ins }) => {
    const showProfile = (id) => {
        console.log(id);
    }
    return (
        <div className={styles.container}>
            <div className={styles.img}>
                <img src={ins.image} alt="" />
            </div>
            <div className={styles.info}>
                <div className={styles.avt}>
                    <div className={styles.avtCon}>
                        <img src={ins.image} alt="" />
                    </div>
                    <div className={styles.infoActive}>
                        <div className={styles.infoName}>
                            <h3 className={styles.infoNameH}>{ins.user.name}</h3>
                        </div>
                        <div className={styles.active}>
                            <div>
                                <img src={green} alt="" />
                            </div>
                            <p className={styles.activeP}>{ins.active_status === 'online' ? 'Đang hoạt động' : 'Không hoạt động'}</p>
                        </div>
                    </div>
                    <div className={styles.star}>

                        {ins.avg_rating && (
                            <><div className="w-6 h-6">
                                <img src={star} alt="" />
                            </div><p className={styles.starP}>{ins.avg_rating}</p></>
                        )}
                    </div>
                </div>
                <div className={styles.subject}>
                    {ins.subjects.map(sub => <p className={styles.subjectP}>{sub}</p>)}
                </div>
                <div className={styles.para}>
                    <p className={styles.paraP}>{ins.description}</p>
                </div>
            </div>
            <div className={styles.btn}>
                <button className={styles.bt} onClick={showProfile(ins._id)}>Xem hồ sơ</button>
            </div>
        </div>
    );
};

export default TeacherItems;
