import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Contact from './components/Contact/Contact';
import Course from './pages/Course/Course';
import CreateCourse from './pages/Course/creates';
import HomeGV from './pages/Home/HomeGV';
import Login from './pages/Login/Login';
import Profile from './pages/Profile/Profile';
import Student from './pages/Student/Student';
import Teacher from './pages/Teacher/Teacher';
import ChangePassword from './pages/UserProfile/ChangePassword';
import MainProfile from './pages/UserProfile/MainProfile';
import NotiSetting from './pages/UserProfile/NotiSetting';
import UserPayment from './pages/UserProfile/UserPayment';
import { publicRoutes } from './routes';

const isAuthenticated = !!localStorage.getItem('token');
const userRole = localStorage.getItem('role');

const studentRoutes = [
    { path: '/course', component: Course },
    { path: '/teacher', component: Teacher },
    { path: '/user/contact', component: Contact },
    { path: '/user/profile', component: MainProfile },
    { path: '/user/change-password', component: ChangePassword },
    { path: '/user/notification-settings', component: NotiSetting },
    { path: '/user/payment', component: UserPayment },
];

const instructorRoutes = [
    { path: '/instructor', component: HomeGV },
    { path: '/instructor/profile', component: Profile },
    { path: '/instructor/course', component: Course },
    { path: '/instructor/student', component: Student },
    { path: '/instructor/course/create', component: CreateCourse },
];

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    {publicRoutes.map((route, index) => (
                        <Route key={index} path={route.path} element={<route.component />} />
                    ))}

                    {isAuthenticated && userRole === 'student' &&
                        (
                            studentRoutes.map((route, index) => (
                                <Route key={index} path={route.path} element={<route.component />} />
                            ))
                        )
                    }

                    {isAuthenticated && userRole === 'instructor' &&
                        (
                            instructorRoutes.map((route, index) => (
                                <Route key={index} path={route.path} element={<route.component />} />
                            ))
                        )
                    }

                    {!isAuthenticated && <Route path="/login" element={<Login />} />}
                </Routes>
            </div>
        </Router>
    );
}

export default App;

