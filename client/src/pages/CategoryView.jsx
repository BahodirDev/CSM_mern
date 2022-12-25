import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Jumbotron from '../components/jumbotron/Jumbotron';
import ProductCard from '../components/jumbotron/ProductCard';

function CategoryView(props) {
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState();
    // hookos
    const { slug } = useParams();

    useEffect(() => {
       if(slug) loadProducts();
    }, [slug])

    const loadProducts = async () => {
        try {
            let { data } = await axios.get(`/products-by-category/${slug}`);
            setProducts(data.products);
            setCategory(data.category);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <Jumbotron title={category?.name} subTitle={`${products?.length} products found in "${category?.name}"`} />
            <div className="containner-fluid">
                <div className="row mt-3 p-4">
                    {
                        products?.map((c,idx) => 
                        <div className='col-md-4' key={idx} > 
                            <ProductCard p={c} />
                        </div>)
                    }
                </div>
            </div>
        </>
    );
}

export default CategoryView;