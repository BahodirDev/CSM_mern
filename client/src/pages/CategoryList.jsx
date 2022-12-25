import React from 'react';
import { Link } from 'react-router-dom';
import useCategory from '../components/hooks/useCategory';
import Jumbotron from '../components/jumbotron/Jumbotron';

function CategoryList(props) {

    const categories = useCategory();

    return (
        <>
            <Jumbotron title={'Categories'} />
            <div className="container overflow-hidden">
                <div className="row gx-5 gy-5 mt-3 mb-5">
                    {categories?.map((c)=>(
                        <div className="col-md-6" key={c._id}>
                            <button className='btn btn-outline-warning col-12 text-dark p-3'>
                                <Link to={`/category/${c.slug}`}>
                                    {c.name}
                                </Link>
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default CategoryList;