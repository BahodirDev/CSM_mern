import React, { useEffect } from 'react';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/auth';
import png from './images/loading1.gif';


function Loading(props) {

// state
const [count,setCount] = useState(3);

// hooks
const location  = useLocation()


const navigate = useNavigate()

useEffect(()=>{
    let interval = setInterval(()=>{
        setCount((prev)=>--prev)
    },1000);

    count === 0 && navigate("/login",{
        state:location.pathname
    });

    return ()=> clearInterval(interval)

},[count])

    return (
        <div className='d-flex justify-content-center align-items-center vh-100'>
           <h1 className='lead'>Loading...</h1>
        </div>
    );
}

export default Loading;