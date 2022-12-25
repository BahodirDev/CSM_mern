import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import Jumbotron from '../components/jumbotron/Jumbotron';
import ProductCard from '../components/jumbotron/ProductCard';
import { Checkbox, Radio } from 'antd';
import { prices } from '../prices';
import toast from 'react-hot-toast';

function Shop(props) {

    // states
    const [categories, setCategories] = useState([])
    const [products, setProducs] = useState([]);
    const [checked, setChecked] = useState([]); // categories
    const [radio, setRadio] = useState([]); // prices

    // effects

    useEffect(() => {
     if(!checked.length || !radio.length ) loadingProducts()
    }, []);


    useEffect(()=>{
        if(radio.length || checked.length) loadFiltered();
    },[radio,checked])

    useEffect(() => {
        loadingCategories()
    }, [])
   

    // functions
    const loadingCategories = async () => {
        let { data } = await axios.get('/categories');
        if (data.error) {

        } else {
            setCategories(data)
        }
    }
    const loadingProducts = async () => {
        let { data } = await axios.get('/products');
        if (data.error) {

        } else {
            setProducs(data)
        }
    }
    const loadFiltered= async()=>{
        try {
            let {data} = await axios.post('/filtered-products',{radio,checked});
            if(data){
                setProducs(data)
            }else{
                toast.error('Something went wrong')
            }
        } catch (error) {
            toast.error('Something went wrong. Try again')

            console.log(error);
        }
    }

    const handleCheck = (value, id) => {
        let all = [...checked];
        if (value) {
            all.push(id)
        } else {
            all = all.filter(s => s !== id)
        }
        setChecked(all)
    }

    return (
        <>
            <Jumbotron title={'Welocome to e-commerce appliaction'} />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3">
                        <h2 className='text-center bg-light p-3 mb-2 mt-2'>Filter By Category</h2>
                        <div className="row p-5 bg-light">
                            {
                                categories?.map((c,idx) => (
                                    <Checkbox onClick={(e) => handleCheck(e.target.checked, c._id)} style={{ marginLeft: '8px' }} className="h5" key={idx}>{c.name}</Checkbox>
                                ))
                            }
                        </div>
                        <h2 className='text-center bg-light p-3 mb-2 mt-2'>Filter By Price</h2>
                        <div className="row p-5 bg-light">
                            <Radio.Group  onChange={(e) => setRadio(e.target.value)}>
                                {
                                    prices?.map((c,idx) => (
                                        <div className="col h5" key={idx}>
                                            <Radio value={c.array} >
                                                {c.name}
                                            </Radio>
                                        </div>

                                    ))
                                }
                            </Radio.Group>
                        </div>
                        <div className="w-100 row p-4">
                           <button className='btn btn-outline-danger col' onClick={()=>window.location.reload()}>Reset</button>
                        </div>
                    </div>
                    <div className="col-md-9">
                        <h2 className='text-center bg-light p-3 mb-2 mt-2'>{products.length} Products</h2>
                        <div className="row" style={{height:'100vh',overflow:"scroll"}}>
                            {
                                products?.map((p,idx) => (
                                    <div className="col-md-4" key={idx}>
                                        <ProductCard p={p} />
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Shop;