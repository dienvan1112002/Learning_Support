import React, { useState } from 'react';
import repository from 'src/repositories/repository';

function OrderForm() {
    const [formData, setFormData] = useState({
        amount: '',
        bankCode: '',
        language: 'vn'
    });

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        let res = await repository.orderRecharge(formData)
        window.location.href = res.data.vnpUrl
    };

    return (
        <form id="createOrder" onSubmit={handleSubmit}>
            <div className="table-responsive">
                <div className="form-group">
                    <label htmlFor="amount">Số tiền</label>
                    <input
                        type="text"
                        className="form-control"
                        id="amount"
                        name="amount"
                        placeholder="Số tiền"
                        value={formData.amount}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Chọn Phương thức thanh toán:</label>
                    <div className="controls">
                        <label className="radio-inline">
                            <input
                                type="radio"
                                name="bankCode"
                                id="defaultPaymentMethod"
                                value=""
                                checked={formData.bankCode === ''}
                                onChange={handleChange}
                            /> Cổng thanh toán VNPAYQR
                        </label>
                        <label className="radio-inline">
                            <input
                                type="radio"
                                name="bankCode"
                                id="vnpayqrPaymentMethod"
                                value="VNPAYQR"
                                checked={formData.bankCode === 'VNPAYQR'}
                                onChange={handleChange}
                            /> Thanh toán qua ứng dụng hỗ trợ VNPAYQR
                        </label>

                        <label className="radio-inline">
                            <input
                                type="radio"
                                name="bankCode"
                                id="vnbankPaymentMethod"
                                value="VNBANK"
                                checked={formData.bankCode === 'VNBANK'}
                                onChange={handleChange}
                            /> Thanh toán qua ATM-Tài khoản ngân hàng nội địa
                        </label>

                        <label className="radio-inline">
                            <input
                                type="radio"
                                name="bankCode"
                                id="intcardPaymentMethod"
                                value="INTCARD"
                                checked={formData.bankCode === 'INTCARD'}
                                onChange={handleChange}
                            /> Thanh toán qua thẻ quốc tế
                        </label>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="language">Ngôn ngữ</label>
                    <div className="controls">
                        <label className="radio-inline">
                            <input
                                type="radio"
                                name="language"
                                id="vnLanguage"
                                value="vn"
                                checked={formData.language === 'vn'}
                                onChange={handleChange}
                            /> Tiếng việt
                        </label>
                        <label className="radio-inline">
                            <input
                                type="radio"
                                name="language"
                                id="enLanguage"
                                value="en"
                                checked={formData.language === 'en'}
                                onChange={handleChange}
                            /> Tiếng anh
                        </label>
                    </div>
                </div>
                <button type="submit" className="btn btn-default" id="btnPopup">
                    Thanh toán
                </button>
            </div>
        </form>
    );
}

export default OrderForm;