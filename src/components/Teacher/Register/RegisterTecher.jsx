import React from 'react';
import styles from './RegisterTecher.module.scss';
import classNames from 'classnames/bind';
import nen from '../../../assests/teacher/nen/nen1.png';

const cx = classNames.bind(styles);
const RegisterTecher = () => {
    return (
        <div className={cx('body')}>
            <div className={cx('body-top')}>
                <div className={cx('body-top-overview')}>
                    <h3>
                        Giảng dạy <br />
                        với Learning Support
                    </h3>

                    <p>Biến những gì bạn biết thành cơ hội và tiếp cận hàng triệu người trên thế giới</p>
                    <button>Bắt đầu ngay</button>
                </div>
                <div className={cx('body-top-img')}>
                    <img src={nen} alt="" />
                </div>
            </div>
            <div className={cx('body-bottom')}>
                <div className={cx('body-bottom-title')}>
                    <h3>Có quá nhiều lí do để bạn bắt đầu việc giảng dạy tại LS</h3>
                </div>
                <div className={cx('body-bottom-content')}>
                    <div className={cx('content-page1')}>
                        <div className={cx('item')}>
                            <h4>Chia sẻ kiến thức và kinh nghiệm của bạn</h4>
                            <p>
                                Nếu bạn có kiến thức và kinh nghiệm về một lĩnh vực nào đó, bạn có thể chia sẽ những
                                kiến thức và kinh nghiệm đó với mọi người thông qua việc giảng dạy
                            </p>
                        </div>
                        <div className={cx('item')}>
                            <h4>Kiếm thêm thu nhập</h4>
                            <p>
                                Nếu bạn có kỹ năng giảng dạy và truyền đạt kiến thức tốt, bạn có thể kiếm được một khoản
                                tiền kha khá từ việc giảng dạy.
                            </p>
                        </div>
                        <div className={cx('item')}>
                            <h4>Dễ dàng giảng dạy</h4>
                            <p>Bạn có thể dạy thông qua việc đăng video hay dạy online kèm 1&1 tại bất cứ lúc nào.</p>
                        </div>
                    </div>
                    <div className={cx('content-page2')}>
                        <div className={cx('item')}>
                            <h4>Tự học và phát triển bản thân</h4>
                            <p>
                                Khi bạn giảng dạy, bạn cần chuẩn bị kỹ lưỡng cho các bài giảng của mình. Điều đó cũng
                                giúp bạn học hỏi thêm về lĩnh vực mà bạn đang giảng dạy.
                            </p>
                        </div>
                        <div className={cx('item')}>
                            <h4>Tiếp cận với nhiều học viên</h4>
                            <p>Bạn có thể giảng dạy cho học viên từ khắp nơi trên thế giới.</p>
                        </div>
                        <div className={cx('item')}>
                            <h4>Bảo đảm quyền lợi giữa 2 bên</h4>
                            <p>
                                LS là nơi đáng tin cậy để bạn bắt đầu giảng dạy mà không lo ngại việc học viên không
                                chịu trả tiền.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterTecher;
