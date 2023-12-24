import React from 'react'
import styles from './HeaderGV.module.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)
const navLinks = [
  {
    display: 'Trang chủ',
    url: '/user',
  },
  {
    display: 'Khóa học',
    url: '/user/course',
  },

  {
    display: 'Giảng Viên',
    url: '/user/teacher',
  },
  {
    display: 'Liên Hệ',
    url: '/user/contact',
  },
];

const HeaderGv = () => {
  return (
    <div className={cx('container')}>

    </div>
  )
}

export default HeaderGv
