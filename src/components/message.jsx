import { useEffect, useState } from 'react'
import './message.css'
import { Link } from 'react-router-dom';

export function Message({
    expiredToken}) {

    expiredToken();

    const [preview, setPreview] = useState(false);
    const [blurPage, setBlurPage] = useState('');
    const [notice, setNotice] = useState(false);

    const [messagePreview, setMessagePreview] = useState('');

    const username = localStorage.getItem('username');
    
    const userURL = `https://obi-rose.vercel.app/${username}`;

    const userId = localStorage.getItem('userId');

    const [myMessages, setMyMessages] = useState([]);
    
    function formatDateTime(isoString) {
        const dateObj = new Date(isoString);

        return (
            dateObj.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }) +
            ', ' +
            dateObj.toLocaleDateString('en-GB').replace(/\//g, '-')
        );
    }

    useEffect(() => {
        const getMessages = async () => {
            try {
                const req = await fetch('https://obi-be.onrender.com/obi/getmsg', {
                    method : 'POST',
                    headers : {
                        'Content-Type' : 'application/json'
                    },
                    body : JSON.stringify({userId})
                });

                const res = await req.json();

                setMyMessages(res.message);
            } catch (error) {
                console.log(error);
            }
        }

        getMessages();
    }, []);

    return (
        <div>
            {preview && <div className="screenshot-preview">
                <div className="msg-body-cover">
                    <div className="msg-body">
                        <div>
                            Anonymous message
                        </div>

                        <div>
                            {messagePreview}
                        </div>
                    </div>
                </div>
            </div>}

            <div onClick={() => {
                if(preview == true) {
                    setPreview(false);
                    setBlurPage('');
                }
            }} className={`msg-header ${blurPage}`}>
                <div className="back-icon">
                    <Link to={'/'}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#ffffff" fill="none">
                        <path d="M3.99982 11.9998L19.9998 11.9998" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                        <path d="M8.99963 17C8.99963 17 3.99968 13.3176 3.99966 12C3.99965 10.6824 8.99966 7 8.99966 7" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                    </svg></Link>
                </div>

                <div className="anony-msg-txt">
                    Anonymous Messages
                </div>
            </div>

            <div style={{marginBottom : '100px'}}></div>

            {myMessages && <div onClick={() => {
                if(preview == true) {
                    setPreview(false);
                    setBlurPage('');
                }
            }} className={`message-page ${blurPage}`}>
                <div className="messages">

                    <div className="msg-body-cover" onClick={() => {
                        setPreview(true);
                        setBlurPage('blur-page')
                    }}>
                        {myMessages ?.map((m) => (
                            <div onClick={() => {
                                setMessagePreview(m.message);
                            }} className="msg-body">
                            <div>
                                Anonymous message
                            </div>

                            <div>
                                {m.message}
                            </div>

                            <div className="msg-time">
                                {formatDateTime(m.createdAt)}
                            </div>
                        </div>
                        ))}
                    </div>
                </div>
            
            <div style={{color : 'white'}}>.</div>
            </div>}

            {myMessages.length < 1 && <div className="if-no-msg">
                <div className='oops'>
                    Oops!
                </div>
                <div className='no-msg'>
                    No messages yet.
                </div>

                <div className="copy-share animated">
                    <div className="c-s-txt">
                        Copy and share your profile
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
            </div>}
        </div>
    )
}