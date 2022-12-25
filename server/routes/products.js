const { Router } = require('express')
const {
    addProduct,
    getToken,
    processToken,
    getListProduct, getOne, getProductPhoto, deleteProduct, updateProduct, filteredProducts, totalCount, listPage, searchProducts, relatedProducts } = require('../controllers/products.js')

const formidable = require('express-formidable')
const { mustSignIn } = require('../middlewares/auth.js')
const route = Router();

route.post("/product", formidable(), addProduct);
// get all products
route.get("/products", getListProduct);
// getOne
route.get("/product/:slug", getOne)
// photo route
route.get("/product/photo/:productId", getProductPhoto);
// delete route
route.delete('/product/:productId', deleteProduct)
// update route
route.put('/product/:productId', formidable(), updateProduct);
// filter products
route.post('/filtered-products', filteredProducts);
// total count
route.get('/total-count', totalCount);
// laod more
route.get('/list-page/:page', listPage);
// search
route.get('/product/search/:keyword', searchProducts);
// related-products
route.get('/related-products/:productId/:categoryId', relatedProducts);
// category products

route.get('/braintree/token', getToken);
route.post('/braintree/payment', mustSignIn, processToken);

module.exports = route;