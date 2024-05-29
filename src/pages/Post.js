import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const PostDetail = () => {
    const { postId } = useParams();
    const [post, setPost] = useState(null);

    useEffect(() => {
        const fetchPostData = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/post/${postId}`);
                const data = await response.json();
                if(data.success) {
                    setPost(data.post);
                } else {
                    console.error('文章讀取失敗', data.message);
                }
            } catch (error) {
                console.error('網絡錯誤或伺服器問題', error);
            }
        };

        fetchPostData();
    }, [postId]);

    if (!post) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{post.title}</h1>
            <p>{post.content}</p>
        </div>
    );
}

export default PostDetail;