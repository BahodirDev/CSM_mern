import {Router} from 'express';
import { mustSignIn } from '../middlewares/auth.js';
import  Auth from  './auth.js'
import  Category from  './category.js'
import  Product from  './products.js';
const route = Router();

route.use('/api',Auth);
route.use('/api',Category);
route.use('/api',Product);

export default route;