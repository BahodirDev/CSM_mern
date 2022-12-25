import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useAuth } from '../../components/context/auth';
import Jumbotron from '../../components/jumbotron/Jumbotron';
import UserMenu from '../../components/nav/UserMenu';
import toast from 'react-hot-toast';

function UserProfile(props) {

    // hooks
    const [auth, setAuth] = useAuth();
    // state


    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [address,setAddress] = useState('')

    useEffect(()=>{
        if(auth?.user){
            const {name,email,address,password} = auth.user;
            setName(name);
            setAddress(address);
            setEmail(email)

        }
    },[auth?.user])


    const handleProfile = async(e)=>{
 
        try {
            e.preventDefault();
            let {data} = await axios.put('/profile',{
                name,
                email,
                password,
                address
            });
            if(data.error){
                toast.error(data.error)
            }else{
                setAuth({...auth,user:data});
                let ls = localStorage.getItem('auth');
                ls = JSON.parse(ls);
                ls.user = data;
                localStorage.setItem('auth',JSON.stringify(ls));
                toast.success('Updated successfully')

            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <Jumbotron title={auth?.user?.name} subTitle="Dashboard" />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3">
                    <UserMenu />

                    </div>
                    <div className="col-md-9">

                            <h3 className='text-center bg-light p-3'>User Details</h3>

                       <form onSubmit={handleProfile}>
                            <input 
                            type="text" 
                            className='form-control p-2 m-2' 
                            value={name} 
                            onChange={(e)=>setName(e.target.value)} 
                            placeholder="Please enter your name"
                            autoFocus={true}
                            />
                            <input 
                            type="email" 
                            className='form-control p-2 m-2' 
                            value={email} 
                            onChange={(e)=>setEmail(e.target.value)} 
                            placeholder="Your Email"
                            disabled={true}
                            />
                            <input 
                            type="password" 
                            className='form-control p-2 m-2' 
                            value={password} 
                            onChange={(e)=>setPassword(e.target.value)} 
                            placeholder="Please enter your password"
                            />
                            <input 
                            type="text" 
                            className='form-control p-2 m-2' 
                            value={address} 
                            onChange={(e)=>setAddress(e.target.value)} 
                            placeholder="Please enter your address"
                           
                            />
                            <button className='btn btn-outline-warning  p-2 m-2' type='submit' onClick={handleProfile}>Submit</button>
                        </form>                       
                    </div>
                </div>
            </div>
        </>
    );
}

export default UserProfile;