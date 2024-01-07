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
import roleHeaders from '../../../utils/role'

const cx = classNames.bind(styles);

const CreateCourse = () => {
    const role = localStorage.getItem('role');
    const navigate = useNavigate();
    const [singleImage, setSingleImage] = useState([]);
    const [multipleImages, setMultipleImages] = useState([]);
    const [isEditingContent, setIsEditingContent] = useState(false);
    const [isDeletingContent, setIsDeletingContent] = useState(false);
    const [editedContent, setEditedContent] = useState("");
    const [checkboxStates, setCheckboxStates] = useState([]);
    const [textareaStates, setTextareaStates] = useState([]);
    const [questionContent, setQuestionContent] = useState('');
    const MAX_ANSWERS = 4;

    const [chapters, setChapters] = useState([
        {
            id: 1,
            title: 'Gioi thieu',
            isEditing: false,
            assignments: [
                {
                    id: 1,
                    type: 'video',
                    title: 'Gioi thieu',
                    content: '',
                    isEditing: false,
                    isAddContent: false,
                    isAddQuiz: false,
                    quiz: [
                        {
                            id: 1,
                            question: 'Mulalsada sdada',
                            answers: [
                                {
                                    id: 1,
                                    text: 'A',
                                    isCorrect: false
                                },
                                {
                                    id: 2,
                                    text: 'B',
                                    isCorrect: true
                                },
                            ]
                        },
                    ]
                },
            ],
        },
    ]);

    const handleEditChapter = (id) => {
        setChapters((prevChapters) =>
            prevChapters.map((chapter) =>
                chapter.id === id ? { ...chapter, isEditing: true } : chapter
            )
        );
    };

    const handleEditAssignmentTitle = (chapterId, assignmentId) => {
        setChapters((prevChapters) =>
            prevChapters.map((chapter) =>
                chapter.id === chapterId
                    ? {
                        ...chapter,
                        assignments: chapter.assignments.map((assignment) =>
                            assignment.id === assignmentId
                                ? {
                                    ...assignment,
                                    isEditing: true,
                                }
                                : assignment
                        ),
                    }
                    : chapter
            )
        );
    };

    const handleInputAssignmentChange = (chapterId, assignmentId, newTitle) => {
        setChapters((prevChapters) =>
            prevChapters.map((chapter) =>
                chapter.id === chapterId
                    ? {
                        ...chapter,
                        assignments: chapter.assignments.map((assignment) =>
                            assignment.id === assignmentId
                                ? {
                                    ...assignment,
                                    title: newTitle,
                                }
                                : assignment
                        ),
                    }
                    : chapter
            )
        );
    };

    const handleDeleteAssignment = (chapterId, assignmentId) => {
        setChapters((prevChapters) =>
            prevChapters.map((chapter) =>
                chapter.id === chapterId
                    ? {
                        ...chapter,
                        assignments: chapter.assignments.filter(
                            (assignment) => assignment.id !== assignmentId
                        ),
                    }
                    : chapter
            )
        );
    };


    const handleSaveAssignmentTitle = (chapterId, assignmentId) => {
        setChapters((prevChapters) =>
            prevChapters.map((chapter) =>
                chapter.id === chapterId
                    ? {
                        ...chapter,
                        assignments: chapter.assignments.map((assignment) =>
                            assignment.id === assignmentId
                                ? {
                                    ...assignment,
                                    isEditing: false,
                                }
                                : assignment
                        ),
                    }
                    : chapter
            )
        );
    };

    const handleCancelEditAssignment = (chapterId, assignmentId) => {
        setChapters((prevChapters) =>
            prevChapters.map((chapter) =>
                chapter.id === chapterId
                    ? {
                        ...chapter,
                        assignments: chapter.assignments.map((assignment) =>
                            assignment.id === assignmentId
                                ? { ...assignment, isEditing: false }
                                : assignment
                        ),
                    }
                    : chapter
            )
        );
    };

    const handleInputChapterChange = (id, newValue) => {
        setChapters((prevChapters) =>
            prevChapters.map((chapter) =>
                chapter.id === id ? { ...chapter, title: newValue } : chapter
            )
        );
    };

    const handleSaveChapterTitle = (id, newTitle) => {
        setChapters((prevChapters) =>
            prevChapters.map((chapter) =>
                chapter.id === id ? { ...chapter, title: newTitle, isEditing: false } : chapter
            )
        );
    };

    const handleAddAssignment = (chapterId, type) => {
        const newAssignment = {
            id: chapters[chapterId - 1].assignments.length + 1,
            type,
            title: `New Assignment`,
            content: '',
            isEditing: false,
            isAddContent: false,
            isAddQuiz: false,
            quiz: []
        };

        setChapters((prevChapters) =>
            prevChapters.map((chapter) =>
                chapter.id === chapterId
                    ? { ...chapter, assignments: [...chapter.assignments, newAssignment] }
                    : chapter
            )
        );
    };

    const handleCancelEdit = (id) => {
        setChapters((prevChapters) =>
            prevChapters.map((chapter) =>
                chapter.id === id ? { ...chapter, isEditing: false } : chapter
            )
        );
    };

    const handleAddChapter = () => {
        const newChapter = {
            id: chapters.length + 1,
            title: 'New Chapter',
            isEditing: false,
            assignments: [],
        };

        setChapters((prevChapters) => [...prevChapters, newChapter]);
    };

    const handleDeleteChapter = (id) => {
        setChapters((prevChapters) =>
            prevChapters.filter((chapter) => chapter.id !== id)
        );
    };

    const handleAddContent = (chapterId, assignmentId) => {
        setChapters((prevChapters) =>
            prevChapters.map((chapter) =>
                chapter.id === chapterId
                    ? {
                        ...chapter,
                        assignments: chapter.assignments.map((assignment) =>
                            assignment.id === assignmentId
                                ? {
                                    ...assignment,
                                    content: '',
                                    isAddContent: true
                                }
                                : assignment
                        ),
                    }
                    : chapter
            )
        );
    };

    const handleAddQuiz = (chapterId, assignmentId) => {
        // Reset the states for checkboxes and textareas
        setCheckboxStates([]);
        setTextareaStates([]);

        setChapters((prevChapters) =>
            prevChapters.map((chapter) =>
                chapter.id === chapterId
                    ? {
                        ...chapter,
                        assignments: chapter.assignments.map((assignment) =>
                            assignment.id === assignmentId
                                ? {
                                    ...assignment,
                                    isAddQuiz: true,
                                    quiz: [
                                        ...assignment.quiz,
                                        {
                                            id: assignment.quiz.length + 1,
                                            question: '',
                                            answers: [
                                                {
                                                    id: 1,
                                                    text: '',
                                                    isCorrect: false,
                                                },
                                                {
                                                    id: 2,
                                                    text: '',
                                                    isCorrect: false,
                                                },
                                            ],
                                        },
                                    ],
                                }
                                : assignment
                        ),
                    }
                    : chapter
            )
        );
    };

    const handleCheckboxChange = (quizIndex, answerIndex) => {
        setCheckboxStates((prevStates) => {
            const newStates = [...prevStates];
            const index = quizIndex * MAX_ANSWERS + answerIndex;

            // Make sure the array is long enough
            while (newStates.length <= index) {
                newStates.push(false);
            }

            // Update the state for the specific checkbox
            newStates[index] = !prevStates[index];

            return newStates;
        });
    };

    const handleTextareaChange = (quizIndex, answerIndex, value) => {
        setTextareaStates((prevStates) => {
            const newStates = [...prevStates];
            const index = quizIndex * MAX_ANSWERS + answerIndex;

            // Make sure the array is long enough
            while (newStates.length <= index) {
                newStates.push('');
            }

            // Update the state for the specific textarea
            newStates[index] = value;

            return newStates;
        });
    };

    const handleSaveAddQuiz = (chapterId, assignmentId, quizData) => {
        const updatedQuizData = quizData.map((quizItem, quizIndex) => {
            const updatedAnswers = quizItem.answers.map((answer, answerIndex) => ({
                ...answer,
                isCorrect: checkboxStates[quizIndex * MAX_ANSWERS + answerIndex] || false,
                text: textareaStates[quizIndex * MAX_ANSWERS + answerIndex] || '',
            }));

            return {
                ...quizItem,
                question: quizIndex === quizData.length - 1 ? (questionContent || '') : quizItem.question,
                answers: updatedAnswers,
            };
        });

        console.log("updatedQuizData == ", updatedQuizData);

        setChapters((prevChapters) =>
            prevChapters.map((chapter) =>
                chapter.id === chapterId
                    ? {
                        ...chapter,
                        assignments: chapter.assignments.map((assignment) =>
                            assignment.id === assignmentId
                                ? {
                                    ...assignment,
                                    isAddQuiz: false,
                                    quiz: updatedQuizData,
                                }
                                : assignment
                        ),
                    }
                    : chapter
            )
        );

        setCheckboxStates([]);
        setTextareaStates([]);
        setQuestionContent('');
    };

    const handleRemoveQuiz = (chapterId, assignmentId, quizId) => {
        setChapters((prevChapters) =>
            prevChapters.map((chapter) =>
                chapter.id === chapterId
                    ? {
                        ...chapter,
                        assignments: chapter.assignments.map((assignment) =>
                            assignment.id === assignmentId
                                ? {
                                    ...assignment,
                                    quiz: assignment.quiz.filter((quizItem) => quizItem.id !== quizId),
                                }
                                : assignment
                        ),
                    }
                    : chapter
            )
        );
    };

    const handleCancelAddQuiz = (chapterId, assignmentId) => {
        setChapters((prevChapters) =>
            prevChapters.map((chapter) =>
                chapter.id === chapterId
                    ? {
                        ...chapter,
                        assignments: chapter.assignments.map((assignment) =>
                            assignment.id === assignmentId
                                ? {
                                    ...assignment,
                                    isAddQuiz: false,
                                    quiz: []
                                }
                                : assignment
                        ),
                    }
                    : chapter
            )
        );
    }

    const handleSaveContent = (chapterId, assignmentId, content) => {
        setChapters((prevChapters) =>
            prevChapters.map((chapter) =>
                chapter.id === chapterId
                    ? {
                        ...chapter,
                        assignments: chapter.assignments.map((assignment) =>
                            assignment.id === assignmentId
                                ? {
                                    ...assignment,
                                    content: content,
                                    isAddContent: false,
                                }
                                : assignment
                        ),
                    }
                    : chapter
            )
        );
        setIsEditingContent(false)
    };

    const handleDeleteContent = (chapterId, assignmentId) => {
        setChapters((prevChapters) =>
            prevChapters.map((chapter) =>
                chapter.id === chapterId
                    ? {
                        ...chapter,
                        assignments: chapter.assignments.filter((assignment) => assignment.id !== assignmentId),
                    }
                    : chapter
            )
        );
        setIsDeletingContent(false);
    };

    const handleEditContentAssignment = (chapterId, assignmentId) => {
        const currentAssignment = chapters.find((chapter) => chapter.id === chapterId)?.assignments.find((assignment) => assignment.id === assignmentId);

        if (currentAssignment) {
            setIsEditingContent(true);
            setEditedContent(currentAssignment.content);
        }
    };

    const handleCancelEditContent = (chapterId, assignmentId) => {
        setChapters((prevChapters) =>
            prevChapters.map((chapter) =>
                chapter.id === chapterId
                    ? {
                        ...chapter,
                        assignments: chapter.assignments.map((assignment) =>
                            assignment.id === assignmentId
                                ? {
                                    ...assignment,
                                    content: '',
                                    isAddContent: false,
                                }
                                : assignment
                        ),
                    }
                    : chapter
            )
        );
    };

    const addAnswer = (chapterId, assignmentId, quizIndex) => {
        const newAnswer = {
            id: chapters[chapterId - 1].assignments[assignmentId - 1].quiz[quizIndex - 1].answers.length + 1,
            text: '',
            isCorrect: false
        };

        setChapters((prevChapters) =>
            prevChapters.map((chapter) =>
                chapter.id === chapterId
                    ? {
                        ...chapter,
                        assignments: chapter.assignments.map((assignment) =>
                            assignment.id === assignmentId
                                ? {
                                    ...assignment,
                                    quiz: assignment.quiz.map((quiz, index) =>
                                        quiz.id === quizIndex
                                            ? {
                                                ...quiz,
                                                answers: [
                                                    ...quiz.answers, newAnswer
                                                ]
                                            } : quiz
                                    )
                                }
                                : assignment
                        ),
                    }
                    : chapter
            )
        );

        // Add initial states for the new answer
        setCheckboxStates((prevStates) => [...prevStates, false]);
        setTextareaStates((prevStates) => [...prevStates, '']);
    };

    const removeAnswer = (chapterId, assignmentId, quizIndex, answerIndex) => {
        setChapters((prevChapters) =>
            prevChapters.map((chapter) =>
                chapter.id === chapterId
                    ? {
                        ...chapter,
                        assignments: chapter.assignments.map((assignment) =>
                            assignment.id === assignmentId
                                ? {
                                    ...assignment,
                                    quiz: assignment.quiz.map((quiz) =>
                                        quiz.id === quizIndex
                                            ? {
                                                ...quiz,
                                                answers: quiz.answers.filter(
                                                    (answer) => answer.id !== answerIndex
                                                )
                                            } : quiz
                                    )
                                }
                                : assignment
                        ),
                    }
                    : chapter
            )
        );
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
                            {chapters && chapters.map((chapter) => (
                                <div key={chapter.id} style={{ backgroundColor: '#F7F7F8', padding: '5px' }}>
                                    <div style={{ padding: '5px' }}>
                                        <div style={{ border: '1px solid', padding: '5px', display: 'flex', gap: '10px' }}>
                                            <span>Chuong {chapter.id}: </span>
                                            {chapter.isEditing ? (
                                                <>
                                                    <input
                                                        type="text"
                                                        value={chapter.title}
                                                        onChange={(e) => handleInputChapterChange(chapter.id, e.target.value)}
                                                    />
                                                    <button className='btn btn-outline' onClick={() => handleCancelEdit(chapter.id)}>Huy</button>
                                                    <button className='btn btn-primary' onClick={() => handleSaveChapterTitle(chapter.id, chapter.title)}>Luu</button>
                                                </>
                                            ) : (
                                                <>
                                                    <span>{chapter.title}</span>
                                                    <i className="ri-pencil-line" onClick={() => handleEditChapter(chapter.id)}></i>
                                                    <i className="ri-delete-bin-line" onClick={() => handleDeleteChapter(chapter.id)}></i>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                    <div style={{ marginTop: '20px', padding: '5px' }}>
                                        <div style={{ border: '1px solid', padding: '10px' }}>
                                            {chapter.assignments.map((assignment) => (
                                                <div key={assignment.id} style={{ border: '1px solid', padding: '10px 20px 10px 20px' }}>
                                                    <div style={{ display: 'flex', gap: '10px' }}>
                                                        <span>Bai {assignment.id}:</span>
                                                        {assignment.isEditing ? (
                                                            <>
                                                                <input
                                                                    type="text"
                                                                    value={assignment.title}
                                                                    onChange={(e) => handleInputAssignmentChange(chapter.id, assignment.id, e.target.value)}
                                                                />
                                                                <button className='btn btn-outline' onClick={() => handleCancelEditAssignment(chapter.id, assignment.id)}>
                                                                    Huy
                                                                </button>
                                                                <button className='btn btn-primary' onClick={() => handleSaveAssignmentTitle(chapter.id, assignment.id)}>
                                                                    Luu
                                                                </button>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <span>{assignment.title}</span>
                                                                <i className="ri-pencil-line" onClick={() => handleEditAssignmentTitle(chapter.id, assignment.id)}></i>
                                                                <i className="ri-delete-bin-line" onClick={() => handleDeleteAssignment(chapter.id, assignment.id)}></i>
                                                            </>
                                                        )}
                                                    </div>
                                                    <div>
                                                        {
                                                            assignment.isAddContent ? (
                                                                <>
                                                                    <ReactQuill
                                                                        value={assignment.content}
                                                                        onChange={(value) => setChapters((prevChapters) =>
                                                                            prevChapters.map((prevChapter) =>
                                                                                prevChapter.id === chapter.id
                                                                                    ? {
                                                                                        ...prevChapter,
                                                                                        assignments: prevChapter.assignments.map((prevAssignment) =>
                                                                                            prevAssignment.id === assignment.id
                                                                                                ? { ...prevAssignment, content: value }
                                                                                                : prevAssignment
                                                                                        ),
                                                                                    }
                                                                                    : prevChapter
                                                                            )
                                                                        )}
                                                                    />
                                                                    <button className='btn btn-outline' onClick={() => handleCancelEditContent(chapter.id, assignment.id)}>Huy</button>
                                                                    <button className='btn btn-primary' onClick={() => handleSaveContent(chapter.id, assignment.id, assignment.content)}>Luu</button>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    {assignment.content && (
                                                                        <>
                                                                            {isEditingContent ? (
                                                                                <>
                                                                                    <ReactQuill
                                                                                        value={editedContent}
                                                                                        onChange={(value) => setEditedContent(value)}
                                                                                    />
                                                                                    <button className='btn btn-outline' onClick={() => setIsEditingContent(false)}>Huy</button>
                                                                                    <button className='btn btn-primary' onClick={() => handleSaveContent(chapter.id, assignment.id, editedContent)}>Luu</button>
                                                                                </>
                                                                            ) : (
                                                                                <>
                                                                                    <div dangerouslySetInnerHTML={{ __html: assignment.content }} />
                                                                                    <i className="ri-pencil-line" onClick={() => handleEditContentAssignment(chapter.id, assignment.id)}></i>
                                                                                    <i className="ri-delete-bin-line" onClick={() => setIsDeletingContent(true)}></i>
                                                                                </>
                                                                            )}
                                                                            {isDeletingContent && (
                                                                                <>
                                                                                    <button className='btn btn-outline' onClick={() => setIsDeletingContent(false)}>Huy</button>
                                                                                    <button className='btn btn-danger' onClick={() => handleDeleteContent(chapter.id, assignment.id)}>Xoa</button>
                                                                                </>
                                                                            )}
                                                                        </>
                                                                    )}
                                                                    {
                                                                        assignment.isAddQuiz && (
                                                                            <>
                                                                                <ReactQuill
                                                                                    value={assignment.content || questionContent}
                                                                                    onChange={(value) => setQuestionContent(value)}
                                                                                />
                                                                                <div>
                                                                                    <p>Answers</p>
                                                                                    {assignment.quiz && assignment.quiz.map((quizItem, quizIndex) => (
                                                                                        <div key={quizItem.id}>
                                                                                            {quizItem.question === '' && (
                                                                                                <>
                                                                                                    {quizItem.answers.map((answer, answerIndex) => (
                                                                                                        <div key={answer.id} className="answer-container" style={{ display: 'flex', marginBottom: '10px', gap: '10px' }}>
                                                                                                            <input
                                                                                                                type="checkbox"
                                                                                                                checked={checkboxStates[quizIndex * MAX_ANSWERS + answerIndex] || false}
                                                                                                                onChange={() => handleCheckboxChange(quizIndex, answerIndex)}
                                                                                                            />
                                                                                                            <textarea
                                                                                                                className="answer-textarea"
                                                                                                                rows="2"
                                                                                                                value={textareaStates[quizIndex * MAX_ANSWERS + answerIndex] || ''}
                                                                                                                onChange={(e) => handleTextareaChange(quizIndex, answerIndex, e.target.value)}
                                                                                                            />
                                                                                                            <i className="ri-delete-bin-line" onClick={() => removeAnswer(chapter.id, assignment.id, quizItem.id, answerIndex)}></i>
                                                                                                        </div>
                                                                                                    ))}
                                                                                                    <button className="add-answer-button btn btn-primary" onClick={() => addAnswer(chapter.id, assignment.id, quizItem.id)}>
                                                                                                        Add Answer
                                                                                                    </button>
                                                                                                </>
                                                                                            )}
                                                                                        </div>
                                                                                    ))}
                                                                                </div>
                                                                                <div>
                                                                                    <button className='btn btn-danger' onClick={() => handleCancelAddQuiz(chapter.id, assignment.id)} style={{ border: '1px solid' }}>
                                                                                        Huy
                                                                                    </button>
                                                                                    <button className='btn btn-info' onClick={() => handleSaveAddQuiz(chapter.id, assignment.id, assignment.quiz)} style={{ border: '1px solid' }}>
                                                                                        Luu
                                                                                    </button>
                                                                                </div>
                                                                            </>
                                                                        )
                                                                    }

                                                                    {!assignment.content && assignment.type == 'video' && <button className='btn btn-outline' onClick={() => handleAddContent(chapter.id, assignment.id)} style={{ background: '#fff', border: '1px solid' }}>
                                                                        + Noi dung
                                                                    </button>}
                                                                    {
                                                                        assignment.type === 'quiz' && assignment.quiz && assignment.quiz.map((quizItem, quizIndex) => (
                                                                            <div key={quizItem.id}>
                                                                                <span style={{ display: 'flex', gap: '10px' }}>
                                                                                    {quizIndex + 1}. <div dangerouslySetInnerHTML={{ __html: quizItem.question }} />
                                                                                    <i className="ri-delete-bin-line" onClick={() => handleRemoveQuiz(chapter.id, assignment.id, quizItem.id)}></i>
                                                                                </span>
                                                                            </div>
                                                                        ))
                                                                    }
                                                                    {assignment.type == 'quiz' && !assignment.isAddQuiz && (
                                                                        <button className='btn btn-outline' onClick={() => handleAddQuiz(chapter.id, assignment.id)} style={{ background: '#fff', border: '1px solid' }}>
                                                                            + Cau hoi
                                                                        </button>
                                                                    )}
                                                                </>
                                                            )
                                                        }
                                                    </div>
                                                </div>
                                            ))}
                                            <div style={{ display: 'flex', padding: '20px 0 10px 0', gap: '10px' }}>
                                                <button className='btn btn-outline' onClick={() => handleAddAssignment(chapter.id, 'video')} style={{ background: '#fff', border: '1px solid' }}>+ Bai giang</button>
                                                <button className='btn btn-outline' onClick={() => handleAddAssignment(chapter.id, 'quiz')} style={{ background: '#fff', border: '1px solid' }}>+ Bai trac nghiem</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div style={{ paddingTop: '10px' }}>
                                <button className='btn btn-outline' onClick={handleAddChapter} style={{ background: '#fff', border: '1px solid' }}>+ Chuong</button>
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
        </div >
    );
}

export default CreateCourse;
