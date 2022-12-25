import React from 'react';
import './jumbo.css'

function Jumbotron({title,subTitle = 'Welcome to e-commerce application'}) {
    return (
        <div className='container-fluid jumbotron' style={{height:'120px'}}>
            <div className="row mt-2 mb-2">
                <div className="col p-4 text-center">
                    <h3>{title}</h3>
                    <p className='lead'>{subTitle}</p>
                </div>
            </div>
        </div>
    );
}

export default Jumbotron;