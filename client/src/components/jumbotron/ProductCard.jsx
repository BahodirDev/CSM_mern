import React from 'react';
import moment from 'moment';
import { Badge } from 'antd'
import { useNavigate } from 'react-router-dom';
import {useCarts} from '../context/cart';
import toast from 'react-hot-toast'

function ProductCard({ p }) {
    // state
    const [carts,setCarts] =useCarts();
    
    // hooks
    const navigate = useNavigate();

    return (
        <div className='card mb-3 hoverable'>
            <Badge.Ribbon text={`${p.sold} sold`} color="red">
                <Badge.Ribbon text={`${p.quantity >= 1 ? `${p.quantity - p.sold}  in stock` : 'out of stock'} `} color="green" placement='start' >
                    <img src={`${process.env.REACT_APP_API}/product/photo/${p._id}`} alt={p.name} className="img img-fluid" style={{ height: "300px", objectFit: 'cover' }} />
                </Badge.Ribbon>
            </Badge.Ribbon>
            <div className="card-body" style={{ padding: "10px" }}>
                <div className="card-body">
                    <p className='fw-bolder'>{p.name}</p>
                    <h4 className='fw-bold'>
                        {
                            p?.price.toLocaleString("en-US",{
                                style:"currency",
                                currency:"USD"
                            })
                        }
                    </h4>
                </div>
                <p className='card-text fw-lighter'  >{p.description.slice(0, 20)}</p>
                <p className=''>{moment(p.createdAt).fromNow()}</p>
                <p className=''>{p.sold} sold</p>
            </div>
            <div className="d-flex">
                <button className='btn btn-primary col' style={{ borderRadius: "0px", borderBottomLeftRadius: "5px" }} onClick={()=>navigate(`/product/${p.slug}`)}>View Product</button>
                <button className='btn btn-outline-primary col' style={{ borderRadius: "0px", borderBottomRightRadius: "5px" }}
                onClick={()=>{
                    setCarts([...carts,p]);
                    localStorage.setItem('carts',JSON.stringify([...carts,p]))
                    toast.success('Added to cart')
                }}
                >Add to Cart</button>
            </div>
        </div>
    );
}

export default ProductCard;