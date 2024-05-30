import { useState } from 'react';
import { useUser } from '../context/UserContext.js'
import { useNavigate } from 'react-router-dom';
import '../style/Post.css';
// import '../style/Navbar.css';
const Home = () => {

    const navigate = useNavigate();
    const [name, setName] = useState('lemonade');
    const [postList, setPostList] = useState([]); // [{title: '...', content: '...'}, {title: '...', content: '...'}]

    const [title, setTitle] = useState('Tomato egg noodles');
    const [content, setContent] = useState('Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos?');
    const [tags, setTags] = useState(['software', 'developer', 'engineer']);

    const { user } = useUser();

    const getPostList = async () => {
        const response = await fetch(`http://localhost:8000/api/posts?userId=${user.user_id}`);
        const data = await response.json();
        if(data.success) {
            const newPosts = data.posts.map(post => ({
                title: post.title,
                content: post.content,
                tags: post.tags,
                id: post.id
            }));
            setPostList(newPosts);        
        } else {
            console.error('文章讀取失敗', data.message);
        }
    }

    const handlePostClick = (post_id) => {
        navigate(`/post/${post_id}`);
    }

    return (
        <div>
            {/* api 待開發 */}
            {/* <div className="post" onClick={() => {handlePostClick(post_id)}}> */}
            <div className="post">
                <div className="post_inside">
                    <div className='poster-info'>
                        <div className='poster-pic' style={{backgroundColor: 'orange', color: 'white'}}>
                            {name.charAt(0).toUpperCase()}
                        </div>
                        <p className="poster-name">{name}</p>
                    </div>
                    <h3 className='post-title'>{title}</h3>
                    {tags.map((tag, index) => {
                        return <span className='tag' key={index}>{tag}</span>
                    })}
                    <p className="post-content">{content}</p>
                </div>
            </div>
        </div>
    );
}
 
export default Home;