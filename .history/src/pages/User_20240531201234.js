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
            try {
                const response = await fetch(`http://localhost:8000/api/posts/${user.user_id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user.token}`
                    }
                });
                
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                console.log(data);

                setPosts(data.posts);
            } catch (error) {
                console.error('Fetch posts failed:', error);
            }
        }
        fetchPosts();
    }, [user.user_id, user.token])

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