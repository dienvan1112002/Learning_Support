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

export default {
  login,
  teacher,
  courseOfInstructor
};