import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from "react-router-dom"
import Sidebar from 'src/components/Sidebar/Sidebar';
import formatDate from 'src/helper/formatDate';
import numberWithCommas from 'src/helper/formatNumber';
import repository from 'src/repositories/repository';
import './index.css'

const UserPayment = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [transaction, setTransaction] = useState(null);
    const location = useLocation()
    const params = new URLSearchParams(location.search)

    useEffect(() => {
        const getUser = async () => {
            let res = await repository.getInfoUser();
            setUser(res.data.data)
        }
        const getTransaction = async () => {
            let response = await repository.getTransactionHistory();
            setTransaction(response.data.data)
        }

        getTransaction()
        getUser()
    }, [])

    useEffect(() => {
        if (params) {
            const payment = async () => {
                let res = await repository.returnVNP({
                    vnp_Amount: params.get('vnp_Amount'),
                    vnp_BankCode: params.get('vnp_BankCode'),
                    vnp_BankTranNo: params.get('vnp_BankTranNo'),
                    vnp_CardType: params.get('vnp_CardType'),
                    vnp_OrderInfo: params.get('vnp_OrderInfo'),
                    vnp_PayDate: params.get('vnp_PayDate'),
                    vnp_ResponseCode: params.get('vnp_ResponseCode'),
                    vnp_TmnCode: params.get('vnp_TmnCode'),
                    vnp_TransactionNo: params.get('vnp_TransactionNo'),
                    vnp_TransactionStatus: params.get('vnp_TransactionStatus'),
                    vnp_TxnRef: params.get('vnp_TxnRef'),
                    vnp_SecureHash: params.get('vnp_SecureHash')
                });
                if (res.data.status == "success") {
                    alert("Nạp tiền thành công!")
                    window.location.href = window.location.pathname
                }
            }
            payment()
        }
    }, [])

    const renderCard = (payment) => {
        if (payment.status == "recharge")
            return (
                <div className='row' style={{ display: 'flex', alignItems: 'center' }}>
                    <div className="col-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="59" height="64" viewBox="0 0 59 64" fill="none">
                            <path d="M1.5 57.1909C16.067 57.1909 30.1789 59.0027 43.5894 62.3972C45.5264 62.8875 47.4614 61.5482 47.4614 59.6813V57.1909M5.49665 21.8828V23.7411C5.49665 24.7675 4.60197 25.5995 3.49832 25.5995H1.5M1.5 25.5995V24.6703C1.5 23.1308 2.84202 21.8828 4.49748 21.8828H49.4598M1.5 25.5995V47.8993M49.4598 21.8828V23.7411C49.4598 24.7675 50.3544 25.5995 51.4581 25.5995H53.4564M49.4598 21.8828H50.4589C52.1144 21.8828 53.4564 23.1308 53.4564 24.6703V48.8284C53.4564 50.3679 52.1144 51.6159 50.4589 51.6159H49.4598M53.4564 47.8993H51.4581C50.3544 47.8993 49.4598 48.7313 49.4598 49.7576V51.6159M49.4598 51.6159H5.49665M5.49665 51.6159H4.49748C2.84202 51.6159 1.5 50.3679 1.5 48.8284V47.8993M5.49665 51.6159V49.7576C5.49665 48.7313 4.60197 47.8993 3.49832 47.8993H1.5M35.4715 36.7494C35.4715 40.8546 31.8928 44.1826 27.4782 44.1826C23.0636 44.1826 19.4849 40.8546 19.4849 36.7494C19.4849 32.6441 23.0636 29.3161 27.4782 29.3161C31.8928 29.3161 35.4715 32.6441 35.4715 36.7494ZM43.4648 36.7494H43.4848V36.7679H43.4648V36.7494ZM11.4916 36.7494H11.5116V36.7679H11.4916V36.7494Z" stroke="#5773BA" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M45.0188 4.15819C45.0188 2.62295 43.7031 1.5 42.2357 1.5C40.7682 1.5 39.4525 2.62295 39.4525 4.15819V13.1073H29.7538C28.2864 13.1073 26.9707 14.2303 26.9707 15.7655C26.9707 17.3008 28.2864 18.4237 29.7538 18.4237L39.4525 18.4237V27.3729C39.4525 28.9081 40.7682 30.0311 42.2357 30.0311C43.7031 30.0311 45.0188 28.9081 45.0188 27.3729V18.4237L54.7175 18.4237C56.1849 18.4237 57.5006 17.3008 57.5006 15.7655C57.5006 14.2303 56.1849 13.1073 54.7175 13.1073H45.0188V4.15819Z" fill="#5773BA" stroke="white" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                    </div>
                    <div className="col-8">
                        <p className='action-detail'>Nạp tiền</p>
                        <p className='action-date'>{formatDate(payment.createdAt)}</p>
                    </div>
                    <div className="col-2">
                        <p className='money-detail'>+{numberWithCommas(payment.cost) ?? 0}</p>
                    </div>
                </div>
            )
        else if (payment.status == "withdraw")
            return (
                <div className='row' style={{ display: 'flex', alignItems: 'center' }}>
                    <div className="col-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="58" height="54" viewBox="0 0 58 54" fill="none">
                            <path d="M6.81835 31.4232C8.00021 43.0401 17.9302 52.334 31.6373 52.334C45.3445 52.334 56.4563 41.4123 56.4563 27.9391C57.6382 8.18944 34.592 -5.75017 16.2732 7.60878M6.81835 31.4232L1.5 40.7167M6.81835 31.4232L16.2732 36.5632M31.6373 11.675V44.2022M23.3643 36.5632L25.788 38.35C29.0187 40.7317 34.2566 40.7317 37.4873 38.35C40.718 35.9682 40.718 32.1066 37.4873 29.7249C35.8718 28.5339 33.7544 27.9385 31.637 27.9386C29.6379 27.9387 27.6393 27.3433 26.114 26.1523C23.0638 23.7706 23.0638 19.909 26.114 17.5273C29.1642 15.1455 34.1097 15.1455 37.1599 17.5273L38.3041 18.4207" stroke="#5773BA" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <div className="col-8">
                        <p className='action-detail'>Hoàn tiền</p>
                        <p className='action-date'>{formatDate(payment.createdAt)}</p>
                    </div>
                    <div className="col-2">
                        <p className='money-detail'>-{numberWithCommas(payment.cost) ?? 0}</p>
                    </div>
                </div>
            )
        else return (
            <div className='row' style={{ display: 'flex', alignItems: 'center' }}>
                <div className="col-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="56" height="46" viewBox="0 0 56 46" fill="none">
                        <path d="M28 11.5284C24.7455 11.5284 22.1071 13.96 22.1071 16.9596C22.1071 19.9591 24.7455 22.3907 28 22.3907C31.2545 22.3907 33.8929 19.9591 33.8929 16.9596C33.8929 13.96 31.2545 11.5284 28 11.5284Z" fill="#5773BA" />
                        <path fillRule="evenodd" clipRule="evenodd" d="M0.5 5.192C0.5 2.69237 2.6986 0.666016 5.41071 0.666016H50.5893C53.3014 0.666016 55.5 2.69237 55.5 5.192V28.7271C55.5 31.2268 53.3014 33.2531 50.5893 33.2531H5.41071C2.6986 33.2531 0.5 31.2268 0.5 28.7271V5.192ZM18.1786 16.9596C18.1786 11.9603 22.5758 7.90759 28 7.90759C33.4242 7.90759 37.8214 11.9603 37.8214 16.9596C37.8214 21.9588 33.4242 26.0115 28 26.0115C22.5758 26.0115 18.1786 21.9588 18.1786 16.9596ZM45.6786 15.1492C44.5937 15.1492 43.7143 15.9597 43.7143 16.9596V16.9777C43.7143 17.9775 44.5937 18.7881 45.6786 18.7881H45.6982C46.7831 18.7881 47.6625 17.9775 47.6625 16.9777V16.9596C47.6625 15.9597 46.7831 15.1492 45.6982 15.1492H45.6786ZM8.35714 16.9596C8.35714 15.9597 9.23658 15.1492 10.3214 15.1492H10.3411C11.4259 15.1492 12.3054 15.9597 12.3054 16.9596V16.9777C12.3054 17.9775 11.4259 18.7881 10.3411 18.7881H10.3214C9.23658 18.7881 8.35714 17.9775 8.35714 16.9777V16.9596Z" fill="#5773BA" />
                        <path d="M2.46429 36.8739C1.37944 36.8739 0.5 37.6844 0.5 38.6843C0.5 39.6842 1.37944 40.4947 2.46429 40.4947C16.6073 40.4947 30.3054 42.238 43.3208 45.5032C46.439 46.2854 49.6071 44.156 49.6071 41.1105V38.6843C49.6071 37.6844 48.7277 36.8739 47.6429 36.8739H2.46429Z" fill="#5773BA" />
                    </svg>
                </div>
                <div className="col-8">
                    <p className='action-detail'>Thanh toán</p>
                    <p className='action-date'>{formatDate(payment.createdAt)}</p>
                </div>
                <div className="col-2">
                    <p className='money-detail'>-{numberWithCommas(payment.cost) ?? 0}</p>
                </div>
            </div>
        )
    }

    return (
        <div className='row' style={{ height: '100vh' }}>
            <div className='col-3' style={{ backgroundColor: '#7E9CDE' }}>
                <Sidebar user={user} />
            </div>
            <div className='col-9'>
                <div className='content'>
                    <h1>Thông tin tài khoản thanh toán</h1>
                    <h2>Số dư ví: <span className='money'>{numberWithCommas(user?.balance ?? 0)}đ</span></h2>
                    <hr />
                    <div className='card' style={{ width: '476px', margin: '30px auto' }}>
                        <div className="row" style={{ padding: '15px' }}>
                            <div className='cart col-6' onClick={() => navigate('/user/payment/order')}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="73" height="63" viewBox="0 0 73 63" fill="none">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M55.8401 0C56.9845 0 57.9123 0.88901 57.9123 1.98566V13.8996H70.3449C71.4893 13.8996 72.417 14.7886 72.417 15.8853C72.417 16.9819 71.4893 17.8709 70.3449 17.8709L57.9123 17.8709V29.7849C57.9123 30.8815 56.9845 31.7705 55.8401 31.7705C54.6958 31.7705 53.768 30.8815 53.768 29.7849V17.8709H41.3354C40.191 17.8709 39.2633 16.9819 39.2633 15.8853C39.2633 14.7886 40.191 13.8996 41.3354 13.8996H53.768V1.98566C53.768 0.88901 54.6958 0 55.8401 0ZM3.34582 23.828C1.81996 23.828 0.583008 25.0134 0.583008 26.4756V47.6559C0.583008 49.1181 1.81996 50.3035 3.34582 50.3035H47.5507C49.0766 50.3035 50.3136 49.1181 50.3136 47.6559V26.4756C50.3136 25.0134 49.0766 23.828 47.5507 23.828H3.34582ZM25.4483 45.0084C30.0259 45.0084 33.7367 41.4523 33.7367 37.0658C33.7367 32.6792 30.0259 29.1231 25.4483 29.1231C20.8707 29.1231 17.1599 32.6792 17.1599 37.0658C17.1599 41.4523 20.8707 45.0084 25.4483 45.0084ZM11.6342 37.0658C11.6342 38.5279 10.3973 39.7133 8.87143 39.7133C7.34558 39.7133 6.10862 38.5279 6.10862 37.0658C6.10862 35.6035 7.34558 34.4182 8.87143 34.4182C10.3973 34.4182 11.6342 35.6035 11.6342 37.0658ZM42.0251 39.7133C43.551 39.7133 44.7879 38.5279 44.7879 37.0658C44.7879 35.6035 43.551 34.4182 42.0251 34.4182C40.4993 34.4182 39.2623 35.6035 39.2623 37.0658C39.2623 38.5279 40.4993 39.7133 42.0251 39.7133ZM0.583008 56.2605C0.583008 55.1638 1.51072 54.2748 2.65511 54.2748C15.2379 54.2748 27.423 55.9204 38.9872 59.0004C39.5003 59.1371 39.953 58.7631 39.953 58.3351V56.2605C39.953 55.1638 40.8807 54.2748 42.0251 54.2748C43.1695 54.2748 44.0972 55.1638 44.0972 56.2605V58.3351C44.0972 61.4717 40.9482 63.6446 37.8774 62.8267C26.6711 59.842 14.8593 58.2462 2.65511 58.2462C1.51072 58.2462 0.583008 57.3571 0.583008 56.2605Z" fill="#5773BA" />
                                </svg>
                                <p className='action'>Nạp tiền</p>
                            </div>
                            <div className='cart col-6'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="65" height="66" viewBox="0 0 65 66" fill="none">
                                    <path d="M32.5 63V35.5M45 63V35.5M20 63V35.5M2.5 23L32.5 3L62.5 23M57.5 63V27.4417C49.3543 26.1635 41.0046 25.5 32.5 25.5C23.9954 25.5 15.6457 26.1635 7.5 27.4417V63M2.5 63H62.5M32.5 15.5H32.525V15.525H32.5V15.5Z" stroke="#5773BA" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <p className='action'>Rút tiền</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <p>Lịch sử giao dịch</p>
                        {transaction && transaction.map(tr => (
                            renderCard(tr)
                        ))}
                    </div>
                </div>
            </div>
        </div >
    );
}

export default UserPayment;
