import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {useSearch} from '../context/searchContext'

function Search(props) {

    const [values,setValues] = useSearch()


    const navigate = useNavigate();

    const handleSubmit = async(e)=>{
        e.preventDefault();
        try {
            let {data} = await axios.get(`/product/search/${values.keyword}`);
            setValues({...values,results:data});
            navigate('/search')
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <form onSubmit={handleSubmit} className='d-flex'>
                <input type="search" value={values.keyword} style={{borderRadius:"0px"}} onChange={(e)=>setValues({...values, keyword:e.target.value})} placeholder="Search" className='form-control' />
            <button className='btn btn-outline-primary' onClick={handleSubmit}  style={{borderRadius:"0px"}}>Search {values.results.length}</button>
            </form>
        </>
    );
}

export default Search;