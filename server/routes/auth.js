import {Router} from 'express';
import { login, register, updateProfile,openOrders, AllOrders, changeStatus} from '../controllers/auth.js';
import { isAdmin, mustSignIn,  } from '../middlewares/auth.js';
const route = Router();

route.post('/register',register);
route.post('/login',login);
route.get("/auth-check",mustSignIn,(req,res)=>{
    res.json({ok:true})
});
route.get("/admin-check",mustSignIn,isAdmin,(req,res)=>{
    res.json({ok:true})
});

route.put('/profile',mustSignIn,updateProfile);

// orders
route.get('/list-orders',mustSignIn,openOrders);
route.get('/admin-orders',mustSignIn,isAdmin,AllOrders);
route.put('/orders-status/:id',mustSignIn,isAdmin,changeStatus);
export default route;