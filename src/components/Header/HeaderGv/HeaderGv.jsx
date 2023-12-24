import React from 'react'
import styles from './HeaderGV.module.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)
const navLinks = [
  {
    display: 'Trang chủ',
    url: '/instructor',
  },
  {
    display: 'Khóa học',
    url: '/instructor/course',
  },

  {
    display: 'Giảng Viên',
    url: '/instructor/teacher',
  },
  {
    display: 'Liên Hệ',
    url: '/instructor/contact',
  },
];

const HeaderGv = () => {
  return (
    <div className={cx('container')}>

    </div>
  )
}

export default HeaderGv
