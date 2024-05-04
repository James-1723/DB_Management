import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const NotFound = () => {

    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            navigate('/')
        }, 5000)
    })

    return ( 
        <div>
            <p>Wrong URL, please try again</p>
            <p>Auto redirecting to title in 5 seconds...</p>
        </div>
    );
}
 
export default NotFound;