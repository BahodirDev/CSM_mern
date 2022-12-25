import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import { Badge } from 'antd';
import Productcard from '../components/jumbotron/ProductCard';
import {
    FaDollarSign,
    FaProjectDiagram,
    FaRegClock,
    FaCheck,
    FaTimes,
    FaTruckMoving,
    FaWarehouse,
    FaRocket
} from "react-icons/fa";
import { useCarts } from '../components/context/cart';
import toast from 'react-hot-toast';

function ProductView(props) {

    const [carts,setCarts] = useCarts()

    // state
    const [p, setProduct] = useState();
    const [products, setProducts] = useState([]);

    const { slug } = useParams()

    useEffect(() => {
        if (slug) loadProduct();
    }, [slug])

    const loadProduct = async () => {
        try {
            let { data } = await axios.get(`/product/${slug}`);
            setProduct(data);
            relatedProducts(data._id, data.category._id)
        } catch (error) {
            console.log(error);
        }
    }

    const relatedProducts = async (productId, categoryId) => {
        try {
            let { data } = await axios.get(`/related-products/${productId}/${categoryId}`);
            setProducts(data)
        } catch (error) {

        }
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-9">
                    <div className='card mb-3 '>
                        <Badge.Ribbon text={`${p?.sold} sold`} color="red">
                            <Badge.Ribbon text={`${p?.quantity >= 1 ? `${p?.quantity - p.sold}  in stock` : 'out of stock'} `} color="green" placement='start' >
                                <img src={`${process.env.REACT_APP_API}/product/photo/${p?._id}`} alt={p?.name} className="img img-fluid m-auto d-block" style={{ height: "500px", objectFit: 'cover' }} />
                            </Badge.Ribbon>
                        </Badge.Ribbon>
                        <div className="card-body" style={{ padding: "10px" }}>
                            <div className="card-body">
                                <p className='fw-bolder'>{p?.name}</p>

                            </div>
                            <p className='card-text fw-lighter'  >{p?.description}</p>
                            <div className='d-flex justify-content-between lead bg-light p-5 '>
                                <div>
                                    <p className='fw-bold'><FaDollarSign /> Price: {
                                        p?.price.toLocaleString("en-US", {
                                            style: "currency",
                                            currency: "USD"
                                        })
                                    }</p>
                                    <p><FaProjectDiagram /> Category: {p?.category.name}</p>
                                    <p><FaRegClock /> Added: {moment(p?.createdAt).fromNow()}</p>
                                    <p>{p?.quantity > 0 ? <FaCheck /> : <FaTimes />}  {p?.quantity > 0 ? 'In Stock' : "Out of stock"}</p>
                                    <p><FaWarehouse /> Available: {p?.quantity - p?.sold}</p>
                                    <p><FaRocket /> Sold {p?.sold}</p>
                                </div>
                            </div>
                        </div>
                        <div className="d-flex">
                            <button className='btn btn-outline-primary col' style={{ borderRadius: "0px", borderBottomRightRadius: "5px" }} onClick={() => {
                                setCarts([...carts, p]);
                                toast.success('Added to cart')
                            }}>Add to Cart</button>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <h2 className='text-center fw-bold bg-light p-3 rounded'>Related Products</h2>
                    <hr />
                    {products?.length < 1 && 'Nothing Found   '}
                    {products?.length && products?.map((p) => (
                        <Productcard p={p} key={p._id} />
                    ))}
                </div>
            </div>
        </div>

    );
}

export default ProductView;