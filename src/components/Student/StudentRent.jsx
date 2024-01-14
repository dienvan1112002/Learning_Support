import React from 'react';

const StudentRent = () => {
    return (
        <div className='row'>
            <div className="card rent-info">
                <h1 style={{ textAlign: 'center' }}>THUÊ GIẢNG VIÊN</h1>
                <div style={{ border: '1px solid gray', padding: '15px' }}>
                    <div className="mb-4 row" style={{ alignItems: 'center' }}>
                        <label className="col-sm-4 col-form-label">Giảng viên:</label>
                        <div className="col-sm-8">
                            <input type="text" readOnly className="form-control-plaintext" name="username" />
                        </div>
                    </div>
                    <div className="mb-4 row" style={{ alignItems: 'center' }}>
                        <label className="col-sm-4 col-form-label">Môn học:</label>
                        <div className="col-sm-8">
                            <select
                                id="subject"
                                name="subject"
                                value={selectedSubject}
                                onChange={handleSubjectChange}
                            >
                                <option value="" disabled>Select a subject</option>
                            </select>
                        </div>
                    </div>
                    <div className="mb-4 row" style={{ alignItems: 'center' }}>
                        <label className="col-sm-4 col-form-label">Thời gian bắt đầu:</label>
                        <div className="col-sm-8">
                        </div>
                    </div>
                    <div className="mb-4 row" style={{ alignItems: 'center' }}>
                        <label className="col-sm-4 col-form-label">Thời gian muốn thuê:</label>
                        <div className="col-sm-8">
                            <select
                                id="hour"
                                name="hour"
                                value={selectedHour}
                                onChange={handleHourChange}
                                className="form-control"
                            >
                                <option value="" disabled>Select an hour</option>
                            </select>
                        </div>
                    </div>
                    <div className="mb-4 row" style={{ alignItems: 'center' }}>
                        <label className="col-sm-4 col-form-label">Chi phí:</label>
                        <div className="col-sm-8">
                            <input
                                type="text"
                                readOnly
                                className="form-control-plaintext"
                                name="price"
                            />
                        </div>
                    </div>
                    <div className="mb-4 row" style={{ alignItems: 'center' }}>
                        <label className="col-sm-4 col-form-label">Số dư hiện tại:</label>
                        <div className="col-sm-8">
                            <input type="text" readOnly className="form-control-plaintext" name='curMoney' />
                        </div>
                    </div>
                    <div className="mb-4 row" style={{ alignItems: 'center' }}>
                        <label className="col-sm-4 col-form-label">Mô tả:</label>
                        <div className="col-sm-8">
                            <input type="text" className="form-control-plaintext" name='desc' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StudentRent;
