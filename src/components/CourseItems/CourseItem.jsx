import styles from './courseItem.module.css';
import React from 'react';
import image from '../../assests/sourse/sourse.png';

const CourseItem = () => {
    return (
        /* container */
        <div className={styles.course}>
            <div className={styles.containerCourse}>
                <div className={styles.top}>
                    <div className={styles.img}>
                        <img src={image} alt="" />
                    </div>
                    <div className={styles.containerSub}>
                        <div className={styles.containerSubTop}>
                            <div className={styles.containerSubTopLeft}>
                                <div className={styles.containerSubTopLeftItem}>
                                    <p className={styles.containerSubTopLeftItemP}>4 tuần</p>
                                </div>
                                <div className={styles.containerSubTopLeftItem}>
                                    <p className={styles.containerSubTopLeftItemP}>Thiết kế</p>
                                </div>
                                <div className={styles.containerSubTopLeftItem}>
                                    <p className={styles.containerSubTopLeftItemP}>Sinh viên</p>
                                </div>
                            </div>
                            <div className={styles.containerSubTopRight}>
                                <p className={styles.name}>John Smith</p>
                            </div>
                        </div>
                        <div className={styles.containerSubBt}>
                            <div className={styles.containerSubBtHead}>
                                <h4 className={styles.containerSubBtHeadNt}>Nghệ thuật sáng tạo</h4>
                            </div>
                            <div className={styles.containerSubBtPara}>
                                <p className={styles.containerSubBtParaP}>
                                    Khám phá quá trình sáng tạo và phát triển khả năng tư duy sáng tạo thông qua nghệ
                                    thuật, thiết kế và ý tưởng sáng tạo.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.btn}>
                <button className={styles.bt}>Tham gia ngay</button>
            </div>
        </div>
    );
};

export default CourseItem;
