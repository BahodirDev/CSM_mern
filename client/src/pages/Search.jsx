import React from 'react';
import { useSearch } from '../components/context/searchContext';
import Jumbotron from '../components/jumbotron/Jumbotron';
import ProductCard from '../components/jumbotron/ProductCard';

function Search(props) {
    const [values,setValues] = useSearch();
    return (
        <>
        <Jumbotron title={'Search results'} subTitle={!values?.results?.length ? 'nothing found' : `Found ${values?.results?.length}` } />
            <div className="container mt-5">
                <div className="row">
                    {values?.results?.map((p)=>(
                        <div className="col-md-4" key={p._id}>
                            <ProductCard p={p} />
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default Search;