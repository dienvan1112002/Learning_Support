import api from './api';

const login = (credentials) => {
  return api.post('/auth/signin', credentials);
};

const teacher = (credentials) => {
  return api.get('api/instructor/info', credentials);
}

const teacherInfo = () => {
  return api.get('/instructor/info');
}

const courseOfInstructor = () => {
  return api.get('api/instructor/course');
}

const listCourse = (credentials) => {
  return api.get('/course', credentials);
}

const listInstructorSearch = (credentials) => {
  return api.get('/instructor', credentials);
}

const getCourseByUserOrInstructor = (id) => {
  return api.get(`/api/user/course/${id}`);
}

const courseById = (id) => {
  return api.get(`/course/${id}`);
}

const teacherDetail = (id) => {
  return api.get(`/instructor/${id}`)
}

const teacherDetailAPI = (id) => {
  return api.get(`/api/user/instructor/${id}`)
}

const registerCourseOfInstructor = (credentials) => {
  return api.post('api/instructor/course', credentials);
}

const instructorInfo = () => {
  return api.get('/api/instructor/info');
}

const updateInfo = (credentials) => {
  return api.put('/api/instructor/info', credentials);
}

const createChapter = (credentials) => {
  return api.post('/api/instructor/chapter', credentials)
}

const updateChapter = (id, credentials) => {
  return api.put(`/api/instructor/chapter/${id}`, credentials)
}

const updateCourse = (id, credentials) => {
  return api.put(`/api/instructor/course/${id}`, credentials)
}

const createLesson = (credentials) => {
  return api.post('/api/instructor/lesson', credentials)
}

const createQuizz = (credentials) => {
  return api.post('/api/instructor/quizz', credentials)
}

const createVideo = (credentials) => {
  return api.post('/api/instructor/video', credentials)
}

const updateLesson = (id, credentials) => {
  return api.put(`/api/instructor/lesson/${id}`, credentials)
}

const listAllTeacher = (credentials = null) => {
  if (credentials) return api.get('/instructor?status=online');
  return api.get('/instructor?sort=DSC');
}

const listNewTeacher = () => {
  return api.get('/instructor?value_sort=createdAt');
}

const updateFollowStatusInstructor = (id) => {
  return api.put(`/api/user/instructor/${id}/follow`);
}

const updateBookmark = (id) => {
  return api.put(`/api/user/course/${id}/bookmarked`);
}

const getCourseBookmark = () => {
  return api.get('/api/user/course/bookmarked');
}

const getCourseWatching = () => {
  return api.get('/api/user/course/watching');
}

const getInfoUser = () => {
  return api.get(`/api/user/info`);
}

const updateUserInfo = (credentials) => {
  return api.put('/api/user/info', credentials);
}

const updatePassword = (credentials) => {
  return api.put('/api/user/change-password', credentials);
}

const payment = (id) => {
  return api.post(`/api/user/course/${id}/registration`)
}

const studentWaitForConfirmation = (status) => {
  return api.get(`/api/instructor/rent?status=${status}`);
}

const rentInstructor = (id, credentials) => {
  return api.post(`/api/user/instructor/${id}/rent`, credentials);
}

const getTransactionHistory = () => {
  return api.get('/api/user/transaction-history');
}

const orderRecharge = (credentials) => {
  return api.post(`/api/user/recharge`, credentials);
}

const returnVNP = (credentials) => {
  console.log("credentials == ", credentials);
  let url = '/api/user/vnpay_return?';
  for (const key in credentials) {
    if (Object.hasOwnProperty.call(credentials, key)) {
      const element = credentials[key];
      url += `${key}=${element}&`
    }
  }
  return api.get(url);
}

const registerInstructor = (credentials) => {
  return api.post('/api/user/register-instructor', credentials)
}

const checkRegisterInstructor = () => {
  return api.get('/api/user/status-instructor');
}

export default {
  login,
  teacher,
  courseOfInstructor,
  registerCourseOfInstructor,
  listCourse,
  teacherInfo,
  courseById,
  teacherDetail,
  instructorInfo,
  createChapter,
  updateChapter,
  updateCourse,
  createLesson,
  createQuizz,
  createVideo,
  updateLesson,
  listAllTeacher,
  listNewTeacher,
  updateInfo,
  updateFollowStatusInstructor,
  teacherDetailAPI,
  updateBookmark,
  getCourseByUserOrInstructor,
  getInfoUser,
  payment,
  studentWaitForConfirmation,
  rentInstructor,
  getCourseBookmark,
  getCourseWatching,
  updateUserInfo,
  updatePassword,
  getTransactionHistory,
  orderRecharge,
  returnVNP,
  registerInstructor,
  checkRegisterInstructor,
  listInstructorSearch
};