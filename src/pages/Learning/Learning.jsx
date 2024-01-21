import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import repository from 'src/repositories/repository';
import YouTube from 'react-youtube';
import './Learning.css'

const Learning = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
    const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
    const [selectedLesson, setSelectedLesson] = useState(null);
    const [course, setCourse] = useState(null);
    const [expandedChapterIndex, setExpandedChapterIndex] = useState(null);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [showScore, setShowScore] = useState(false);

    const handleToggleChapterExpand = (chapterIndex) => {
        setExpandedChapterIndex(expandedChapterIndex === chapterIndex ? null : chapterIndex);
    };
    useEffect(() => {
        const getCourse = async () => {
            let res = await repository.getCourseByUserOrInstructor(id);
            setCourse(res.data.data);
            console.log("res.data.data == ", res.data.data);
        }
        getCourse();
    }, [id])

    useEffect(() => {
        if (course && course.chapters.length > 0) {
            setCurrentChapterIndex(0);
            setCurrentLessonIndex(0);
        }
    }, [course]);

    const currentChapter = course?.chapters[currentChapterIndex];
    const currentLesson = currentChapter?.lessons[currentLessonIndex];

    useEffect(() => {
        if (currentLesson) {
            setSelectedLesson(currentLesson)
        }
    }, [currentLesson])

    const getYouTubeVideoId = (url) => {
        const match = url.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/);
        return match && match[1];
    }

    const handleLessonClick = (lesson) => {
        setSelectedLesson(lesson);
    };

    function calculateScore() {
        let correctCount = 0;

        selectedLesson.content.list_question.forEach((question, questionIndex) => {
            const selectedAnswerId = selectedAnswers[`question_${questionIndex}`];
            const correctAnswer = question.answers.find((answer) => answer.isCorrect);

            if (selectedAnswerId === correctAnswer._id) {
                correctCount++;
            }
        });

        return "" + correctCount + "/" + selectedLesson.content.list_question.length;
    }

    function getAnswerBackgroundColor(questionIndex, answerId) {
        if (!showScore) {
            return 'transparent';
        }

        const selectedAnswerId = selectedAnswers[`question_${questionIndex}`];
        const correctAnswer = selectedLesson.content.list_question[questionIndex].answers.find((answer) => answer.isCorrect)._id;

        if (selectedAnswerId === answerId) {
            return selectedAnswerId === correctAnswer ? 'green' : 'red';
        } else {
            return answerId === correctAnswer ? 'green' : 'transparent';
        }
    }

    return (
        <div>
            <div className='header-learning'>
                <button onClick={() => navigate(`/course/${id}`)}>
                    <i style={{ fontSize: '30px' }} className="ri-arrow-left-line"></i>
                </button>
                <h2>{course?.title}</h2>
            </div>
            <div className='wrapper-learning row'>
                <div className='col-9 learning-video'>
                    {selectedLesson && selectedLesson.lessonType == 'video' && (
                        <>
                            <YouTube videoId={getYouTubeVideoId(selectedLesson?.content.url)} opts={{ width: '100%' }} />
                            <div style={{ padding: '20px' }}>{selectedLesson?.title}</div>
                        </>
                    )}
                    {selectedLesson && selectedLesson.lessonType === 'quizz' && (
                        <div>
                            <div>{selectedLesson?.title}</div>
                            {selectedLesson.content.list_question.map((question, questionIndex) => (
                                <div key={questionIndex} style={{ padding: '20px' }}>
                                    <div>{question.question}</div>
                                    <ul>
                                        {question.answers.map((answer, answerIndex) => (
                                            <li key={answer._id} style={{ backgroundColor: getAnswerBackgroundColor(questionIndex, answer._id) }}>
                                                <label className='label-answer'>
                                                    <input
                                                        type="radio"
                                                        name={`question_${questionIndex}`}
                                                        value={answer._id}
                                                        checked={selectedAnswers[`question_${questionIndex}`] === answer._id}
                                                        onChange={(e) => {
                                                            const updatedSelectedAnswers = { ...selectedAnswers };
                                                            updatedSelectedAnswers[`question_${questionIndex}`] = e.target.value;
                                                            setSelectedAnswers(updatedSelectedAnswers);
                                                        }}
                                                        disabled={showScore}
                                                    />
                                                    <span>
                                                        {answer.text}
                                                    </span>
                                                </label>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                            <div style={{ marginLeft: '20px' }}>
                                <button
                                    style={{ width: '70px', height: '30px' }}
                                    className='btn btn-primary'
                                    onClick={() => {
                                        setShowScore(true);
                                    }}
                                >
                                    Submit
                                </button>
                                <button
                                    style={{ width: '70px', height: '30px', marginLeft: '20px' }}
                                    className='btn btn-secondary'
                                    onClick={() => {
                                        setSelectedAnswers({});
                                        setShowScore(false);
                                    }}
                                    disabled={!showScore}
                                >
                                    Reset
                                </button>
                            </div>

                            {showScore && (
                                <div style={{ padding: '20px' }}>
                                    <p>Your Score: {calculateScore()}</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
                <div className='col-3 learning-sidebar card'>
                    <h2>Nội dung khóa học</h2>
                    {course?.chapters.map((chapter, chapterIndex) => (
                        <div key={chapterIndex} className="learning-chapter">
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <div className="lesson-title" onClick={() => handleToggleChapterExpand(chapterIndex)}>
                                        {chapter.title}
                                    </div>
                                    <div className="lesson-time">{currentLessonIndex + 1}/{chapter.lessons.length} | {currentLesson?.time}</div>
                                </div>
                                {expandedChapterIndex === chapterIndex && (
                                    <i className="ri-arrow-up-line icon-size"></i>
                                )}
                            </div>

                            {expandedChapterIndex === chapterIndex && (
                                <div className="learning-chapter child">
                                    {chapter.lessons.map((lesson, lessonIndex) => (
                                        <div
                                            key={lessonIndex}
                                            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                                            onClick={() => handleLessonClick(lesson)}
                                        >
                                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                <div className="lesson-title">{lesson.title}</div>
                                                <div className="lesson-time">
                                                    <i className="ri-video-fill"></i> {lesson.time}
                                                </div>
                                            </div>
                                            <i className="ri-checkbox-circle-fill"></i>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Learning;
