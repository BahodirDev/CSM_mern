import axios from 'axios';
import {useState,useEffect,createContext,useContext} from 'react';

const AuthProvider =createContext();


 function ContextAuth({children}){
  
    const [auth,setAuth] = useState({
        user:null,
        token:''
    });

// defaults
axios.defaults.baseURL = process.env.REACT_APP_API;
axios.defaults.headers.common["Authorization"] = auth?.token;

    useEffect(()=>{
        let data = localStorage.getItem('auth')
        if(data){
            let parsed = JSON.parse(data);
            setAuth({
                ...auth,
                user:parsed.user,
                token:parsed.token
            })
        }
    },[]);

    return(
        <AuthProvider.Provider value={[auth,setAuth]}>
            {children}
        </AuthProvider.Provider>
    );
}

const useAuth = ()=> useContext(AuthProvider);

export {useAuth,ContextAuth} 