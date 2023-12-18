import React from 'react';
import CourseItem from '../../components/CourseItems/CourseItem';
import styles from './CourseSection.module.css';
const CourseSection = () => {
    return (
        <div className={styles.container}>
            <div className={styles.courseSectionHeader}>
                <div className={styles.courseSectionHeaderLeft}>
                    <h4>Khóa học</h4>
                    <p>
                        Trang web của chúng tôi cung cấp đa dạng khoá học cho mọi lứa tuổi, từ học sinh đến người lớn,
                        bao gồm nhiều môn học và lĩnh vực khác nhau. Hãy tham gia để trải nghiệm học tập thú vị và phát
                        triển kiến thức của bạn!
                    </p>
                </div>
                <div className={styles.courseSectionHeaderRight}>
                    <button>Xem thêm</button>
                </div>
            </div>
            <div className={styles.containerItems}>
                <div className={styles.containerItem}>
                    <CourseItem />
                    <CourseItem />
                </div>

                <div className={styles.containerItem}>
                    <CourseItem />
                    <CourseItem />
                </div>
            </div>
        </div>
    );
};

export default CourseSection;
