import React, { useEffect, useState } from 'react';
import axios from 'axios'

function useCategory(props) {
    const [categories,setCategories] = useState([]);

    useEffect(()=>{
        loadCatrgory();
    },[])

    const loadCatrgory =async()=>{
        try {
            let {data} =await axios.get('/categories');
            setCategories(data)
        } catch (error) {
            console.log(error);
        }
    }

    return categories;
}

export default useCategory;