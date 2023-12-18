import React from 'react';


import Footer from '../../../components/Footer/Footer.jsx'
import Course from '../../Course/Course.jsx'
import CourseHead from '../../Course/CourseHead/CourseHead.jsx'
import CourseDetail from '../../CourseDetail/CourseContent/CourseContent.jsx'
import SignUp from '../../../pages/SignUp/SignUp.jsx'

function DefaultLayout({ children }) {
    return (
        <div>
            <SignUp />
        </div>
    )
}

export default DefaultLayout;
