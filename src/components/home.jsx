import { useEffect, useState } from 'react'
import './home.css'
import { Link, useNavigate } from 'react-router-dom';

export function Home({
    expiredToken}) {

    expiredToken();

    const [menu, setMenu] = useState(true);

    const username = localStorage.getItem('username');
    
    const token = localStorage.getItem('token');

    const [notice, setNotice] = useState(false);

    const navigate = useNavigate();

    const userURL = `http://localhost:5173/${username}`;

    useEffect( () => {
        const home = async () => {
            try {
                const req = await fetch(`https://obi-be.onrender.com/obi/home`, {
                    method : 'GET',
                    headers : {
                        'Authorization' : `Bearer ${token}`
                    }
                });

                const res = await req.json();

                if(res.success == false) {
                    navigate('/login')
                }
            } catch (error) {
                console.log(error);
            }
        }

        home();
    }, []);

    return (
        <div className="profile-page">
            {!menu && <div className="menu-page">
                <div className="close-icon">
                    <svg onClick={() => {
                        setMenu(true);
                    }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="30" height="30" color="#ffffff" fill="none">
                        <path d="M18 6L6.00081 17.9992M17.9992 18L6 6.00085" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                    </svg>
                </div>

                <div className="logout-btn">
                    <button onClick={() => {
                        navigate('/login');

                        localStorage.clear();
                    }}>Log Out</button>
                </div>
            </div>}

            {menu && <div className="profile">
                <div className="header">
                    <div id="app-name">
                        Ob!
                    </div>

                    <div className="menu">
                        <svg onClick={() => {
                            setMenu(false);
                        }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#080808ff" fill="none">
                            <path d="M4 5L20 5" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                            <path d="M4 12L20 12" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                            <path d="M4 19L20 19" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                        </svg>
                    </div>
                </div>

                <div className="curve-cover">
                    <div className="curve">.</div>
                </div>

                <div className="hi">
                    Hi, {username.length > 8 ? username.slice(0, 8) + '...' : username} 👋
                </div>
                <div className="wlcm-note">
                    Share your link. Receive real, unfiltered messages from the people who know you — or think they do.
                </div>

                <div className="profile-btns">
                    <div className="my-msg p-b">
                        <Link to={'/messages'}><button className=''>My messages</button></Link>
                    </div>
                    
                    <div className="copy-share animated">
                        <div className="c-s-txt">
                            Copy and share your link
                        </div>

                        <div className="profile-link">
                            <div className="user-url">
                                <input value={userURL}/>
                            </div>

                            
                            <svg onClick={() => {
                                setNotice((n) => !n);

                                setTimeout(() => {
                                    setNotice((n) => !n);
                                }, 3000);

                                navigator.clipboard.writeText(userURL)
                                .then(() => console.log('Copied!', userURL))
                                .catch((err) => console.error('Copy failed:', err));
                            }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="30" height="30" color="#000000" fill="none">
                                <path d="M9 15C9 12.1716 9 10.7574 9.87868 9.87868C10.7574 9 12.1716 9 15 9L16 9C18.8284 9 20.2426 9 21.1213 9.87868C22 10.7574 22 12.1716 22 15V16C22 18.8284 22 20.2426 21.1213 21.1213C20.2426 22 18.8284 22 16 22H15C12.1716 22 10.7574 22 9.87868 21.1213C9 20.2426 9 18.8284 9 16L9 15Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                <path d="M16.9999 9C16.9975 6.04291 16.9528 4.51121 16.092 3.46243C15.9258 3.25989 15.7401 3.07418 15.5376 2.90796C14.4312 2 12.7875 2 9.5 2C6.21252 2 4.56878 2 3.46243 2.90796C3.25989 3.07417 3.07418 3.25989 2.90796 3.46243C2 4.56878 2 6.21252 2 9.5C2 12.7875 2 14.4312 2.90796 15.5376C3.07417 15.7401 3.25989 15.9258 3.46243 16.092C4.51121 16.9528 6.04291 16.9975 9 16.9999" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                            </svg>
                        </div>
                    </div>

                    <div className="gap"></div>

                    {notice && <div className="notice">
                        Copied.
                    </div>}
                </div>
            </div>}
        </div>
    )
}