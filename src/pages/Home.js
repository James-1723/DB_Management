import { useState } from 'react';
import { useUser } from '../context/UserContext.js'
import '../style/homepage.css';
const Home = () => {

    const [name, setName] = useState('lemonade');
    const [title, setTitle] = useState('Tomato egg noodles');
    const [content, setContent] = useState('Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos?');
    const [tags, setTags] = useState(['software', 'developer', 'engineer']);

    const { user } = useUser();

    return (
        <div>
            <h2>{user ? user.user_name: ''}</h2>
            <div className="post">
                <p className="poster-name">{name}</p>
                <h3 className='post-title'>{title}</h3>
                {tags.map((tag, index) => {
                    return <span className='tag' key={index}>{tag}</span>
                })}
                <p className="post-content">{content}</p>
            </div>
        </div>
    );
}
 
export default Home;