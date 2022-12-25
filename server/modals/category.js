import {Schema,model} from 'mongoose';
const Category = new Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        maxLength:30
    },
    slug:{
        type:String,
        required:true,
        unique:true,
        lowercase:true
    }
},{timestamps:true});

export default model('Category',Category);
