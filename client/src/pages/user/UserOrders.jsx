import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useAuth } from '../../components/context/auth';
import Jumbotron from '../../components/jumbotron/Jumbotron';
import HorizontalProducts from '../../components/jumbotron/HorizontalProducts'
import UserMenu from '../../components/nav/UserMenu';
import moment from 'moment'

function UserOrders(props) {

    // state
    const [orders, setOrders] = useState([]);

    // hooks
    const [auth, setAuth] = useAuth();

    useEffect(() => {
        if (auth?.token) getOrders();
    }, [auth?.token]);


    const getOrders = async () => {
        try {
            let { data } = await axios.get("list-orders");
            setOrders(data);
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
                        <div className='p-3 mb-2 h4 mt-2 bg-light'>
                            User Informations

                        </div>
                        {
                            orders?.length ?
                                orders?.map((p, i) => {
                                    return (
                                        <div className='border shadow bg-light rounded-4 mb-4' key={p?._id}>
                                            <table className='table'>
                                                <thead>
                                                    <tr>
                                                        <th scope='col'>#</th>
                                                        <th scope='col'>Status</th>
                                                        <th scope='col'>Customer</th>
                                                        <th scope='col'>Ordered</th>
                                                        <th scope='col'>Payment</th>
                                                        <th scope='col'>Quality</th>
                                                    </tr>
                                                </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td>{i +1}</td>
                                                            <td>{p?.status}</td>
                                                            <td>{p?.buyer?.name}</td>
                                                            <td>{moment(p?.createdAt).fromNow()}</td>
                                                            <td>{p?.payment?.success ? 'Success' :" Failed"}</td>
                                                            <td>{p?.products?.length} products</td>
                                                        </tr>

                                                    </tbody>

                                            </table>
                                            <div className="container">
                                                <div className="row p-3">

                                                    {
                                                        p?.products?.map((c,u)=>(
                                                            <HorizontalProducts p={c} remove={false}  key={u}/>
                                                        ))
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                                : 'Nothing Found'
                        }
                    </div>
                </div>
            </div>
        </>
    );
}

export default UserOrders;