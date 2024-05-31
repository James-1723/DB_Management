import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import '../style/Sign-up.css'

const Signup = () => {

    const [userName, setUserName] = useState('')
    const [userEmail, setUserEmail] = useState('')
    const [userPassword, setUserPassword] = useState('')

    const navigate = useNavigate()

    const submitRegisterInput = async (e) => {
        e.preventDefault();
        const input = {
            "user_name": userName,
            "user_email": userEmail,
            "user_password": userPassword,
        }

        const response = await fetch('http://localhost:8000/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(input),
        })

        const data = await response.json();
        if(data.success) { 
            console.log("註冊成功");
            navigate('/login');
        }
        else { console.error("註冊失敗", data.message) }
    }

    return ( 
        <div className="sign-up-container">
            <div className='sign-up-form'>
                <h2>註冊</h2>
                <div className='input-container'>
                    <p>名字</p>
                    <input
                        type='text'
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        required
                    ></input>
                    <p>電子信箱</p>
                    <input
                        type='text'
                        value={userEmail}
                        onChange={e => setUserEmail(e.target.value)}
                        required
                    ></input>
                    <p>密碼</p>
                    <input
                        type='password'
                        value={userPassword}
                        onChange={e => setUserPassword(e.target.value)}
                        required
                    ></input>
                </div>
            </div>
            <button className='sign-up-button' onClick={submitRegisterInput}>註冊</button>
        </div>
    );
}
 
export default Signup;