import { useEffect, useState } from 'react';
import { useUser } from '../context/UserContext.js'
import '../style/Create.css';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';

const Create = () => {

    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const [inputValue, setInputValue] = useState('');
    const [selectedTags, setselectedTags] = useState([]);
    
    const [options, setOptions] = useState()

    const handleChange = (selectedTags) => {
        setselectedTags(selectedTags);
    }

    const handleInputChange = (value) => {
        setInputValue(value);
    }

    useEffect(() => {
        const fetchOptions = async () => {
            const response = await fetch('http://localhost:8000/api/tags');
            const data = await response.json();
            if(data.success) {
                const options_list = data.tags.map(tag => {
                    return { value: tag.tag_id, label: tag.tag_name }
                });
                setOptions(options_list);
            } else {
                console.error('標籤讀取失敗', data.message)
            }
        }
        fetchOptions();
    }, []);

    const createPost = async (e) => {
        e.preventDefault();
        const post = { title, content, selectedTags };

        const response = await fetch('http://localhost:8000/api/posts', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(post)
        });

        if (response.ok) {
            navigate('/');
            console.log('post created');
        }
    }

    return ( 
        <div>
            <h2>建立新貼文</h2>
            <p>標題</p>
            <input
                type="text"
                required
            ></input>
            <p>內容</p>
            <input
                type="text"
                required
            ></input>
            <p>標籤</p>
            <input
                type="text"
                required
            ></input>
            <button>建立</button>
        </div>
    );
}
 
export default Create;