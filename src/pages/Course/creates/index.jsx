import React, { useState } from 'react';
import styles from './create.module.scss';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import classNames from 'classnames/bind';
import Footer from 'src/components/Footer/Footer';
import subjects from 'src/constant/subject';
import levels from 'src/constant/level';
import repository from 'src/repositories/repository';
import ImageUploading from 'react-images-uploading';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import roleHeaders from '../../../utils/role'

const cx = classNames.bind(styles);

const QuizEditor = ({ content, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleToggleEditor = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            <button onClick={handleToggleEditor}>
                {isOpen ? 'Đóng Editor' : 'Mở Editor'}
            </button>
            {isOpen && (
                <ReactQuill value={content} onChange={onChange} />
            )}
        </div>
    );
};

const CreateCourse = () => {
    const role = localStorage.getItem('role');
    const navigate = useNavigate();
    const [singleImage, setSingleImage] = useState([]);
    const [multipleImages, setMultipleImages] = useState([]);
    const [editingLessonIndex, setEditingLessonIndex] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editingQuizIndex, setEditingQuizIndex] = useState(null);
    const [isAddingQuestion, setIsAddingQuestion] = useState(false);
    const [isEditingTitle, setEditingTitle] = useState(false);
    const [editedQuizTitle, setEditedQuizTitle] = useState('');
    const [isEditingContent, setEditingContent] = useState(false);
    const [editedQuizContent, setEditedQuizContent] = useState('');

    const handleSaveQuizContent = (chapterIndex, lessonIndex, quizIndex) => {
        const newChapters = [...chapters];
        newChapters[chapterIndex].lessons[lessonIndex].quizzes[quizIndex].content = editedQuizContent;
        setChapters(newChapters);
        setEditingContent(false);
    };

    const handleCancelEditingContent = (quizIndex) => {
        setEditingQuizIndex(null);
    };


    const handleSaveQuizTitle = (chapterIndex, lessonIndex, quizIndex) => {
        setEditingTitle(false);
    };

    const handleCancelEditingTitle = () => {
        setEditingTitle(false);
    };

    const handleAddQuestion = (quizIndex) => {
        setEditingQuizIndex(quizIndex);
        setIsAddingQuestion(true);
    };

    const handleDeleteQuestion = (chapterIndex, lessonIndex, quizIndex) => {
        const newChapters = [...chapters];
        newChapters[chapterIndex].lessons[lessonIndex].quizzes.splice(quizIndex, 1);
        setChapters(newChapters);
    };

    const handleAddContent = (lessonIndex) => {
        setEditingLessonIndex(lessonIndex);
        setIsEditing(true);
    };

    const handleEditContent = (lessonIndex) => {
        setEditingLessonIndex(lessonIndex);
        setIsEditing(true);
    };

    const handleEditQuizContent = (chapterIndex, lessonIndex, quizIndex) => {
        setEditingQuizIndex(quizIndex);
        setIsEditing(true);
    };

    const handleSaveContent = (chapterIndex, lessonIndex, content) => {
        const newChapters = [...chapters];
        newChapters[chapterIndex].lessons[lessonIndex].content = content;
        setChapters(newChapters);
        setIsEditing(false);
    };

    const handleCancelEditing = () => {
        setIsEditing(false);
        setEditingLessonIndex(null);
    };

    const handleDeleteLesson = (chapterIndex, lessonIndex) => {
        const newChapters = [...chapters];
        newChapters[chapterIndex].lessons.splice(lessonIndex, 1);
        setChapters(newChapters);
    };

    const [chapters, setChapters] = useState([
        {
            id: 1,
            title: 'Chương 1',
            lessons: [
                {
                    id: 1,
                    title: 'Bài giảng 1',
                    content: 'Bài giảng về vật lí',
                    quizzes: [
                        {
                            id: 1,
                            title: 'Câu 1',
                            content: 'Bạn có hiểu vận tốc cực đại là gì không?',
                            answers: [
                                { id: 1, text: 'Đó là vận tốc đạt đỉnh điểm', isCorrect: true },
                                { id: 2, text: 'Đó là vận tốc đạt cực hạn', isCorrect: false },
                            ],
                        },
                        {
                            id: 2,
                            title: 'Câu 2',
                            content: 'Aaaaaaaaaaaaaaa',
                            answers: [
                                { id: 1, text: '121212121', isCorrect: true },
                                { id: 2, text: '2323232323', isCorrect: false },
                            ],
                        },
                    ],
                },
            ],
        },
    ]);

    const addLesson = (chapterIndex) => {
        const newChapter = [...chapters];
        newChapter[chapterIndex].lessons.push({
            title: `Bài giảng ${newChapter[chapterIndex].lessons.length + 1}`,
            content: '',
            quizzes: [],
        });
        setChapters(newChapter);
    };

    const addQuiz = (chapterIndex, lessonIndex) => {
        const newChapters = [...chapters];
        const newQuiz = {
            id: uuidv4(),
            title: "New Quiz",
            content: "New Quiz Content",
            answers: [],
        };
        newChapters[chapterIndex].lessons[lessonIndex].quizzes.push(newQuiz);
        setChapters(newChapters);
    };


    const handleQuillChange = (chapterIndex, lessonIndex, value) => {
        const newChapters = [...chapters];
        newChapters[chapterIndex].lessons[lessonIndex].content = value;
        setChapters(newChapters);
    };

    const handleQuizContentChange = (chapterIndex, lessonIndex, quizIndex, value) => {
        const newChapters = [...chapters];
        newChapters[chapterIndex].lessons[lessonIndex].quizzes[quizIndex].content = value;
        setChapters(newChapters);
    };

    const addChapter = () => {
        const newChapter = [...chapters];
        newChapter.push({
            title: `Chương ${newChapter.length + 1}`,
            lessons: [],
        });
        setChapters(newChapter);
    };

    const handleAnswerChange = (chapterIndex, lessonIndex, quizIndex, answerIndex, isChecked) => {
        // Xử lý thay đổi trạng thái của câu trả lời tại đây
        const newChapters = [...chapters];
        newChapters[chapterIndex].lessons[lessonIndex].quizzes[quizIndex].answers[answerIndex].isCorrect = isChecked;
        setChapters(newChapters);
    };


    const maxNumber = 69;
    const onChangeImageMutiple = (imageList, addUpdateIndex) => {
        formData.thumbnails = imageList;
        setMultipleImages(imageList);
    };

    const onChangeImage = (imageList, addUpdateIndex) => {
        formData.cover_image = imageList[0].file;
        setSingleImage(imageList);
    };

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        thumbnails: [],
        cover_image: '',
        subject: subjects[0],
        level: levels[0],
        price: '',
    });
    const handleInputChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData();

        Object.keys(formData).forEach(key => {
            if (key === 'cover_image' && formData[key] && formData[key][0] && formData[key][0].file) {
                data.append('cover_image', formData[key][0].file, formData[key][0].file.name);
            } else if (key === 'thumbnails' && formData[key]) {
                formData[key].forEach((image, index) => {
                    if (image && image.file) {
                        data.append('thumbnails', image.file, image.file.name);
                    }
                });
            } else {
                data.append(key, formData[key]);
            }
        });

        try {
            const response = await repository.registerCourseOfInstructor(data);
            if (response.status === 200) {
                alert('Đăng kí khóa học thành công');
                navigate('/course');
            }
        } catch (error) {
            alert('Đăng kí khóa học thất bại');
            console.log(error);
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                {roleHeaders[role]}
            </div>
            <div className={cx('body')}>
                <div className={cx('container')}>
                    <div className={cx('form-wrapper')} action="">
                        <div>
                            <label htmlFor="title">Tên khóa học</label>
                            <input
                                className={cx('input-create')}
                                type="text"
                                id="title"
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className={cx('display-subject-level')}>
                            <div>
                                <label htmlFor="subject">Môn học</label>
                                <select className={cx('input-create')} id="subject" name="subject" value={formData.subject} onChange={handleInputChange}>
                                    {subjects.map((subject) => {
                                        return <option key={subject} value={subject}>{subject}</option>
                                    })}
                                </select>
                            </div>
                            <div className={cx('pl-10')}>
                                <label htmlFor="level">Cấp độ</label>
                                <select className={cx('input-create')} id="level" name="level" value={formData.level} onChange={handleInputChange}>
                                    {levels.map((level) => {
                                        return <option key={level} value={level}>{level}</option>
                                    })}
                                </select>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="description">Mô tả</label>
                            <textarea
                                className={cx('input-create')}
                                id="description"
                                name="description"
                                cols="30"
                                rows="10"
                                value={formData.description}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="image-primary">
                            <ImageUploading
                                value={singleImage}
                                onChange={onChangeImage}
                                maxNumber={maxNumber}
                                dataURLKey="data_url"
                                acceptType={["jpg"]}
                            >
                                {({
                                    imageList,
                                    onImageUpload,
                                    onImageRemoveAll,
                                    onImageUpdate,
                                    onImageRemove,
                                    isDragging,
                                    dragProps
                                }) => (
                                    <div>
                                        <button
                                            style={isDragging ? { color: "red" } : null}
                                            onClick={onImageUpload}
                                            {...dragProps}
                                            className={cx("btn btn-primary-no-bs btn-file")}
                                        >
                                            Tải ảnh chính
                                        </button>
                                        &nbsp;
                                        {/* <button onClick={onImageRemoveAll} style={singleImage.length > 0 ? { display: "none" } : { display: "none"}}>Remove all images</button> */}
                                        {imageList.map((image, index) => (
                                            <div key={index} className="image-item" >
                                                <img src={image.data_url} alt="" width="100" />
                                                <div className="image-item__btn-wrapper">
                                                    {/* <button onClick={() => onImageUpdate(index)}>Update</button> */}
                                                    {/* <button onClick={() => onImageRemove(index)}>Remove</button> */}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </ImageUploading>
                        </div>
                        <ImageUploading
                            multiple
                            value={multipleImages}
                            onChange={onChangeImageMutiple}
                            maxNumber={maxNumber}
                            dataURLKey="data_url"
                            acceptType={["jpg"]}
                        >
                            {({
                                imageList,
                                onImageUpload,
                                onImageRemoveAll,
                                onImageUpdate,
                                onImageRemove,
                                isDragging,
                                dragProps
                            }) => (
                                <div>
                                    <button
                                        style={isDragging ? { color: "red" } : null}
                                        onClick={onImageUpload}
                                        {...dragProps}
                                        className={cx("btn btn-primary-no-bs btn-file")}
                                    >
                                        Tải 3 ảnh bìa
                                    </button>
                                    &nbsp;
                                    {/* <button onClick={onImageRemoveAll}>Remove all images</button> */}
                                    {imageList.map((image, index) => (
                                        <div key={index} className="image-item">
                                            <img src={image.data_url} alt="" width="100" />
                                            <div className="image-item__btn-wrapper">
                                                {/* <button onClick={() => onImageUpdate(index)}>Update</button> */}
                                                {/* <button onClick={() => onImageRemove(index)}>Remove</button> */}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </ImageUploading>
                        <div style={{ width: '100%', backgroundColor: '#86AEDD', border: '1px solid blue', display: 'flex', flexDirection: 'column', padding: '20px' }}>
                            <div style={{ backgroundColor: '#F7F7F8', padding: '10px' }}>
                                {chapters.map((chapter, chapterIndex) => (
                                    <div key={chapterIndex} className="chapter-card">
                                        <h2>{chapter.title}</h2>
                                        <div>
                                            {chapter.lessons.map((lesson, lessonIndex) => (
                                                <div key={lessonIndex} className="lesson-card">
                                                    <h3>
                                                        {lesson.title}
                                                        {!lesson.content && !isEditing && (
                                                            <button className="btn btn-primary" onClick={() => handleAddContent(lessonIndex)}>
                                                                Thêm nội dung
                                                            </button>
                                                        )}
                                                        {lesson.content && !isEditing && (
                                                            <button className="btn btn-primary" onClick={() => handleEditContent(lessonIndex)}>
                                                                Sửa nội dung
                                                            </button>
                                                        )}
                                                        <button className="btn btn-danger" onClick={() => handleDeleteLesson(chapterIndex, lessonIndex)}>
                                                            Xóa bài viết
                                                        </button>
                                                    </h3>
                                                    {isEditing && editingLessonIndex === lessonIndex ? (
                                                        <div>
                                                            <ReactQuill
                                                                value={lesson.content}
                                                                onChange={(value) => handleQuillChange(chapterIndex, lessonIndex, value)}
                                                            />
                                                            <button className="btn btn-primary" onClick={() => handleSaveContent(chapterIndex, lessonIndex, lesson.content)}>
                                                                Lưu lại
                                                            </button>
                                                            <button className="btn btn-danger" onClick={handleCancelEditing}>
                                                                Hủy
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <div>
                                                            <p>{lesson.content}</p>
                                                        </div>
                                                    )}
                                                    <div>
                                                        {lesson.quizzes.map((quiz, quizIndex) => (
                                                            <div id={quiz.id} key={quiz.id} className="quiz-card">
                                                                {!isEditingContent && editingQuizIndex !== quizIndex ? (
                                                                    <>
                                                                        <h4>{quiz.title}</h4>
                                                                        <p>{quiz.content}</p>
                                                                        {/* Hiển thị câu trả lời */}
                                                                        <form>
                                                                            {quiz.answers.map((answer, answerIndex) => (
                                                                                <div key={answer.id}>
                                                                                    <label>
                                                                                        <input
                                                                                            type="radio"
                                                                                            value={answer.text}
                                                                                            checked={answer.isCorrect}
                                                                                            onChange={(e) => handleAnswerChange(chapterIndex, lessonIndex, quizIndex, answerIndex, e.target.checked)}
                                                                                        />
                                                                                        {answer.text}
                                                                                    </label>
                                                                                </div>
                                                                            ))}
                                                                        </form>
                                                                        <button className="btn btn-primary" onClick={() => setEditingQuizIndex(quizIndex)}>
                                                                            Chỉnh sửa nội dung câu hỏi
                                                                        </button>

                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        <ReactQuill
                                                                            value={editedQuizContent}
                                                                            onChange={(value) => setEditedQuizContent(value)}
                                                                        />
                                                                        <button className="btn btn-primary" onClick={() => handleSaveQuizContent(chapterIndex, lessonIndex, quizIndex)}>
                                                                            Lưu
                                                                        </button>
                                                                        <button className="btn btn-danger" onClick={handleCancelEditingContent}>
                                                                            Hủy
                                                                        </button>
                                                                    </>
                                                                )}

                                                                <button className="btn btn-danger" onClick={() => handleDeleteQuestion(chapterIndex, lessonIndex, quizIndex)}>
                                                                    Xóa câu hỏi
                                                                </button>

                                                                {!isEditing && (
                                                                    <button className="btn btn-primary" onClick={() => handleEditQuizContent(chapterIndex, lessonIndex, quizIndex)}>
                                                                        Sửa nội dung bài kiểm tra
                                                                    </button>
                                                                )}
                                                                {!isEditing && (
                                                                    <button className="btn btn-primary" onClick={() => handleAddQuestion(quizIndex)}>
                                                                        Thêm câu hỏi
                                                                    </button>
                                                                )}
                                                            </div>
                                                        ))}

                                                        <button className="btn btn-primary" onClick={() => addQuiz(chapterIndex, lessonIndex)}>
                                                            Thêm bài kiểm tra
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <button className="btn btn-primary" onClick={() => addLesson(chapterIndex)}>
                                            Thêm bài giảng
                                        </button>
                                    </div>
                                ))}
                                <button className='btn btn-primary' onClick={addChapter}>Thêm Chương</button>
                            </div>
                        </div>
                        <div style={{ marginTop: '10px' }}>
                            <label htmlFor="">Giá khóa học</label>
                            <input className={cx('input-create')} name="price" type="text" value={formData.price} onChange={handleInputChange} />
                        </div>
                        <button className={cx("btn btn-primary-no-bs btn-file")} onClick={handleFormSubmit}>Đăng kí khóa học</button>
                    </div>

                </div>
            </div>
            <div className={cx('footer')}>
                <Footer />
            </div>
        </div>
    );
}

export default CreateCourse;
