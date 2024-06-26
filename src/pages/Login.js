import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useUser } from '../context/UserContext.js'
import '../style/Login.css';

const Login = () => {

    const [userEmail, setUserEmail] = useState('')
    const [userPassword, setUserPassword] = useState('')
    const { user, setUser} = useUser();

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
            localStorage.setItem("user", JSON.stringify(data.user));
            setUser(data.user);
            navigate('/');
        }
        else { console.error("登入失敗", data.message) }
    }

    return ( 
        
        <div className="login-container">
            <form className='login-form'>
                <h2>登入</h2>
                <div className='input-container'>
                    <p>電子郵件</p>
                        <input
                            type='text'
                            id='user-email'
                            value={userEmail}
                            onChange={e => setUserEmail(e.target.value)}
                            required
                        ></input>
                    
                    <p>密碼</p>
                    <input
                        type='password'
                        id='user-password'
                        value={userPassword}
                        onChange={e => setUserPassword(e.target.value)}
                        required
                    ></input>
                </div>
                <button className='login-button' onClick={submitLoginInput}>登入</button>
            </form>

            <Link to='/sign-up'>註冊</Link>
        </div>
    );
}
 
export default Login;