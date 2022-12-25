import React from 'react';
import { Link } from 'react-router-dom';

function PageNotFound(props) {
    return (
        <>
            <div className='d-flex justify-content-center align-items-center vh-100'>
                Page Not Found || 404
            </div>
            <button className='btn btn-outline-success'>
                <Link to={'/'}>
                    Back to Home
                </Link>
            </button>
        </>
    );
}

export default PageNotFound;