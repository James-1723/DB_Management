import { useEffect, useState } from 'react';
import { useUser } from '../context/UserContext.js';
import { useNavigate } from 'react-router-dom';

import '../style/Post.css';

const User = () => {
    const {user, setUser} = useUser();
    const [posts, setPosts] = useState([]);

    const displayName = user && user.user_name ? user.user_name : '';
    const navigate = useNavigate();

    const logout = () => {
        setUser(null)
        localStorage.removeItem('user');
        navigate('/')
        console.log('登出成功')
    }

    useEffect(() => {
        const fetchPosts = async () => {
            //將測試資料改為以下的api
            const response = await fetch('http://localhost:8000/api/posts/${user.user_id}', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const data = await response.json();
            console.log(data);
            setPosts(data.posts);
            setPosts([
                {
                    "post_id": 1,
                    "post_title": "Hello, World",
                    "post_content": "This is a test post",
                    "post_tags": ["test", "hello"]
                },
                {
                    "post_id": 2,
                    "post_title": "Goodbye, World",
                    "post_content": "This is another test post",
                    "post_tags": ["test", "goodbye"]
                }
            ])
        }
        fetchPosts();
    }, [])

    return ( 
        <div>
            <h2 className={displayName ? '' : 'hide'}>Hello {displayName}, this is your personal page</h2>
            <div>
                {
                    posts ? posts.map((post, index) => {
                        return (
                            <div key={index} className='post'>
                                <h3>{post.post_title}</h3>
                                <p>{post.post_content}</p>
                                <div>
                                    {post.post_tags.map((tag, index) => {
                                        return <span key={index}>{tag}</span>
                                    })}
                                </div>
                            </div>
                        )
                    }) : ''
                }
            </div>
        </div>
    );
}

 
export default User;