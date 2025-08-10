import { useEffect, useState } from "react"
import './sendMsg.css'
import { Link, useParams } from "react-router-dom";

export function SendMsg() {
    const [message, setMessage] = useState('');

    const [prmtTrue, setPrmtTrue] = useState(false);

    const [prmtFalse, setPrmtFalse] = useState(false);

    const [prompt, setPrompt] = useState('');
    
    const {username} = useParams();

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

    return (
        <div className="sendmsg-page">
            <div style={{marginTop : '10px'}}></div>

            {prmtTrue && <div style={{backgroundColor: 'green', margin : '0 auto', width : 'fit-content'}} className="sign-notice">
                {prompt}
            </div>}

            {prmtFalse && <div style={{backgroundColor: 'red', margin : '0 auto', width : 'fit-content'}} className="sign-notice">
                {prompt}
            </div>}
            
            <div className="sendmsg">
                <div className="sendmsg-field">
                    <div className="sendmsg-to">
                        <div className="sendmsg-obi">Ob!</div>

                        <div className="username">
                        Send anonymous message to <span style={{fontWeight : 'bold'}}>@{username}</span>
                        </div>
                    </div>

                    <div className="msg-area">
                        <textarea value={message} onChange={(e) => {
                            setMessage(e.target.value);
                        }} placeholder="say something..."></textarea>
                    </div>

                {message.length > 0 && <div className="sendmsg-btn">
                    <button onClick={() => {
                        sendMsgFunc();
                    }}>Send 🚀</button>
                </div>}
                </div>

                <div className="get-account">
                    <Link to={'/signup'}><button className="animated">Create your account for free</button></Link>
                </div>
            </div>
        </div>
    )
}