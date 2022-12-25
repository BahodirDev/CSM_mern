import React from 'react';
import { useState } from 'react';
import Jumbotron from '../../components/jumbotron/Jumbotron';
import axios from 'axios';
import toast from 'react-hot-toast'
import { useAuth } from '../../components/context/auth';
import { useNavigate } from 'react-router-dom';

function Register(props) {
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    // hooks
    const [auth,setAuth] = useAuth();

    const navigate = useNavigate()

    const handleSubmit=async(e)=>{
        e.preventDefault()
        try {
            let {data}  = await axios.post(`/register`,{name,email,password});
            if(data.error){
                toast.error(data.error)
            }else{
                localStorage.setItem('auth',JSON.stringify(data))
                setAuth({...auth,user:data.user,token:data.token})
                toast.success("Register successeful");
                navigate('/shop')
            }
        } catch (error) {
            toast.error(error)
        }
    }

    return (
        <>
            <Jumbotron title={'Register'} />
            <div className="container mt-5">
                <div className="row">
                    <form onSubmit={handleSubmit}>
                        <div className="col-md-6 offset-3">
                            <input type="text" className='form-control p-2 mb-4' placeholder='Enter your name'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
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

export default Register;