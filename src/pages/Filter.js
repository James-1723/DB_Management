import '../style/Filter.css'

const Filter = () => {

    return (
        <div className='filter-container'>
            <h2>Filter</h2>
            <div className='filter-input'>
                <p>樣式</p>  
                <Select
                    value={selectedTags}
                    onChange={handleChange}
                    onInputChange={handleInputChange}
                    options={options}
                    isClearable
                    isSearchable
                    isMulti
                    placeholder="Enter or select tags"
                />
            </div>
            <div className='filter-input'>
                <p>鍋具</p>
                <Select
                    value={selectedTags}
                    onChange={handleChange}
                    onInputChange={handleInputChange}
                    options={options}
                    isClearable
                    isSearchable
                    isMulti
                    placeholder="Enter or select tags"
                />
            </div>
            <div className='filter-input'>
                <p>食材</p>
                <Select
                    value={selectedTags}
                    onChange={handleChange}
                    onInputChange={handleInputChange}
                    options={options}
                    isClearable
                    isSearchable
                    isMulti
                    placeholder="Enter or select tags"
                />
            </div>
            <button className="filter-button" onClick={filterPost}>篩選</button>
        </div>
    );
}

export default Filter;