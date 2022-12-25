import axios from 'axios';
import {useState,useEffect,createContext,useContext} from 'react';

const SearchProvider =createContext();


 function ContextSearch({children}){
  
    const [values,setValues] = useState({
        keyword:'',
        results:[]
    });


    return(
        <SearchProvider.Provider value={[values,setValues]}>
            {children}
        </SearchProvider.Provider>
    );
}

const useSearch= ()=> useContext(SearchProvider);

export {useSearch,ContextSearch} 