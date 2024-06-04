import { useEffect, useState } from 'react';
import { useUser } from '../context/UserContext.js'
import '../style/Create.css';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';

const Create = () => {

    const navigate = useNavigate();
    const { user } = useUser();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const [inputValue, setInputValue] = useState('');
    const [selectedTags, setselectedTags] = useState([]);
    
    const [options, setOptions] = useState()
    const [selectedImg, setSelectedImg] = useState(null);
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

    const handleFileChange = async (e) => {
        const img = e.target.files[0]; 
        if (!img) return;//沒有傳圖片就跳出function
    
        const reader = new FileReader();
        reader.addEventListener('load',()=>{ //load 監聽器可以在圖片讀取完之後觸發
            setSelectedImg(reader.result) //reader result 是base64 編碼的字符串
            console.log('image set');
        })
        reader.readAsDataURL(img);
        console.log(img)
        // const base64String = await new Promise((resolve, reject) => {
        //     reader.onloadend = () => resolve(reader.result);
        //     reader.onerror = reject;
        // });
    
        // setSelectedImg(base64String);
    }
    const createPost = async (e) => {
        e.preventDefault();
        // let base64String = '';
        // if (setSelectedImg) {
        // const reader = new FileReader();
        // reader.readAsDataURL(setSelectedImg);
        // base64String = await new Promise((resolve, reject) => {
        //     reader.onloadend = () => resolve(reader.result);
        //     reader.onerror = reject;
        // });
        // }

        //多傳入一個user_id
        const post = { title, content, selectedTags, selectedImg, user_id: user.user_id};
        console.log(selectedImg)
        const response = await fetch('http://localhost:8000/api/post', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(post)
        });

        if (response.ok) {
            navigate('/');
            console.log('post created');
        } else {
            console.log('connection failed');
        }
    }

    return ( 
        <div className='create-container'>
            <div className='create-form'>
                <h2>建立新貼文</h2>
                <div className='create-content'>
                    <p>標題</p>
                    <input
                        type="text"
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    ></input>
                    <p>內容</p>
                    <input
                        type="text"
                        required
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    ></input>
                    <p>標籤</p>
                    <input 
                        type="file"
                        required
                        //value={"img"}
                        onChange={(e) => handleFileChange(e)}
                    ></input>
                    {selectedImg && (
                        <img src={selectedImg} alt="Selected" style={{ width: '200px' }} />
                    )}
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
                    <button className="create-button" onClick={createPost}>建立</button>
                </div>
            </div>
            
        </div>
    );
}
 
export default Create;