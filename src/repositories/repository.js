import api from './api';

const login = (credentials) => {
  return api.post('/auth/signin', credentials);
};

const teacher = (credentials) => {
  return api.get('api/instructor/info', credentials);
}

const courseOfInstructor = () => {
  return api.get('api/instructor/course');
}

const listCourse = () => {
  return api.get('api/user/course');
}

const registerCourseOfInstructor = (credentials) => {
  return api.post('api/instructor/course', credentials);
}

export default {
  login,
  teacher,
  courseOfInstructor,
  registerCourseOfInstructor,
  listCourse
};