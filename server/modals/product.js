import {Schema,model} from 'mongoose';
const {ObjectId}  = Schema.Types;
const productScheme = new Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        maxlength:60,
    },
    slug:{
        type:String,
        lowercase:true,
    },
    description:{
        type:{},
        required:true,
        maxlength:2000,
    },
    price:{
        type:Number,
        required:true,
        trim:true
    },
    category:{
        type:ObjectId,
        ref:"Category",
        required:true
    },
    quantity:{
        type:Number,
    },
    sold:{
        type:Number,
        default:0
    },
    photo:{
        data:Buffer,
        contentType:String
    },
    shipping:{
        required:false,
        type:Boolean
    }
},
{timestamps:true}
);

export default model('Product',productScheme)