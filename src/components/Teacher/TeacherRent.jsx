import React, { useEffect, useState } from 'react';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { useNavigate, useParams } from 'react-router-dom';
import repository from 'src/repositories/repository';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './index.css'
import { onMessageListener } from 'src/firebase';

const TeacherRent = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [instructor, setInstructor] = useState(null);
    const [user, setUser] = useState(null);
    const [selectedSubject, setSelectedSubject] = useState('');
    const [selectedDateTime, setSelectedDateTime] = useState(new Date());
    const [selectedHour, setSelectedHour] = useState('');
    const [desc, setDesc] = useState('')

    const handleHourChange = (e) => {
        setSelectedHour(e.target.value);
    };

    const handleDateTimeChange = (date) => {
        setSelectedDateTime(date);
    };

    const handleSubjectChange = (e) => {
        setSelectedSubject(e.target.value);
    };

    useEffect(() => {
        const teacher = async () => {
            const teacherInfo = await repository.teacherDetail(id);
            setInstructor(teacherInfo.data.data)
        }

        const detailUSer = async () => {
            const userInfo = await repository.getInfoUser();
            setUser(userInfo.data.data)
        }
        teacher();
        detailUSer();
    }, [])

    const calculateCost = () => {
        if (selectedHour !== '') {
            const cost = parseInt(selectedHour, 10) * instructor?.price;
            return cost.toLocaleString();
        }
        return '';
    };

    const saveRent = async () => {
        const currentToken = localStorage.getItem('fcm_token');
        if (calculateCost() > user?.balance) {
            alert('Tài khoản không đủ, nạp thêm tiền để thử lại');
        }
        const rentData = {
            user: user,
            instructor: instructor._id,
            time: selectedHour,
            timeStart: selectedDateTime,
            roomId: '',
            status: 'waiting',
            description: desc,
            subject: selectedSubject
        };

        const db = getFirestore();
        const rentsCollection = collection(db, 'rents');

        await addDoc(rentsCollection, rentData);

        const res = await repository.rentInstructor(id, {
            time: +selectedHour,
            timeStart: selectedDateTime,
            subject: selectedSubject,
            description: desc
        });

        if (res.data.status == "success") {
            alert('Yêu cầu thuê thành công, vui lòng chờ giảng viên chấp nhận.');
            navigate('/rent');
        }

        if (currentToken) {
            fetch('https://fcm.googleapis.com/fcm/send', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'key=AAAAd0Bm2dY:APA91bE0b0wswqjvWDOMwjyFW9DiK0d1SOdKbzzseV5HrWKcLzEj9BCC10ywd22cc9emdDdCPyT_PIT8w3U52IUQdm1ysbRkO9bS9lESpGgkxiLQb2MmwdDe-5LoGQ2pzZl6Sj26ronD',
                },
                body: JSON.stringify({
                    to: currentToken,
                    notification: {
                        title: 'Rent Saved!',
                        body: 'Your rent has been saved successfully.',
                        click_action: window.location.href,
                    },
                }),
            })
                .then(response => {
                    console.log('Notification sent successfully:', response);
                })
                .catch(error => {
                    console.error('Error sending notification:', error);
                });
        } else {
            console.error('No FCM token available. Make sure to call requestForToken after login.');
        }
    }

    useEffect(() => {
        onMessageListener().then(data => {
            console.log("Receive foreground: ", data)
        })
    })

    return (
        <div className='row'>
            <div className="card rent-info">
                <h1 style={{ textAlign: 'center' }}>THUÊ GIẢNG VIÊN</h1>
                <div style={{ border: '1px solid gray', padding: '15px' }}>
                    <div className="mb-4 row" style={{ alignItems: 'center' }}>
                        <label className="col-sm-4 col-form-label">Giảng viên:</label>
                        <div className="col-sm-8">
                            <input type="text" readOnly className="form-control-plaintext" name="username" value={instructor?.user.name} />
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
                                {instructor?.subjects.map((subject) => (
                                    <option key={subject} value={subject}>
                                        {subject}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="mb-4 row" style={{ alignItems: 'center' }}>
                        <label className="col-sm-4 col-form-label">Thời gian bắt đầu:</label>
                        <div className="col-sm-8">
                            <DatePicker
                                selected={selectedDateTime}
                                onChange={handleDateTimeChange}
                                showTimeSelect
                                timeFormat="HH:mm"
                                dateFormat="Pp"
                                className="custom-datepicker"
                            />
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
                                {[...Array(24).keys()].map((hour) => (
                                    <option key={hour + 1} value={hour + 1}>
                                        {hour + 1}
                                    </option>
                                ))}
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
                                value={calculateCost()}
                            />
                        </div>
                    </div>
                    <div className="mb-4 row" style={{ alignItems: 'center' }}>
                        <label className="col-sm-4 col-form-label">Số dư hiện tại:</label>
                        <div className="col-sm-8">
                            <input type="text" readOnly className="form-control-plaintext" name='curMoney' value={user?.balance.toLocaleString()} />
                        </div>
                    </div>
                    <div className="mb-4 row" style={{ alignItems: 'center' }}>
                        <label className="col-sm-4 col-form-label">Mô tả:</label>
                        <div className="col-sm-8">
                            <input type="text" className="form-control-plaintext" name='desc' onChange={(e) => setDesc(e.target.value)} />
                        </div>
                    </div>
                </div>
                <div style={{ display: 'flex', gap: '10px', padding: '10px' }}>
                    <button onClick={() => saveRent()} style={{ width: '50px' }} className='btn btn-info'>Thue</button>
                    <button onClick={() => navigate(`/teacher/${id}`)} style={{ width: '50px' }} className='btn btn-danger'>Dong</button>
                </div>
            </div>
        </div>
    );
}

export default TeacherRent;
