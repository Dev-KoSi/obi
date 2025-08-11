import { useState } from "react";
import './home.css'
import { useNavigate } from "react-router-dom";


export function Menu({setMenu}) {
    const [message, setMessage] = useState('');
    const username = 'AdminSika';

    const navigate = useNavigate();

    const [prmtTrue, setPrmtTrue] = useState(false);

    const [prmtFalse, setPrmtFalse] = useState(false);

    const [prompt, setPrompt] = useState('');

    const sendMsgFunc = async () => {
        try {
            setPrmtTrue(false);
            setPrmtFalse(false);

            const req = await fetch('https://obi-be.onrender.com/obi/sendmsg', {
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify({username, message})
            });

            const res = await req.json();

            if(res.success == true) {
                setPrmtTrue(true);
                setPrompt(res.prompt)

                setMessage('');
            } else if(res.success == false) {
                setPrmtFalse(true);
                setPrompt(res.prompt)
            }
            
        } catch (error) {
            console.log(error);
        }
    }

    return(
        <div>
            {prmtTrue && <div style={{backgroundColor: 'green', position : 'fixed', top : '5%', right : '0', left : '0'}} className="sign-notice">
                {prompt}
            </div>}

            {prmtFalse && <div style={{backgroundColor: 'red', position : 'fixed', top : '5%', right : '0', left : '0'}} className="sign-notice">
                {prompt}
            </div>}

            <div className="close-icon">
                <svg onClick={() => {
                    setMenu(true);
                }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="30" height="30" color="#ffffff" fill="none">
                    <path d="M18 6L6.00081 17.9992M17.9992 18L6 6.00085" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                </svg>
            </div>

            <div className="feedback-field">
                <div className="com-txt">
                    Kindly let us know what to improve on.
                </div>

                <textarea value={message} onChange={(e) => {
                    setMessage(e.target.value);
                }} placeholder='say something...'></textarea>
                {message.length > 0 && <div className='sendfb-btn'>
                    <button onClick={() => {
                        sendMsgFunc();
                    }}>Send feedback</button>
                </div>}
            </div>

            <div className="logout-btn">
                <button onClick={() => {
                    navigate('/login');

                    localStorage.clear();
                }}>Log Out</button>
            </div>
        </div>
    )
}