import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Outlet, useFetcher } from 'react-router-dom';
import { useAuth } from '../context/auth';
import Loading from './Loading';

function PrivateRoute(props) {

    // hooks
    const [auth, setAuth] = useAuth()

    // state
    const [ok, setOk] = useState(false);

    useEffect(() => {
        let checkAuth = async () => {
            let { data } = await axios.get('/auth-check');
            if (data?.ok) {
                setOk(true)
            } else {
                setOk(false)
            }
        }
        checkAuth()
    }, [auth?.token])



    return ok ? <Outlet /> : <Loading />
}

export default PrivateRoute;