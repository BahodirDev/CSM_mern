import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import Jumbotron from '../components/jumbotron/Jumbotron';
import ProductCard from '../components/jumbotron/ProductCard';

function Home(props) {

    // state
    const [products, setProducts] = useState([]);
    const [total, setTotal] = useState(1);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);

    useEffect(() => {
        loadingProducts();
        totalCount();
    }, []);

    useEffect(()=>{
        if(page === 1) return;
        loadMore();
    },[page])

    const loadingProducts = async () => {
        try {
            let { data } = await axios.get(`/list-page/${page}`);

            if (data.error) {
                toast.error(data.error)
            } else {
                setProducts(data)
            }
        } catch (error) {
            console.log(error);
        }
    }
    const totalCount = async () => {
        try {
            let { data } = await axios.get('/total-count');

            if (data.error) {
                toast.error(data.error)
            } else {
                setTotal(data)
            }
        } catch (error) {
            console.log(error);
        }
    }

    const loadMore =async()=>{
        try {
            setLoading(true)
            let { data } = await axios.get(`/list-page/${page}`);
            setProducts([...products, ...data]);
            setLoading(false)
        } catch (error) {
            console.log(error);
        }
    }

    let arr = [...products];
    const sortedArray = arr.sort((a, b) => a.sold < b.sold ? 1 : -1)

    return (
        <>
            <div className='conatiner'>
                <Jumbotron title={'Home'} />
                <div className="row">
                    <div className="col-md-6">
                        <h2 className='text-center p-3 mb-2 mt-2 bg-light h4' >New Arrivals</h2>
                        <div className="row">
                            {
                                products?.map((p) => (
                                    <div className="col-md-6" key={p._id}>
                                        <ProductCard p={p} />

                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div className="col-md-6">
                        <h2 className='text-center p-3 mb-2 mt-2 bg-light h4' >Best Sellers</h2>
                        <div className="row">
                            {
                                sortedArray?.map((p) => (
                                    <div className="col-md-6" key={p._id}>
                                        <ProductCard p={p} />

                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>


            </div>
            <div className="container">
                <div className="row">
                    {
                        products && products.length < total &&
                        <button className='btn btn-outline-warning col-md-6 offset-3 p-2 mt-4' disabled={loading} onClick={()=>setPage(page+1)}>
                            Load More
                        </button>
                    }
                </div>
            </div>
        </>
    );
}

export default Home;