import React, { createContext, useState, useContext } from 'react';

const SearchContext = createContext();

export const useSearch = () => useContext(SearchContext);

export const SearchProvider = ({ children }) => {
    const [results, setResults] = useState([]);

    const handleKeywordSearch = async (query) => {
        if (query.trim()) {
            try {
                const response = await fetch(`http://localhost:8000/api/search?q=${query}`);
                const data = await response.json();
                if (data.success) {
                    setResults(data.results); // 更新搜尋結果
                } else {
                    console.error('Search failed:', data.message);
                }
            } catch (error) {
                console.error('Error during search:', error);
            }
        }
    };

    const handleTagSearch = async (tags) => {
        if (tags.length > 0) {
            try {
                const response = await fetch(`http://localhost:8000/api/searchByTags`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ tags }),
                });
                const data = await response.json();
                if (data.success) {
                    setResults(data.results); // 更新搜尋結果
                } else {
                    console.error('Tag search failed:', data.message);
                }
            } catch (error) {
                console.error('Error during tag search:', error);
            }
        }
    };

    const getPostList = async (userId) => {
        try {
            const response = await fetch(`http://localhost:8000/api/posts?userId=${userId}`);
            const data = await response.json();
            if (data.success) {
                const newPosts = data.posts.map(post => ({
                    title: post.title,
                    content: post.content,
                    tags: post.tags,
                    id: post.id
                }));
                setResults(newPosts);        
            } else {
                console.error('Failed to fetch posts:', data.message);
            }
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    return (
        <SearchContext.Provider value={{ results, handleKeywordSearch, handleTagSearch, getPostList }}>
            {children}
        </SearchContext.Provider>
    );
};
