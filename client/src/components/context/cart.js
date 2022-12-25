import axios from 'axios';
import {useState,useEffect,createContext,useContext} from 'react';

const CartdProvider =createContext();


 function ContextCart({children}){
  
    const [carts,setCarts] = useState([]);

    useEffect(()=>{
        let data = localStorage.getItem('carts');
        if(data) setCarts(JSON.parse(data))
    },[])

    return(
        <CartdProvider.Provider value={[carts,setCarts]}>
            {children}
        </CartdProvider.Provider>
    );
}

const useCarts= ()=> useContext(CartdProvider);

export {useCarts,ContextCart} 