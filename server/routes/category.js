const { Router } = require('express');
const { isAdmin, mustSignIn } = require('../middlewares/auth');
const { addCategory, read, update, remove, list, categoryProducts } = require('../controllers/category.js')
const route = Router();

route.post('/category', mustSignIn, isAdmin, addCategory);
route.get('/category/:slug', mustSignIn, read);
route.put('/category/:categoryId', mustSignIn, isAdmin, update);
route.delete('/category/:categoryId', mustSignIn, isAdmin, remove);
route.get('/categories', list);
route.get('/products-by-category/:slug', categoryProducts);


module.exports = route;