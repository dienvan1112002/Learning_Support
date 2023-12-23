import Home from '../pages/Home/Home.jsx'
import Login from "../pages/Login/Login.jsx";
import SignUp from 'src/pages/SignUp/SignUp.jsx';
import Course from '../pages/Course/Course.jsx';
import Teacher from '../pages/Teacher/Teacher.jsx';
import Contact from '../pages/Contact/Contact.jsx';
import Profile from '../pages/Profile/Profile.jsx'
import Switch from 'src/components/Btn/Switch.jsx';
import DKGiangVien1 from 'src/pages/DangKiGiangVien/DKGiangVien1.jsx';
import DKGiangVien from 'src/pages/DangKiGiangVien/DKGiangVien.jsx';
import HienThi from 'src/components/Teacher/Register/HienThiChungChi/HienThi.jsx';
import CreateCourse from '../pages/Course/creates/index.jsx';

const publicRoutes = [
    { path: '/', component: Home },
    { path: '/course', component: Course },
    { path: '/teacher', component: Teacher },
    { path: '/contact', component: Contact },
    { path: '/profile', component: Profile, },
    { path: '/login', component: Login, },
    { path: '/signup', component: SignUp, },
    { path: '/switch', component: Switch, },
    { path: '/dkgv', component: DKGiangVien, },
    { path: '/dkgv1', component: DKGiangVien1, },
    { path: '/test', component: HienThi, },
    { path: '/course/create', component: CreateCourse},

]

const privateRoutes = [

]

export { publicRoutes, privateRoutes }