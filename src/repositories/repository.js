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
  updateLesson
};