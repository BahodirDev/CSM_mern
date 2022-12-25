import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/auth';
import { useCarts } from '../context/cart';
import DropIn from 'braintree-web-drop-in-react';
import toast from 'react-hot-toast'

function UserSideBar(props) {
    const [carts, setCarts] = useCarts();
    const [auth, setAuth] = useAuth();
    // state
    const [loading, setLoading] = useState(false);


    // state
    const [token, setToken] = useState("")
    const [instance, setInstance] = useState("")

    useEffect(() => {
        if (auth?.token) {
            getClientToken()
        }
    }, [auth?.token])


    const getClientToken = async () => {
        try {
            let { data } = await axios.get("/braintree/token");

            setToken(data.clientToken);

        } catch (error) {
            console.log(error);
        }
    }

    const handleBuy = async () => {
        try {
            const { nonce } = await instance.requestPaymentMethod();
            // console.log('nonce =>', nonce);
            const { data } = await axios.post("/braintree/payment", {
                nonce,
                carts
            });
            setLoading(true);
            localStorage.removeItem("carts");
            setCarts([]);
            toast.success('Payment done');
            setLoading(false)
        } catch (error) {
            console.log(error);
        }
    }


    const getTotal = () => {
        let total = 0;
        carts.map((s) => {
            total += s.price;
        })
        return total.toLocaleString('en-US', {
            currency: "USD",
            style: "currency"
        });
    }

    const navigate = useNavigate()
    return (
        <div className="col-md-4 mt-2">
            Address / Payments / Delivery
            <h4>
                Your cart summary
            </h4>
            <hr />
            <h6>
                Total:  {getTotal()}
            </h6>
            <div className='p-4 mb-2 mt-2 bg-light text-center'>
                {
                    auth?.user?.address ? (
                        <>
                            <div className='mt-2 mb-2 p-2 bg-light'>
                                <h4>  {auth?.user?.address}</h4>
                            </div>
                            <button className='btn btn-outline-warning' onClick={() => navigate('/dashboard/user/profile')}>Update</button>

                        </>) : (
                        <div>
                            {
                                auth?.token ? (
                                    <div className='mt-2 mb-2 p-2 text-center bg-light'>
                                        {auth?.user?.address}
                                        <button className='btn btn-outline-warning' onClick={() => navigate('/dashboard/user/profile')}>Add Delivery address</button>
                                    </div>
                                ) : (
                                    <div className='mt-2 mb-2 p-2 text-center bg-light'>
                                        <button className='btn btn-outline-warning' onClick={() => navigate('/login', {
                                            state: "/cart"
                                        })}>Login to Check</button>
                                    </div>
                                )}
                        </div>
                    )
                }

            </div>
            <div>
                {
                    !token || !carts?.length ? "" :
                        <>
                            <div className='bg-danger p-3 text-center rounded shadow my-2'>
                                <h5 className='text-white'>I hope you realize that the website is not real but payment methods work acutally, I want to notify you, if you use visa or Paypal cards, your card might be charged for bill, please be careful!!!</h5>
                            </div>
                            <DropIn
                                options={{
                                    authorization: token,
                                    paypal: {
                                        flow: "vault"
                                    }
                                }}
                                onInstance={(instance) => setInstance(instance)}
                            />
                            <button className='btn btn-outline-success mb-2 mt-2 col-12' onClick={handleBuy} disabled={!auth?.user?.address || !instance || loading}>
                                {
                                    loading ? 'Proccessing' : 'Buy'
                                }
                            </button>
                        </>
                }

            </div>
        </div>
    );
}

export default UserSideBar;