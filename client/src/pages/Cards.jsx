import moment from 'moment';
import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/context/auth';
import { useCarts } from '../components/context/cart';
import HorizontalProducts from '../components/jumbotron/HorizontalProducts';
import Jumbotron from '../components/jumbotron/Jumbotron';
import UserSideBar from '../components/jumbotron/UserSideBar';
function Cards(props) {
    const [carts, setCarts] = useCarts();
    const [auth, setAuth] = useAuth();

    // state
    const navigate = useNavigate()
    return (
        <div>
            <Jumbotron title={'Welcome to Cards'} subTitle={`${auth && auth.token ? `${carts?.length ? ` You have ${carts?.length} cards` : `You can keep shopping`}` : 'You must logIn to check  '} `} />

            <div className="conatiner-fluid  ">
                <div className="row bg-light p-4">
                    <div className="col-md-12 text-center">
                        {carts?.length >= 1 ? <h4 className='fw-500'>My Cards</h4> : <button onClick={() => navigate('/')} className="btn btn-primary">Go shopping</button>}
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="row">
                    {/* Horizontal */}
                    <div className="col-md-8">
                        <div className="row">
                            {
                                carts?.length ? carts?.map((p,u) => (
                                    <HorizontalProducts p={p} key={u} />
                                )) : 'Nothing found'
                            }
                        </div>
                    </div>
                    {/* horizontal */}

                    {/* SideBar */}
                    < UserSideBar />
                    {/* SideBar */}
                </div>

            </div>

        </div>
    );
}

export default Cards;