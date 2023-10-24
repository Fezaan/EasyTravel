import { useState } from "react";
import "./login.css";
import RoomIcon from "@mui/icons-material/Room";
import CancelIcon from '@mui/icons-material/Cancel';
import { useRef } from "react";
import axios from "axios";

export default function Login({setshowLogin, myStorage}){
    const [error, setError]= useState(false);
    const nameRef= useRef();
    const passwordRef= useRef();
    const handleSubmit= async (e)=>{
        e.preventDefault();
        const user= {
            username: nameRef.current.value,
            password: passwordRef.current.value,
        }
        try {
            const res= await axios.post("http://localhost:8800/users/login", user);
            myStorage.setItem("user",res.data.username);
            setError(false);
        } catch (error) {
            setError(true);
        }
    }
    return(
        <div className="loginContainer">
            <div className="logo">
                <RoomIcon />
                Easy Travel App
            </div>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="username" ref={nameRef} />
                <input type="password" placeholder="password" ref={passwordRef}/>
                <button className="loginBtn">Login</button>
                {error && (
                <span className="failure">OOPS! Something went wrong.</span>)}
            </form>
            <CancelIcon className="loginCancel" onClick={()=>setshowLogin(false)} />
        </div>
    )
}