const User = require('../modals/auth.js');
const Order = require('../modals/order.js');
const { comparePassword, hashPassword } = require('../helpers/auth.js');
const jwt = require('jsonwebtoken');
const sgMail = require('@sendgrid/mail');
const config = require('dotenv');
config.config();

sgMail.setApiKey(process.env.SEND_GRID_API);

 const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;


        if (!name.trim()) {
            return res.json({ error: "Name is required" })
        }

        if (!email) {
            return res.json({ error: "Email is required" })
        }

        if (!password || password.length < 6) {
            return res.json({ error: "Password must be at least  6 charecters long " })
        }

        const userEmail = await User.findOne({ email });

        if (userEmail) {
            return res.json({ error: "Email is taken" })
        }

        const hashed = await hashPassword(password);

        let user = await new User({ name, email, password: hashed }).save();

        let token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });


        res.json({
            user: {
                name: user.name,
                email: user.email,
                role: user.role,
                address: user.address,
                password: user.password,
            },
            token
        })

    } catch (error) {
        console.log(error);
    }
}
 const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email) {
            return res.json({ error: "Email is required" })
        }

        if (!password || password.length < 6) {
            return res.json({ error: "Password must be at least  6 charecters long " })
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.json({ error: "User not Found" })
        }

        const hashed = await comparePassword(password, user.password);

        if (!hashed) {
            return res.json({ error: "Email or Password wrong" })
        }

        let token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });


        res.json({
            user: {
                name: user.name,
                email: user.email,
                address: user.address,
                role: user.role,
            },
            token
        })

    } catch (error) {
        console.log(error);
    }
}

 const updateProfile = async (req, res) => {
    try {
        let user = await User.findById(req.user._id);

        const { name, password, address, email } = req.body;
        if (password && password.length < 6) {
            res.json({ error: "password is required and at least 6 characters long" })
        }

        const hashed = password ? await hashPassword(password) : undefined;


        let update = await User.findByIdAndUpdate(req.user._id, {
            name: name || user.name,
            password: hashed || user.password,
            email: email || user.email,
            address: address || user.address
        },
            { new: true }
        );
        update.password = undefined;
        console.log(update);
        res.json(update);


    } catch (error) {
        console.log(error);
    }
}

 const openOrders = async (req, res) => {
    try {
        let data = await Order.find({ buyer: req.user._id }).populate('products', '-photo').populate('buyer', 'name');
        res.json(data);
    } catch (error) {
        console.log(error);
    }
}
 const AllOrders = async (req, res) => {
    try {
        let data = await Order.find({}).populate('products', '-photo').populate('buyer', 'name').sort({ createdAt: -1 });
        res.json(data);
    } catch (error) {
        console.log(error);
    }
}

 const changeStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        let data = await Order.findByIdAndUpdate(id, { status }, { new: true }).populate('buyer', 'name email');

        // email prepare
        console.log(data, 'user');
        let Edata = {
            from: process.env.EMAIL,
            to: data?.buyer?.email,
            subject: "Order Status",
            html: `
      
            <h1>Hi, ${data?.buyer?.name}. Your order status is: <span style="color:gold;"></span></h1>
            I hope, you realised that the website is not real, just created to be nice porfolio :)
            Thanks for testing !!!
            

            If you want visit again: <a href="${process.env.CLIENT_URL}"> CLICK HERE</a>
            `
        }

        try {
            let data1 = await sgMail.send(Edata);
            console.log('email ', data1);
        } catch (error) {
            console.log(error);
        }

        res.json(data)
    } catch (error) {
        console.log(error);
    }
}

module.exports = {changeStatus,AllOrders,openOrders,updateProfile,login,register}