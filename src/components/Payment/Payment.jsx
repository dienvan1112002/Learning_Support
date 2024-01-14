import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import repository from 'src/repositories/repository';
import './Payment.css'

const Payment = () => {
    const [course, setCourse] = useState(null);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const { id } = useParams();
    useEffect(() => {
        const getCourse = async () => {
            let res;
            res = await repository.getCourseByUserOrInstructor(id);
            setCourse(res.data.data);
        }
        getCourse();
    }, [])

    useEffect(() => {
        const getUser = async () => {
            let res;
            res = await repository.getInfoUser();
            setUser(res.data.data);
        }
        getUser();
    }, [])

    const handlePayment = async (e) => {
        e.preventDefault()
        try {
            const res = await repository.payment(id);
            console.log(res);
            if (res.data.data) {
                navigate(`/course/${id}`);
            }
        } catch (error) {
            if (error.response.status == 402) {
                alert(error.response.data.message)
                navigate(`/course/${id}`);
            }
        }
    }

    return (
        <div className="row">
            <div className="content-wrapper">
                <form>
                    <div class="mb-3">
                        <label class="form-label">Tên khóa học: </label>
                        <input disabled type="text" id="nameCourse" class="form-control" value={course?.title} />
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Giá: </label>
                        <input disabled type="text" id="priceCourse" class="form-control" value={course?.price} />
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Số dư tài khoản: </label>
                        <input disabled type="text" id="balanceUser" class="form-control" value={user?.balance} />
                    </div>
                    <button type="submit" class="btn btn-primary" onClick={(e) => handlePayment(e)}>Submit</button>
                </form>
            </div>

        </div>
    );
}

export default Payment;
