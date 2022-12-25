import Product from "../modals/product.js";
import slugify from 'slugify';
import Order from '../modals/order.js'
import fs from 'fs';
import brainTree from "braintree";
import dotEnv from 'dotenv';
dotEnv.config();



const getAway = new brainTree.BraintreeGateway({
    environment: brainTree.Environment.Sandbox,
    merchantId:process.env.ENV_MERCHAT_ID,
    publicKey:process.env.ENV_PUBLIC_ID,
    privateKey:process.env.ENV_PRIVATE_ID,
});



export const addProduct = async (req, res) => {
    try {
        const { photo } = req.files;
        const { name, description, price, shipping, quantity, category } = req.fields;


        switch (true) {
            case !name.trim():
                return res.json({ error: "Name is required" })
            case !description.trim():
                return res.json({ error: "description is required" })
            case !price.trim():
                return res.json({ error: "price is required" })
            case !shipping.trim():
                return res.json({ error: "shipping is required" })
            case !quantity.trim():
                return res.json({ error: "quantity is required" })
            case !category.trim():
                return res.json({ error: "category is required" })
            case !photo && photo.size > 1000000:
                return res.json({ error: "photo size must be less than 1 mb" })
            default:
                break;
        }

        let product = await new Product({ ...req.fields, slug: slugify(name) });

        if (photo) {
            product.photo.data = fs.readFileSync(photo.path);
            product.photo.contentType = photo.type;
        }
        await product.save();
        res.json(product)


    } catch (error) {
        console.log(error);
        return res.json(error.message)
    }
}

export const getListProduct = async (req, res) => {
    try {
        let data = await Product.find({}).select('-photo').limit(12).sort({ createdAt: -1 }).populate('category');
        return res.json(data)
    } catch (error) {
        return res.json({error})
    }   

}

export const getOne  = async(req,res)=>{
    try{
        let product = await Product.findOne({slug:req.params.slug}).select('-photo').populate('category');
        return res.json(product)
    }catch(err){
        console.log(err);
    }
}

export const getProductPhoto =  async(req,res)=>{
    try {
        let product = await Product.findById(req.params.productId).select('photo');
        if(product.photo.data){
            res.set("Content-Type",product.photo.contentType);
            return res.send(product.photo.data)
        }
    } catch (error) {
        console.log(error);
    }
}

export const deleteProduct = async(req,res)=>{
    try {
        let product = await Product.findByIdAndDelete(req.params.productId).select('-photo');
        res.json(product)
    } catch (error) {
        console.log(error);
    }
}

export const updateProduct = async (req, res) => {
    try {
        const { photo } = req.files;
        const { name, description, price, shipping, quantity, category } = req.fields;


        switch (true) {
            case !name.trim():
                return res.json({ error: "Name is required" })
            case !description.trim():
                return res.json({ error: "description is required" })
            case !price.trim():
                return res.json({ error: "price is required" })
            case !shipping.trim():
                return res.json({ error: "shipping is required" })
            case !quantity.trim():
                return res.json({ error: "quantity is required" })
            case !category.trim():
                return res.json({ error: "category is required" })
            case !photo || photo.size > 1000000:
                return res.json({ error: "photo size must be less than 1 mb" })
            default:
                break;
        }

        let product = await  Product.findByIdAndUpdate(req.params.productId,{
            ...req.fields,
            slug:slugify(name)
        },{new:true});

        if (photo) {
            product.photo.data = fs.readFileSync(photo.path);
            product.photo.contentType = photo.type;
        }
        await product.save();
        res.json(product)


    } catch (error) {
        console.log(error);
        return res.json(error.message)
    }
}

export const filteredProducts  = async(req,res) =>{
    try {
        const {radio,checked} = req.body;
        let args = {};
        if(checked.length > 0) args.category = checked;
        if(radio.length) args.price = {$gte:radio[0],$lte:radio[1]};

        let data = await Product.find(args).select('-photo');
        console.log(data);

        res.json(data)
    } catch (error) {
        console.log(error);
    }
}

export const totalCount = async(req,res)=>{
    try {
        let data =await Product.find({}).estimatedDocumentCount();
        res.json(data);
    } catch (error) {
        console.log(error);
    }
}

export const listPage =async(req,res)=>{
    try {
        let perPage = 6;
        let page = req.params.page ? req.params.page : 1;
        let data = await Product.find({}).select("-photo").skip((page - 1 ) * perPage).limit(perPage).sort({createdAt:-1});
        res.json(data)
    } catch (error) {
        console.log(error);
    }
}

export const searchProducts =async(req,res)=>{
    try {
        const {keyword} =req.params;
        const data = await Product.find({
            $or:[
                {name:{$regex:keyword,$options:'i'}},
                {description:{$regex:keyword,$options:'i'}},
            ]
        }).select('-photo');
        res.json(data)

    } catch (error) {
        console.log(error);
    }
}

export const relatedProducts  = async(req,res)=>{
    try {
        let {categoryId,productId} = req.params;
        const data = await Product.find({category:categoryId,_id:{$ne:productId}}).populate('category').select('-photo').limit(3);
        res.json(data)
    } catch (error) {
        console.log(error);
    }
}

export const getToken = async(req,res)=>{
    try {
        getAway.clientToken.generate({},function(err,response){
            if(err){
                res.status(500).send(err)
            }else{
                res.send(response)
            }
        })
    } catch (error) {
        console.log(error);
    }
}

export const processToken =async (req,res)=>{
    try {
        let {nonce,carts} = req.body;

        let total =0;

        carts.map((s)=>{
          return  total += s.price;
        });

        let newTransaction = getAway.transaction.sale({
            amount:total,
            paymentMethodNonce:nonce,
            options:{
                submitForSettlement:true
            }
        }, async function(err,result){
            if(result){

                let product =  new Order({
                    products:carts,
                    payment:result,
                    buyer:req.user._id,
                }).save();
                // Descrement

                decrementQuantity(carts)

                res.json({ok:true})

                // res.send(result)
            }else{
                res.status(500).send(err)
            }
        })
    } catch (error) {
        console.log(error);
    }
}

const decrementQuantity =async(cart)=>{
    let bulks = cart.map((c)=>{
        return{
            updateOne:{
                filter:{_id:c._id},
                update:{$inc:{quantity:c.quantity < 0 ? -0 : +0,sold:+1}}
            }
        }
    });

    let data = await Product.bulkWrite(bulks, {});
    console.log('data =>', data );
}