import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Contact from './components/Contact/Contact';
import Course from './pages/Course/Course';
import CreateCourse from './pages/Course/creates';
import Home from './pages/Home/Home';
import HomeGV from './pages/Home/HomeGV';
import Login from './pages/Login/Login';
import Profile from './pages/Profile/Profile';
import Student from './pages/Student/Student';
import Teacher from './pages/Teacher/Teacher';
import { publicRoutes } from './routes';

const isAuthenticated = !!localStorage.getItem('token');
const userRole = localStorage.getItem('role');

const studentRoutes = [
    { path: '/user', component: Home },
    { path: '/user/profile', component: Profile },
    { path: '/course', component: Course },
    { path: '/teacher', component: Teacher },
    { path: '/user/contact', component: Contact },
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

