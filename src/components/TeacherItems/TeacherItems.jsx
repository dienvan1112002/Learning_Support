import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './TeacherItems.module.css';
import green from '../../assests/teacher/teacher-active/chamxanh.png';
import red from '../../assests/teacher/teacher-active/chamdo.png';
import star from '../../assests/teacher/teacher-active/Star.png';
import getImageFromBaseURL from 'src/helper/get_image';

const TeacherItems = ({ ins }) => {
    const navigate = useNavigate();

    const showProfile = (id) => {
        console.log("id === ", id);
        navigate(`/teacher/${id}`);
    }

    return (
        <div className={styles.container}>
            <div className={styles.img}>
                <img style={{ height: '100%', width: '100%', borderRadius: '15px' }} src={getImageFromBaseURL(ins.user.image)} alt="" />
            </div>
            <div className={styles.info}>
                <div className={styles.avt}>
                    <div className={styles.avtCon}>
                        <img style={{ borderRadius: '50%', width: '60px', height: '60px' }} src={getImageFromBaseURL(ins.user.image)} alt="" />
                    </div>
                    <div className={styles.infoActive}>
                        <div className={styles.infoName}>
                            <h3 className={styles.infoNameH}>{ins.user.name}</h3>
                        </div>
                        <div className={styles.active}>
                            <div>
                                {ins.active_status === "online" ? (<img src={green} alt="" />) : (<img src={red} alt="" />)}

                            </div>
                            <p className={styles.activeP}>{ins.active_status === 'online' ? 'Đang hoạt động' : 'Không hoạt động'}</p>
                        </div>
                    </div>
                    <div className={styles.star}>
                        {ins.avg_rating > 0 && (
                            <><div className="w-6 h-6">
                                <img src={star} alt="" />
                            </div><p className={styles.starP}>{Math.round(ins.avg_rating * 10) / 10}</p></>
                        )}
                    </div>
                </div>
                <div className={styles.subject}>
                    {ins.subjects.map((sub, index) => <p key={index} className={styles.subjectP}>{sub}</p>)}
                </div>
                <div className={styles.para}>
                    {ins.description.length > 0 ? (<p className={styles.paraP}>{ins.description}</p>) : (<p className={styles.paraP}>Chưa có mô tả</p>)}

                </div>
            </div>
            <div className={styles.btn}>
                <button style={{ color: '#fff' }} onClick={() => showProfile(ins._id)}>Xem hồ sơ</button>
            </div>
        </div>
    );
};

export default TeacherItems;
