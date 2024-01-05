import api from './api';

const login = (credentials) => {
  return api.post('/auth/signin', credentials);
};

const teacher = (credentials) => {
  return api.get('api/instructor/info', credentials);
}

const teacherInfo = (id) => {
  return api.get(`/instructor/info/${id}`);
}

const courseOfInstructor = () => {
  return api.get('api/instructor/course');
}

const listCourse = () => {
  return api.get('/course');
}

const courseById = (id) => {
  return api.get(`/course/${id}`);
}

const teacherDetail = (id) => {
  return api.get(`/instructor/${id}`)
}

const registerCourseOfInstructor = (credentials) => {
  return api.post('api/instructor/course', credentials);
}

const instructorInfo = () => {
  return api.get('/api/instructor/info');
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
  instructorInfo
};