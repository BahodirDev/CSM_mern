import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../components/context/auth';
import Jumbotron from '../../components/jumbotron/Jumbotron';
import AdminMenu from '../../components/nav/AdminMenu';
import moment from 'moment'



function AdminProducts(props) {

    const [products, setProducts] = useState([])
    // hooks

    // function
    const loadingProducts = async () => {
        let { data } = await axios.get('/products');
        setProducts(data);
    }

    const [auth, setAuth] = useAuth()
    useEffect(() => {
        loadingProducts()
    }, [])




    return (
        <>
            <Jumbotron title={auth?.user?.name} subTitle="Admin Dashboard" />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <div className='p-3 mb-2 h4 mt-2 bg-light'>
                            Products
                        </div>
                        {
                            products?.map((p) => (

                                <div className="card mb-3" key={p._id}>
                                    <div className="row g-0">
                                        <div className="col-md-4">
                                            <img src={`${process.env.REACT_APP_API}/product/photo/${p._id}?`} alt="product image" className='img-fluid rounded-start' />
                                        </div>
                                        <div className="col-md-8">
                                            <div className="card-body">
                                                <h5 className="card-title">
                                                // <Link
                                                        to={`/dashboard/admin/product/update/${p.slug}`}
                                                        className='list-unstyled'
                                                    >
                                                        {p.name}
                                                    </Link>

                                                </h5>
                                                <p className="card-text">
                                                    {p.description?.slice(0,160)}
                                                    ...
                                                </p>
                                                <p className="card-text">
                                                    <small className='text-muted'>
                                                        {moment(p.createdAt).format('MMMM Do YYYY, h:mm:ss a')}
                                                    </small>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }

                    </div>
                </div>
            </div>
        </>
    );
}

export default AdminProducts;