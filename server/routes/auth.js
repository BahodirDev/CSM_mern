const { Router } = require('express');
const { login, register, updateProfile, openOrders, AllOrders, changeStatus } = require('../controllers/auth.js');
const { isAdmin, mustSignIn, } = require('../middlewares/auth.js');
const route = Router();

route.post('/register', register);
route.post('/login', login);
route.get("/auth-check", mustSignIn, (req, res) => {
    res.json({ ok: true })
});
route.get("/admin-check", mustSignIn, isAdmin, (req, res) => {
    res.json({ ok: true })
});

route.put('/profile', mustSignIn, updateProfile);

// orders
route.get('/list-orders', mustSignIn, openOrders);
route.get('/admin-orders', mustSignIn, isAdmin, AllOrders);
route.put('/orders-status/:id', mustSignIn, isAdmin, changeStatus);
module.exports=  route;