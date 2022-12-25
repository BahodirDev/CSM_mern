const { Router } = require('express');
const { mustSignIn } = require('../middlewares/auth.js');
const Auth = require('./auth.js')
const Category = require('./category.js')
const Product = require('./products.js');
const route = Router();

route.use('/api', Auth);
route.use('/api', Category);
route.use('/api', Product);

module.exports = route;