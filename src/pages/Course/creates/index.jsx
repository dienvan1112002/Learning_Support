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

    const [chapters, setChapters] = useState([
        {
            id: 1,
            title: 'Giới thiệu',
            isEditing: false,
            assignments: [
                {
                    id: 1,
                    type: 'video',
                    title: 'Giới thiệu',
                    content: '',
                    isEditing: false,
                    isAddContent: false,
                    isAddQuiz: false,
                    isEditingContent: false,
                    isDeletingContent: false,
                    quiz: [
                        {
                            id: 1,
                            question: '',
                            isAddQuestion: false,
                            answers: [
                                {
                                    id: 1,
                                    text: '',
                                    isCorrect: false
                                },
                                {
                                    id: 2,
                                    text: '',
                                    isCorrect: false
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

    const handleQuizQuestionChange = (chapterId, assignmentId, quizIndex, value) => {
        setChapters((prevChapters) =>
            prevChapters.map((chapter) =>
                chapter.id === chapterId
                    ? {
                        ...chapter,
                        assignments: chapter.assignments.map((assignment) =>
                            assignment.id === assignmentId
                                ? {
                                    ...assignment,
                                    quiz: assignment.quiz.map((quizItem, currentIndex) =>
                                        currentIndex === quizIndex
                                            ? { ...quizItem, question: value }
                                            : quizItem
                                    ),
                                }
                                : assignment
                        ),
                    }
                    : chapter
            )
        );
    };

    const handleAddQuiz = (chapterId, assignmentId) => {
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
                                            isAddQuestion: true,
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

    const handleCheckboxChange = (chapterId, assignmentId, quizIndex, answerId) => {
        setChapters((prevChapters) =>
            prevChapters.map((chapter) =>
                chapter.id === chapterId
                    ? {
                        ...chapter,
                        assignments: chapter.assignments.map((assignment) =>
                            assignment.id === assignmentId
                                ? {
                                    ...assignment,
                                    quiz: assignment.quiz.map((quizItem, currentIndex) =>
                                        currentIndex === quizIndex
                                            ? {
                                                ...quizItem,
                                                answers: quizItem.answers.map((answer, answerIndex) =>
                                                    answerId === answerIndex
                                                        ? { ...answer, isCorrect: !answer.isCorrect }
                                                        : answer
                                                ),
                                            }
                                            : quizItem
                                    ),
                                }
                                : assignment
                        ),
                    }
                    : chapter
            )
        );
    };

    const handleTextareaChange = (chapterId, assignmentId, quizIndex, answerIndex, value) => {
        setChapters((prevChapters) =>
            prevChapters.map((chapter) =>
                chapter.id === chapterId
                    ? {
                        ...chapter,
                        assignments: chapter.assignments.map((assignment) =>
                            assignment.id === assignmentId
                                ? {
                                    ...assignment,
                                    quiz: assignment.quiz.map((quizItem, currentIndex) =>
                                        currentIndex === quizIndex
                                            ? {
                                                ...quizItem,
                                                answers: quizItem.answers.map((answer, currentAnswerIndex) =>
                                                    currentAnswerIndex === answerIndex
                                                        ? { ...answer, text: value }
                                                        : answer
                                                ),
                                            }
                                            : quizItem
                                    ),
                                }
                                : assignment
                        ),
                    }
                    : chapter
            )
        );
    };

    const handleSaveAddQuiz = (chapterId, assignmentId) => {
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
                                    quiz: assignment.quiz.map((quizItem) => ({
                                        ...quizItem,
                                        isAddQuestion: false,
                                        answers: quizItem.answers.map((answer) => ({
                                            ...answer,
                                            isCorrect: answer.isCorrect || false,
                                            text: answer.text || '',
                                        })),
                                    })),
                                }
                                : assignment
                        ),
                    }
                    : chapter
            )
        );

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

    const isValidUrl = urlString => {
        var urlPattern = new RegExp('^(https?:\\/\\/)?' + // validate protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // validate domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // validate OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // validate port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?' + // validate query string
            '(\\#[-a-z\\d_]*)?$', 'i'); // validate fragment locator
        return !!urlPattern.test(urlString);
    }

    const handleSaveContent = (chapterId, assignmentId, content) => {
        content = content.slice(3, content.length - 4);
        if (isValidUrl(content)) {
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
                                        isEditingContent: false
                                    }
                                    : assignment
                            ),
                        }
                        : chapter
                )
            );
            setIsEditingContent(false)
        } else {
            alert("Please provide valid URL")
        }
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
        setChapters((prevChapters) => {
            const updatedChapters = prevChapters.map((chapter) => {
                if (chapter.id === chapterId) {
                    const updatedAssignments = chapter.assignments.map((assignment) => {
                        if (assignment.id === assignmentId) {
                            setEditedContent(assignment.content);
                            return {
                                ...assignment,
                                isEditingContent: true,
                            };
                        }
                        return assignment;
                    });
                    return {
                        ...chapter,
                        assignments: updatedAssignments,
                    };
                }
                return chapter;
            });
            return updatedChapters;
        });
    };

    const handleCancelEditContentAssignment = (chapterId, assignmentId) => {
        setChapters((prevChapters) => {
            const updatedChapters = prevChapters.map((chapter) => {
                if (chapter.id === chapterId) {
                    const updatedAssignments = chapter.assignments.map((assignment) => {
                        if (assignment.id === assignmentId) {
                            return {
                                ...assignment,
                                isEditingContent: false,
                            };
                        }
                        return assignment;
                    });
                    return {
                        ...chapter,
                        assignments: updatedAssignments,
                    };
                }
                return chapter;
            });
            return updatedChapters;
        });
    };

    const handleDeleteContentAssignment = (chapterId, assignmentId) => {
        setChapters((prevChapters) => {
            const updatedChapters = prevChapters.map((chapter) => {
                if (chapter.id === chapterId) {
                    const updatedAssignments = chapter.assignments.map((assignment) => {
                        if (assignment.id === assignmentId) {
                            return {
                                ...assignment,
                                content: '',
                            };
                        }
                        return assignment;
                    });
                    return {
                        ...chapter,
                        assignments: updatedAssignments,
                    };
                }
                return chapter;
            });
            return updatedChapters;
        });
    }

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
                var listChapterId = [];

                await Promise.all(chapters.map(async (chapter) => {
                    const createdChapter = await repository.createChapter({ title: chapter.title });
                    listChapterId.push(createdChapter.data.data._id);

                    const listChapters = await Promise.all(chapter.assignments.map(async (assignment) => {
                        const formatedQuiz = assignment.quiz.map(quiz => ({
                            answers: quiz.answers,
                            question: quiz.question
                        }));

                        const createdLesson = await repository.createLesson({
                            title: assignment.title,
                            description: assignment.content,
                            lessonType: assignment.type
                        });

                        if (assignment.type === 'quizz') {
                            const createdQuizz = await repository.createQuizz({ list_question: formatedQuiz });

                            if (createdQuizz.status === 200) {
                                await repository.updateLesson(createdLesson.data.data._id, {
                                    title: createdLesson.data.data.title,
                                    description: createdLesson.data.data.description,
                                    lessonType: 'quizz',
                                    content: createdQuizz.data.data._id
                                });
                            }
                        } else {
                            const createdVideo = await repository.createVideo({ url: assignment.content });

                            if (createdVideo.status === 200) {
                                await repository.updateLesson(createdLesson.data.data._id, {
                                    title: createdLesson.data.data.title,
                                    description: createdLesson.data.data.description,
                                    lessonType: 'video',
                                    content: createdVideo.data.data._id
                                });
                            }
                        }

                        return createdLesson.data.data._id;
                    }));

                    await repository.updateChapter(createdChapter.data.data._id, {
                        title: createdChapter.data.data.title,
                        lessons: listChapters
                    });
                }));

                await repository.updateCourse(response.data.data._id, {
                    title: response.data.data.title,
                    description: response.data.data.description,
                    level: response.data.data.level,
                    thumbnails: response.data.data.thumbnails,
                    subject: response.data.data.subject,
                    cover_image: response.data.data.cover_image,
                    price: response.data.data.price,
                    chapters: listChapterId
                })

                alert('Đăng kí khóa học thành công');
                navigate('/instructor');
            }
        } catch (error) {
            alert('Đăng kí khóa học thất bại');
            console.error(error);
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
                                            <span>Chương {chapter.id}: </span>
                                            {chapter.isEditing ? (
                                                <>
                                                    <input
                                                        type="text"
                                                        value={chapter.title}
                                                        onChange={(e) => handleInputChapterChange(chapter.id, e.target.value)}
                                                    />
                                                    <button className='btn btn-outline' onClick={() => handleCancelEdit(chapter.id)}>Hủy</button>
                                                    <button className='btn btn-primary' onClick={() => handleSaveChapterTitle(chapter.id, chapter.title)}>Lưu</button>
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
                                                        <span>Bài {assignment.id}:</span>
                                                        {assignment.isEditing ? (
                                                            <>
                                                                <input
                                                                    type="text"
                                                                    value={assignment.title}
                                                                    onChange={(e) => handleInputAssignmentChange(chapter.id, assignment.id, e.target.value)}
                                                                />
                                                                <button className='btn btn-outline' onClick={() => handleCancelEditAssignment(chapter.id, assignment.id)}>
                                                                    Hủy
                                                                </button>
                                                                <button className='btn btn-primary' onClick={() => handleSaveAssignmentTitle(chapter.id, assignment.id)}>
                                                                    Lưu
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
                                                                    <button className='btn btn-outline' onClick={() => handleCancelEditContent(chapter.id, assignment.id)}>Hủy</button>
                                                                    <button className='btn btn-primary' onClick={() => handleSaveContent(chapter.id, assignment.id, assignment.content)}>Lưu</button>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    {assignment.content && (
                                                                        <>
                                                                            {assignment.isEditingContent ? (
                                                                                <>
                                                                                    <ReactQuill
                                                                                        value={editedContent}
                                                                                        onChange={(value) => setEditedContent(value)}
                                                                                    />
                                                                                    <button className='btn btn-outline' onClick={() => handleCancelEditContentAssignment(chapter.id, assignment.id)}>Hủy</button>
                                                                                    <button className='btn btn-primary' onClick={() => handleSaveContent(chapter.id, assignment.id, editedContent)}>Lưu</button>
                                                                                </>
                                                                            ) : (
                                                                                <>
                                                                                    <div dangerouslySetInnerHTML={{ __html: assignment.content }} />
                                                                                    <i className="ri-pencil-line" onClick={() => handleEditContentAssignment(chapter.id, assignment.id)}></i>
                                                                                    <i className="ri-delete-bin-line" onClick={() => handleDeleteContentAssignment(chapter.id, assignment.id)}></i>
                                                                                </>
                                                                            )}
                                                                            {assignment.isDeletingContent && (
                                                                                <>
                                                                                    <button className='btn btn-outline' onClick={() => setIsDeletingContent(false)}>Hủy</button>
                                                                                    <button className='btn btn-danger' onClick={() => handleDeleteContent(chapter.id, assignment.id)}>Xoa</button>
                                                                                </>
                                                                            )}
                                                                        </>
                                                                    )}
                                                                    {
                                                                        assignment.isAddQuiz && (
                                                                            <>
                                                                                <div>
                                                                                    <p>Answers</p>
                                                                                    {assignment.quiz && assignment.quiz.map((quizItem, quizIndex) => (
                                                                                        <div key={quizItem.id}>
                                                                                            {quizItem.isAddQuestion === true && (
                                                                                                <>
                                                                                                    <ReactQuill
                                                                                                        value={quizItem.question || ''}
                                                                                                        onChange={(value) => handleQuizQuestionChange(chapter.id, assignment.id, quizIndex, value)}
                                                                                                    />
                                                                                                    {quizItem.answers.map((answer, answerIndex) => (
                                                                                                        <div key={answer.id} className="answer-container" style={{ display: 'flex', marginBottom: '10px', gap: '10px' }}>
                                                                                                            <input
                                                                                                                type="radio"
                                                                                                                name='answer'
                                                                                                                checked={answer.isCorrect || false}
                                                                                                                onChange={() => handleCheckboxChange(chapter.id, assignment.id, quizIndex, answerIndex)}
                                                                                                            />
                                                                                                            <textarea
                                                                                                                className="answer-textarea"
                                                                                                                rows="2"
                                                                                                                value={answer.text || ''}
                                                                                                                onChange={(e) => handleTextareaChange(chapter.id, assignment.id, quizIndex, answerIndex, e.target.value)}
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
                                                                                        Hủy
                                                                                    </button>
                                                                                    <button className='btn btn-info' onClick={() => handleSaveAddQuiz(chapter.id, assignment.id)} style={{ border: '1px solid' }}>
                                                                                        Lưu
                                                                                    </button>
                                                                                </div>
                                                                            </>
                                                                        )
                                                                    }

                                                                    {!assignment.content && assignment.type == 'video' && <button className='btn btn-outline' onClick={() => handleAddContent(chapter.id, assignment.id)} style={{ background: '#fff', border: '1px solid' }}>
                                                                        + Nội dung
                                                                    </button>}
                                                                    {
                                                                        assignment.type === 'quizz' && assignment.quiz && assignment.quiz.map((quizItem, quizIndex) => (
                                                                            <div key={quizItem.id}>
                                                                                <span style={{ display: 'flex', gap: '10px' }}>
                                                                                    {quizIndex + 1}. <div dangerouslySetInnerHTML={{ __html: quizItem.question }} />
                                                                                    <i className="ri-delete-bin-line" onClick={() => handleRemoveQuiz(chapter.id, assignment.id, quizItem.id)}></i>
                                                                                </span>
                                                                            </div>
                                                                        ))
                                                                    }
                                                                    {assignment.type == 'quizz' && !assignment.isAddQuiz && (
                                                                        <button className='btn btn-outline' onClick={() => handleAddQuiz(chapter.id, assignment.id)} style={{ background: '#fff', border: '1px solid' }}>
                                                                            + Câu hỏi
                                                                        </button>
                                                                    )}
                                                                </>
                                                            )
                                                        }
                                                    </div>
                                                </div>
                                            ))}
                                            <div style={{ display: 'flex', padding: '20px 0 10px 0', gap: '10px' }}>
                                                <button className='btn btn-outline' onClick={() => handleAddAssignment(chapter.id, 'video')} style={{ background: '#fff', border: '1px solid' }}>+ Bài giảng</button>
                                                <button className='btn btn-outline' onClick={() => handleAddAssignment(chapter.id, 'quizz')} style={{ background: '#fff', border: '1px solid' }}>+ Bài trắc nghiệm</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div style={{ paddingTop: '10px' }}>
                                <button className='btn btn-outline' onClick={handleAddChapter} style={{ background: '#fff', border: '1px solid' }}>+ Chương</button>
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
