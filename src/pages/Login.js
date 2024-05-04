import {useState} from 'react'
import {useNavigate} from 'react-router-dom'

const Login = () => {

    const [userEmail, setUserEmail] = useState('')
    const [userPassword, setUserPassword] = useState('')

    const navigate = useNavigate()

    const submitLoginInput = async (e) => {
        e.preventDefault();
        const input = {
            "user_email": userEmail,
            "user_password": userPassword,
        }

        const response = await fetch('http://localhost:8000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(input),
        })

        const data = await response.json();
        if(data.success) { 
            console.log("登入成功");
            navigate('/');
        }
        else { console.error("登入失敗", data.message) }
    }

    return ( 
        <div className="login">
            <h2>Login</h2>
            <p>Email</p>
            <input
                type='text'
                value={userEmail}
                onChange={e => setUserEmail(e.target.value)}
                required
            ></input>
            <p>Password</p>
             <input
                type='password'
                value={userPassword}
                onChange={e => setUserPassword(e.target.value)}
                required
            ></input>
            <button onClick={submitLoginInput}>Login</button>
        </div>
    );
}
 
export default Login;