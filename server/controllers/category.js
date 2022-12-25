import Category from '../modals/category.js';
import slugify from 'slugify';
import Products from '../modals/product.js';
// add category
export const addCategory = async (req, res) => {
    const { name } = req.body;

    if (!name.trim()) {
        return res.status(400).json({ error: "Name is required" })
    }
    try {
        let user = await Category.findOne({ name })
        if (user) {
            return res.status(400).json({ error: "Already exists" })
        }

        let category = await new Category({ name, slug: slugify(name) }).save();
        res.json(category)

    } catch (error) {
        return res.status(400).json(error.message)
    }

}

// find One
export const read = async (req, res) => {
    try {
        const { slug } = req.params;
        let category = await Category.findOne({ slug });
        if (category) {
            res.json(category)
        } else {
            return res.json({ error: "not found" })
        }
    } catch (error) {
        console.log(error);
        res.json(error.message)
    }

}

// update one
export const update = async (req, res) => {
    try {
        const { categoryId } = req.params;
        const { name } = req.body;
        let category = await Category.findByIdAndUpdate(categoryId, {
            name,
            slug: slugify(name)
        },
            { new: true }
        );
        res.json(category)
    } catch (error) {
        console.log(error);
        res.json(error.message)
    }

}


export const remove = async (req, res) => {
    try {
        const { categoryId } = req.params;
        let category = await Category.findByIdAndDelete(categoryId);
        res.send(category)
    } catch (error) {
        console.log(error);
        return res.json(error.message)
    }

}
export const list = async (req, res) => {
    try {
        let categories = await Category.find({});
        return res.json(categories)
    } catch (error) {
        console.log(error);
        return res.json(error.messsage)
    }
}

export const categoryProducts=async(req,res)=>{
    try {
        let {slug} = req.params;
        let category = await Category.findOne({slug});
        let products = await Products.find({category}).populate('category').select('-photo');

        res.json({
            category,
            products
        })
    } catch (error) {
        console.log(error);
    }
}