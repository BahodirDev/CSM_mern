import {Router} from 'express' ;
import { isAdmin, mustSignIn } from '../middlewares/auth.js';
import {addCategory,read,update,remove,list,categoryProducts} from '../controllers/category.js'
const route = Router();

route.post('/category',mustSignIn,isAdmin,addCategory);
route.get('/category/:slug',mustSignIn,read);
route.put('/category/:categoryId',mustSignIn,isAdmin,update);
route.delete('/category/:categoryId',mustSignIn,isAdmin,remove);
route.get('/categories',list);
route.get('/products-by-category/:slug', categoryProducts);


export default route;