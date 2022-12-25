import React from 'react';
import { useState } from 'react';
import Jumbotron from '../../components/jumbotron/Jumbotron';
import axios from 'axios';
import toast from 'react-hot-toast'
import { useAuth } from '../../components/context/auth';
import { useLocation, useNavigate } from 'react-router-dom';

function Login(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // hooks
    const [auth,setAuth] = useAuth();

    const navigate = useNavigate();
    // location
    const location = useLocation();

    const handleSubmit=async(e)=>{
        e.preventDefault()
        try {
            let {data}  = await axios.post(`/login`,{email,password});
            if(data.error){
                toast.error(data.error)
            }else{
                localStorage.setItem('auth',JSON.stringify(data))
                setAuth({...auth,user:data.user,token:data.token})
                toast.success("Login successeful");
                navigate(location.state || `/dashboard/${data?.user?.role === 1 ? "admin" : "user"}`);
            }
        } catch (error) {
            toast.error(error)
        }
    }

    return (
        <>
            <Jumbotron title={'Login'} />
            <div className="container mt-5">
                <div className="row">
                    <form onSubmit={handleSubmit}>
                        <div className="col-md-6 offset-3">
                    
                            <input type="email" className='form-control p-2 mb-4' placeholder='Enter your email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <input type="password" className='form-control p-2 mb-4' placeholder='Enter your password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button className='btn btn-primary' type='submit'>Submit</button>
                        </div>
                    </form>

                </div>
            </div>
        </>
    );
}

export default Login;