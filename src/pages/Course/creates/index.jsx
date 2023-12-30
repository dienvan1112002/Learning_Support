import React, { useEffect, useState, useCallback } from 'react';
import styles from './create.module.scss';
import classNames from 'classnames/bind';
import Footer from 'src/components/Footer/Footer';
import subjects from 'src/constant/subject';
import levels from 'src/constant/level';
import repository from 'src/repositories/repository';
import ImageUploading from 'react-images-uploading';
import { useNavigate } from 'react-router-dom';
import roleHeaders from '../../../utils/role'

const cx = classNames.bind(styles);

const CreateCourse = () => {
    const role = localStorage.getItem('role');
    const navigate = useNavigate();
    const [singleImage, setSingleImage] = useState([]);
    const [multipleImages, setMultipleImages] = useState([]);
    const [editingChapterId, setEditingChapterId] = useState(null);
    const [editingLessionId, setEditingLessionId] = useState(null);
    const [editingQuizId, setEditingQuizId] = useState(null);
    const [editingAnswerId, setEditingAnswerId] = useState(null);
    const [chapters, setChapters] = useState([
        {
            id: 1,
            title: 'Chuong 1',
            lessons: [
                {
                    id: 1,
                    title: 'Bai 1',
                    quizzes: [
                        {
                            id: 1,
                            title: 'Quiz 1',
                            description: 'This is the first quiz',
                            answers: [
                                { id: 1, text: 'Answer 1', isCorrect: false },
                                { id: 2, text: 'Answer 2', isCorrect: true },
                            ],
                        },
                    ],
                },
            ],
        },
    ]);

    const handleEditChapterClick = (id) => {
        setEditingChapterId(id);
    };

    const handleSaveChapterClick = (id) => {
        setEditingChapterId(null);
        // Perform any additional logic before saving the chapter
    };

    const handleCancelChapterClick = () => {
        setEditingChapterId(null);
        // Reset any temporary state for the chapter if needed
    };

    const handleDeleteChapterClick = (id) => {
        const updatedChapters = chapters.filter((chapter) => chapter.id !== id);
        setChapters(updatedChapters);
    };

    const handleEditLessionClick = (lessonId) => {
        setEditingLessionId(lessonId);
    };

    const handleSaveLessionClick = (chapterId, lessonId) => {
        setEditingLessionId(null);
        // Perform any additional logic before saving the lesson
    };

    const handleCancelLessionClick = () => {
        setEditingLessionId(null);
        // Reset any temporary state for the lesson if needed
    };

    const handleDeleteLessionClick = (chapterId, lessonId) => {
        const updatedChapters = chapters.map((chapter) => {
            if (chapter.id === chapterId) {
                const updatedLessions = chapter.lessons.filter((lesson) => lesson.id !== lessonId);
                return { ...chapter, lessons: updatedLessions };
            }
            return chapter;
        });

        setChapters(updatedChapters);
    };

    const handleEditQuizClick = (quizId) => {
        setEditingQuizId(quizId);
    };

    const handleSaveQuizClick = (chapterId, lessonId, quizId) => {
        setEditingQuizId(null);
        // Perform any additional logic before saving the quiz
    };

    const handleCancelQuizClick = () => {
        setEditingQuizId(null);
        // Reset any temporary state for the quiz if needed
    };

    const handleDeleteQuizClick = (chapterId, lessonId, quizId) => {
        const updatedChapters = chapters.map((chapter) => {
            if (chapter.id === chapterId) {
                const updatedLessions = chapter.lessons.map((lesson) => {
                    if (lesson.id === lessonId) {
                        const updatedQuizzes = lesson.quizzes.filter((quiz) => quiz.id !== quizId);
                        return { ...lesson, quizzes: updatedQuizzes };
                    }
                    return lesson;
                });
                return { ...chapter, lessons: updatedLessions };
            }
            return chapter;
        });

        setChapters(updatedChapters);
    };

    const handleAddChapterClick = () => {
        const newChapterId = chapters.length + 1;
        setChapters([...chapters, { id: newChapterId, title: `Chuong ${newChapterId}`, lessons: [] }]);
    };

    const handleAddLessionClick = (chapterId) => {
        const chapterIndex = chapters.findIndex((chapter) => chapter.id === chapterId);
        const newLessionId = chapters[chapterIndex].lessons.length + 1;

        const updatedChapters = [...chapters];
        updatedChapters[chapterIndex].lessons.push({ id: newLessionId, title: `Bai ${newLessionId}`, quizzes: [] });

        setChapters(updatedChapters);
    };

    const handleAddQuizClick = (chapterId, lessonId) => {
        const chapterIndex = chapters.findIndex((chapter) => chapter.id === chapterId);
        const lessonIndex = chapters[chapterIndex].lessons.findIndex((lesson) => lesson.id === lessonId);
        const newQuizId = chapters[chapterIndex].lessons[lessonIndex].quizzes.length + 1;

        const updatedChapters = [...chapters];
        const newQuiz = {
            id: newQuizId,
            title: `Quiz ${newQuizId}`,
            description: `This is the description for Quiz ${newQuizId}`,
            answers: [], // Initialize answers for the new quiz
        };

        // Check if answers array is not present in the lesson and initialize it
        if (!updatedChapters[chapterIndex].lessons[lessonIndex].quizzes) {
            updatedChapters[chapterIndex].lessons[lessonIndex].quizzes = [];
        }

        updatedChapters[chapterIndex].lessons[lessonIndex].quizzes.push(newQuiz);

        setChapters(updatedChapters);
    };


    const handleAddAnswerClick = (chapterId, lessonId, quizId) => {
        const chapterIndex = chapters.findIndex((chapter) => chapter.id === chapterId);
        const lessonIndex = chapters[chapterIndex].lessons.findIndex((lesson) => lesson.id === lessonId);
        const quizIndex = chapters[chapterIndex].lessons[lessonIndex].quizzes.findIndex((quiz) => quiz.id === quizId);

        const newAnswerId = chapters[chapterIndex].lessons[lessonIndex].quizzes[quizIndex].answers.length + 1;

        const updatedChapters = [...chapters];
        updatedChapters[chapterIndex].lessons[lessonIndex].quizzes[quizIndex].answers.push({
            id: newAnswerId,
            text: `Answer ${newAnswerId}`,
            isCorrect: false,
        });

        setChapters(updatedChapters);
    };

    const handleEditAnswerClick = (chapterId, lessonId, quizId, answerId) => {
        setEditingAnswerId(answerId);
    };

    const handleSaveAnswerClick = (chapterId, lessonId, quizId, answerId) => {
        setEditingAnswerId(null);
        // Perform any additional logic before saving the answer
    };

    const handleCancelAnswerClick = () => {
        setEditingAnswerId(null);
        // Reset any temporary state for the answer if needed
    };

    const handleEditAnswerChange = (chapterId, lessonId, quizId, answerId, newText, newIsCorrect) => {
        const updatedChapters = chapters.map((chapter) => {
            if (chapter.id === chapterId) {
                const updatedLessions = chapter.lessons.map((lesson) => {
                    if (lesson.id === lessonId) {
                        const updatedQuizzes = lesson.quizzes.map((quiz) => {
                            if (quiz.id === quizId) {
                                const updatedAnswers = quiz.answers.map((answer) => {
                                    if (answer.id === answerId) {
                                        return {
                                            ...answer,
                                            text: newText !== undefined ? newText : answer.text,
                                            isCorrect: newIsCorrect !== undefined ? newIsCorrect : answer.isCorrect,
                                        };
                                    }
                                    return answer;
                                });
                                return { ...quiz, answers: updatedAnswers };
                            }
                            return quiz;
                        });
                        return { ...lesson, quizzes: updatedQuizzes };
                    }
                    return lesson;
                });
                return { ...chapter, lessons: updatedLessions };
            }
            return chapter;
        });

        setChapters(updatedChapters);
    };

    const handleDeleteAnswerClick = (chapterId, lessonId, quizId, answerId) => {
        const updatedChapters = chapters.map((chapter) => {
            if (chapter.id === chapterId) {
                const updatedLessions = chapter.lessons.map((lesson) => {
                    if (lesson.id === lessonId) {
                        const updatedQuizzes = lesson.quizzes.map((quiz) => {
                            if (quiz.id === quizId) {
                                const updatedAnswers = quiz.answers.filter((answer) => answer.id !== answerId);
                                return { ...quiz, answers: updatedAnswers };
                            }
                            return quiz;
                        });
                        return { ...lesson, quizzes: updatedQuizzes };
                    }
                    return lesson;
                });
                return { ...chapter, lessons: updatedLessions };
            }
            return chapter;
        });

        setChapters(updatedChapters);
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
                                {chapters.map((chapter) => (
                                    <div key={chapter.id} style={{
                                        display: 'flex',
                                        gap: '10px',
                                        padding: '10px',
                                        flexDirection: 'column',
                                        alignItems: 'flex-start',
                                        alignSelf: 'stretch',
                                        border: '1px solid #000',
                                        backgroundColor: '#fff',
                                        marginTop: '10px',
                                    }}>
                                        <div style={{ display: 'flex', gap: '10px' }}>
                                            {editingChapterId === chapter.id ? (
                                                <>
                                                    <input type="text" value={chapter.title} onChange={(e) => setChapters(chapters.map(c => c.id === chapter.id ? { ...c, title: e.target.value } : c))} />
                                                    <button type="button" className='btn btn-info' onClick={() => handleSaveChapterClick(chapter.id)}>Save</button>
                                                    <button type="button" className='btn btn-danger' onClick={handleCancelChapterClick}>Close</button>
                                                </>
                                            ) : (
                                                <>
                                                    <span>{chapter.title}:</span>
                                                    <i className="ri-pencil-line" onClick={() => handleEditChapterClick(chapter.id)}></i>
                                                    <i className="ri-delete-bin-line" onClick={() => handleDeleteChapterClick(chapter.id)}></i>
                                                </>
                                            )}
                                        </div>
                                        {chapter.lessons.map((lesson) => (
                                            <div key={lesson.id} style={{ marginTop: '10px' }}>
                                                <div style={{ display: 'flex', gap: '10px' }}>
                                                    {editingLessionId === lesson.id ? (
                                                        <>
                                                            <input type="text" value={lesson.title} onChange={(e) => setChapters(chapters.map(c => c.id === chapter.id ? {
                                                                ...c,
                                                                lessons: c.lessons.map(s => s.id === lesson.id ? { ...s, title: e.target.value } : s),
                                                            } : c))} />
                                                            <button type="button" className='btn btn-info' onClick={() => handleSaveLessionClick(chapter.id, lesson.id)}>Save</button>
                                                            <button type="button" className='btn btn-danger' onClick={handleCancelLessionClick}>Close</button>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <span>{lesson.title}:</span>
                                                            <i className="ri-pencil-line" onClick={() => handleEditLessionClick(lesson.id)}></i>
                                                            <i className="ri-delete-bin-line" onClick={() => handleDeleteLessionClick(chapter.id, lesson.id)}></i>
                                                        </>
                                                    )}
                                                </div>
                                                {lesson.quizzes.map((quiz) => (
                                                    <div key={quiz.id} style={{ marginTop: '10px' }}>
                                                        {/* Quiz Content */}
                                                        <div style={{ display: 'flex', gap: '10px' }}>
                                                            {editingQuizId === quiz.id ? (
                                                                <>
                                                                    {/* Edit Quiz Input Fields */}
                                                                    <div>
                                                                        <input
                                                                            type="text"
                                                                            value={quiz.title}
                                                                            onChange={(e) => setChapters(chapters.map(c => c.id === chapter.id ? {
                                                                                ...c,
                                                                                lessons: c.lessons.map(s => s.id === lesson.id ? {
                                                                                    ...s,
                                                                                    quizzes: s.quizzes.map(q => q.id === quiz.id ? { ...q, title: e.target.value } : q),
                                                                                } : s),
                                                                            } : c))}
                                                                        />
                                                                        <input
                                                                            type="text"
                                                                            value={quiz.description}
                                                                            onChange={(e) => setChapters(chapters.map(c => c.id === chapter.id ? {
                                                                                ...c,
                                                                                lessons: c.lessons.map(s => s.id === lesson.id ? {
                                                                                    ...s,
                                                                                    quizzes: s.quizzes.map(q => q.id === quiz.id ? { ...q, description: e.target.value } : q),
                                                                                } : s),
                                                                            } : c))}
                                                                        />
                                                                    </div>
                                                                    <button type="button" className='btn btn-info' onClick={() => handleSaveQuizClick(chapter.id, lesson.id, quiz.id)}>Save</button>
                                                                    <button type="button" className='btn btn-danger' onClick={handleCancelQuizClick}>Close</button>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    {/* Display Quiz */}
                                                                    <span>{quiz.title}:</span>
                                                                    <i className="ri-pencil-line" onClick={() => handleEditQuizClick(quiz.id)}></i>
                                                                    <i className="ri-delete-bin-line" onClick={() => handleDeleteQuizClick(chapter.id, lesson.id, quiz.id)}></i>
                                                                </>
                                                            )}
                                                        </div>
                                                        <p>{quiz.description}</p>

                                                        {/* Answers */}
                                                        {quiz.answers.map((answer) => (
                                                            <div key={answer.id} style={{ marginTop: '10px' }}>
                                                                <div style={{ display: 'flex', gap: '10px' }}>
                                                                    {editingAnswerId === answer.id ? (
                                                                        <>
                                                                            {/* Edit Answer Input Fields */}
                                                                            <input
                                                                                type="text"
                                                                                value={answer.text}
                                                                                onChange={(e) => handleEditAnswerChange(chapter.id, lesson.id, quiz.id, answer.id, e.target.value)}
                                                                            />
                                                                            <label>
                                                                                <input
                                                                                    type="checkbox"
                                                                                    checked={answer.isCorrect}
                                                                                    onChange={(e) => handleEditAnswerChange(chapter.id, lesson.id, quiz.id, answer.id, undefined, e.target.checked)}
                                                                                />
                                                                                Correct
                                                                            </label>
                                                                            <button type="button" className='btn btn-info' onClick={() => handleSaveAnswerClick(chapter.id, lesson.id, quiz.id, answer.id)}>Save</button>
                                                                            <button type="button" className='btn btn-danger' onClick={handleCancelAnswerClick}>Close</button>
                                                                        </>
                                                                    ) : (
                                                                        <>
                                                                            {/* Display Answer */}
                                                                            <span>{answer.text} ({answer.isCorrect ? 'Correct' : 'Incorrect'})</span>
                                                                            <i className="ri-pencil-line" onClick={() => handleEditAnswerClick(chapter.id, lesson.id, quiz.id, answer.id)}></i>
                                                                            <i className="ri-delete-bin-line" onClick={() => handleDeleteAnswerClick(chapter.id, lesson.id, quiz.id, answer.id)}></i>
                                                                        </>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        ))}

                                                        {/* Add Answer Button */}
                                                        <button style={{ border: '1px solid' }} type='button' className='btn btn-light' onClick={() => handleAddAnswerClick(chapter.id, lesson.id, quiz.id)}> + Add Answer</button>
                                                    </div>
                                                ))}

                                                <div style={{ marginTop: '10px' }}>
                                                    <button style={{ border: '1px solid' }} type='button' className='btn btn-light' onClick={() => handleAddQuizClick(chapter.id, lesson.id)}> + Add Quiz</button>
                                                </div>
                                            </div>
                                        ))}
                                        <div style={{ marginTop: '10px' }}>
                                            <button style={{ border: '1px solid' }} type='button' className='btn btn-light' onClick={() => handleAddLessionClick(chapter.id)}> + Add Lession</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div style={{ marginTop: '10px' }}>
                                <button type='button' className='btn btn-light' onClick={handleAddChapterClick}> + Add Chapter</button>
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
