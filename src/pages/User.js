import { useState } from 'react';
import { useUser } from '../context/UserContext.js';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
            try {
                const response = await fetch('http://localhost:8000/api/posts/${user.user_id}', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user.token}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Network response error');
                }

                const data = await response.json();
                console.log(data);
                setPosts(data.posts);
                //setPosts([
                //    {
                //        "post_id": 1,
                //        "post_title": "Hello, World",
                //        "post_content": "This is a test post",
                //        "post_tags": ["test", "hello"]
                //    },
                //    {
                //        "post_id": 2,
                //        "post_title": "Goodbye, World",
                //        "post_content": "This is another test post",
                //        "post_tags": ["test", "goodbye"]
                //    }
                //])
            } catch (error) {
                console.error('Fetch posts failed:', error);
            }
        }
        fetchPosts();
    }, [user.user_id, user.token])
    return ( 
        <div>
            <p>This is title page</p>
            <p className={displayName ? '' : 'hide'}>Hello, {displayName}</p>
            <button onClick={logout}>Log out</button>
        </div>
    );
}

 
export default User;