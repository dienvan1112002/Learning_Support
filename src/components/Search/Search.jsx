import { debounce } from 'lodash';
import React, { useState } from 'react';
import getImageFromBaseURL from 'src/helper/get_image';
import repository from 'src/repositories/repository';
import './style.css';

const Search = ({ onClose }) => {
    const [searchInput, setSearchInput] = useState('');
    const [isInputFilled, setIsInputFilled] = useState(false);
    const [course, setCourse] = useState([]);
    const [instructor, setInstructor] = useState([]);
    const debounced = React.useCallback(debounce(fetchData, 800), []);

    const handleInputChange = (event) => {
        const value = event.target.value;
        setSearchInput(value);
        setIsInputFilled(value.trim() !== '');
        debounced(value);
    };

    async function fetchData(searchTerm) {
        const res = await repository.listCourse({
            params: {
                search: searchTerm
            }
        });
        setCourse(res.data.data);
        const response = await repository.listInstructorSearch({
            params: {
                search: searchTerm
            }
        });
        setCourse(res.data.data);
        setInstructor(response.data.data);
    }

    const handleEscClick = () => {
        onClose();
    };

    return (
        <div className="global-search global-search-modal">
            <div className="global-search-inner">
                <div className="GlobalSearchHeader">
                    <i style={{ color: 'white' }} class="ri-search-line"></i>
                    <input
                        type="search"
                        spellCheck="false"
                        placeholder="Search"
                        maxLength="50"
                        value={searchInput}
                        onChange={(e) => {
                            handleInputChange(e)
                            debounced(e.target.value, 800);
                        }}
                    />
                    <a className="clear" href="#">✕</a>
                    <a className="close" href="#" onClick={handleEscClick}>ESC</a>
                </div>
                {isInputFilled && (
                    <div className="nav-results-wrapper">
                        <nav className="GroupedResultsNav">
                            <div className="left">
                            </div>
                            <ul>
                                <li className="active">
                                    <a href="#search-courses">
                                        Courses ({course.length || 0})
                                    </a>
                                    <a href="#search-instructor">
                                        Instructor ({instructor.length || 0})
                                    </a>
                                </li>

                            </ul>
                            <div className="right">
                            </div>
                        </nav>

                        <div className="GroupedResultsList" data-results-list="" style={{ paddingBottom: '136px;' }}>
                            <section>
                                <a id="search-courses"></a>
                                <div className="category-header">
                                    <h3>Courses</h3>
                                </div>
                                <ul>
                                    {course.length > 0 && course.map(c => (
                                        <li className="ResultListItem" key={c._id}>
                                            <a style={{ color: '#fff' }} href={`/course/${c._id}`}>
                                                <img height="24" width="24" src={getImageFromBaseURL(c.cover_image)} alt={c.title} />
                                            </a>
                                            <div>
                                                <h4>
                                                    <a style={{ color: '#fff' }} href={`/course/${c._id}`}>{c.title}</a>
                                                </h4>
                                                <div className="subtitle">
                                                    {c.description}
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </section>
                            <section>
                                <a id="search-instructor"></a>
                                <div class="category-header">
                                    <h3>Instructor</h3>
                                </div>
                                <ul>
                                    {instructor.length > 0 && instructor.map(i => (
                                        <li className="ResultListItem" key={i._id}>
                                            <a style={{ color: '#fff' }} href={`/teacher/${i._id}`}>
                                                <img height="24" width="24" src={getImageFromBaseURL(i.user.image)} alt={i.user.name} />
                                            </a>
                                            <div>
                                                <h4>
                                                    <a style={{ color: '#fff' }} href={`/teacher/${i._id}`}>{i.user.name}</a>
                                                </h4>
                                                <div className="subtitle">
                                                    {i.description}
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Search;
