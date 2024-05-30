import { useState, useEffect } from 'react';
import '../style/FilterModal.css';

const FilterModal = ({ isOpen, onClose }) => {
    const [tags, setTags] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);

    useEffect(() => {
        const fetchTags = async () => {
            const response = await fetch('http://localhost:8000/api/tags');
            const data = await response.json();
            setTags(data.tags);
        };

        fetchTags();
    }, []);

    const handleTagClick = (tag) => {
        setSelectedTags((prev) => {
            if (prev.includes(tag)) {
                return prev.filter((t) => t !== tag);
            } else {
                return [...prev, tag];
            }
        });
    };

    const handleApplyFilters = () => {
        console.log('Selected tags:', selectedTags);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="filter-modal">
            <div className="filter-modal-content">
                <h2>搜尋貼文</h2>
                <div className="modal-tags">
                    {tags.map((tag) => (
                        <span
                            key={tag.tag_id}
                            className={`modal-tag ${selectedTags.includes(tag) ? 'selected' : ''}`}
                            onClick={() => handleTagClick(tag)}
                        >
                            {tag.tag_name}
                        </span>
                    ))}
                </div>
                <button className='modal-search-button' onClick={handleApplyFilters}>搜尋</button>
                <button className='modal-cancel-button' onClick={onClose}>取消</button>
            </div>
        </div>
    );
};

export default FilterModal;
