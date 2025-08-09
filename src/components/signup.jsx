import { useEffect, useState } from "react"
import './sign.css'
import { Link, useNavigate } from 'react-router-dom';


export function Signup() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState('password');

    const [prmt, setPrmt] = useState(false)

    const [prompt, setPrompt] = useState('');
    
    const navigate = useNavigate();

    const signupFunc = async () => {
        const user = {
            username,
            password
        }

        setPrmt(false);

        try {
            const req = await fetch(`https://obi-be.onrender.com/obi/signup`, {
                method : `POST`,
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify(user)
            });

            const res = await req.json();

            if(res.success == true) {
                localStorage.setItem('username', res.user.username);

                localStorage.setItem('token', res.token);

                localStorage.setItem('userId', res.user._id);

                navigate('/');
            } else {
                setPrompt(res.prompt);
                setPrmt(true);
            }

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="sign-page">
            {prmt && <div style={{backgroundColor: 'red'}} className="sign-notice">
                {prompt}
            </div>}

                <div className="app-name">
                    Ob!
                </div>
                <div className="slogan">
                    Yes, the anonymous speaks.
                </div>

            <div className="sign">
                <div className="the-user-logo">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40" color="#000000" fill="none">
                        <path d="M17 8.5C17 5.73858 14.7614 3.5 12 3.5C9.23858 3.5 7 5.73858 7 8.5C7 11.2614 9.23858 13.5 12 13.5C14.7614 13.5 17 11.2614 17 8.5Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                        <path d="M19 20.5C19 16.634 15.866 13.5 12 13.5C8.13401 13.5 5 16.634 5 20.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                    </svg>
                </div>
                <div className="sign-txt">
                    Sign Up
                </div>

                <div className="username-input">
                    <input value={username} placeholder="Username" onChange={(e) => {
                        setUsername(e.target.value)
                    }}/>
                </div>

                <div className="password-input">
                    <input type={showPassword} value={password} placeholder="Password" onChange={(e) => {
                        setPassword(e.target.value)
                    }}/>
                </div>

                <div className="showpassword">
                    <input type="checkbox" onClick={() => {
                        setShowPassword((s) => s === '' ? 'password' : '')
                    }}/>
                    <div>Show Password</div>
                </div>

                <div className="sign-btn hover">
                    <button onClick={() => {
                        signupFunc();
                    }}>Sign up</button>
                </div>

                <div className="sign-othwewise">
                    Already have an account? <Link className='Link' to={'/login'}><span>Log in.</span></Link>
                </div>
            </div>
        </div>
    )
}