import { useState } from "react";
import "./register.css";
import RoomIcon from "@mui/icons-material/Room";
import CancelIcon from '@mui/icons-material/Cancel';
import { useRef } from "react";
import axios from "axios";

export default function Register({setshowRegister}){
    const [success, setSuccess]= useState(false);
    const [error, setError]= useState(false);
    const nameRef= useRef();
    const emailRef= useRef();
    const passwordRef= useRef();
    const handleSubmit= async (e)=>{
        e.preventDefault();
        const newUser= {
            username: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
        }
        try {
            const res= await axios.post("http://localhost:8800/users/register", newUser);
            setError(false);
            setSuccess(true);
        } catch (error) {
            setError(true);
        }
    }
    return(
        <div className="registerContainer">
            <div className="logo">
                <RoomIcon />
                Easy Travel App
            </div>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="username" ref={nameRef} />
                <input type="email" placeholder="email" ref={emailRef}/>
                <input type="password" placeholder="password" ref={passwordRef}/>
                <button className="registerBtn">Register</button>
                {success && 
                (<span className="success">Successfully logged in!</span>)}
                {error && (
                <span className="failure">OOPS! Something went wrong.</span>)}
            </form>
            <CancelIcon className="registerCancel" onClick={()=>setshowRegister(false)} />
        </div>
    )
}