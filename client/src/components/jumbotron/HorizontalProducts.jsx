import React from 'react';
import { useAuth } from '../context/auth';
import { useCarts } from '../context/cart';
import moment from 'moment';
function HorizontalProducts({ p, remove }) {
    const [carts, setCarts] = useCarts();

    const getremove = (id) => {
        let arr = [...carts];
        let index = arr.findIndex(s => s._id === id);
        arr.splice(index, 1);
        setCarts(arr);
        localStorage.setItem('carts', JSON.stringify(arr))
    }

    return (
        <div className="card mt-2">
            <div className="row">
                <div className="col-md-4">
                    <img
                        src={`${process.env.REACT_APP_API}/product/photo/${p._id}`}
                        alt={p.name}
                        className="img img-fluid"
                        style={{
                            height: '150px',
                            width: "150px",
                            marginLeft: "-12px"
                        }}
                    />

                </div>
                <div className="col-md-8 ">
                    <div className="card-body">
                        <h4 className="card-title">
                            {p.name}
                        </h4>
                        <p className="card-text">
                            {p.description?.slice(0, 50)}..
                        </p>

                    </div>
                </div>
            </div>
            <div className='d-flex justify-content-between align-items-center bg-light px-1 py-1'>

                <small className='text-muted'>
                    listed {moment(p.createdAt).fromNow()}
                </small>
                {
                    remove &&
                    <button className='btn btn-outline-danger mb-2' onClick={() => getremove(p._id)}>remove</button>

                }
            </div>
        </div>
        //
    );
}

export default HorizontalProducts;