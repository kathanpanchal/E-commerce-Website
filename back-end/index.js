const express = require('express')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const multer = require('multer')
const path = require('path')
const cors = require('cors')
const { log } = require('console')

const port = 4000;
const app = express();
app.use(express.json());
app.use(cors());
//Database connection with MongoDB
mongoose.connect('mongodb+srv://kathan:kathan1402@cluster0.fsdvsmn.mongodb.net/e-commerce')

//API creation 
app.get('/',(req,res)=>{
    res.send('express is runnig')
})
//image Storage
const storage = multer.diskStorage({
    destination:'./upload/images',
    filename:(req,file,cd)=>{
        return cd(null,`${file.filename}_${Date.now()}${path.extname(file.originalname)}`)
    }
})
const upload = multer({storage:storage})
//create Upload End Piont
app.use('/images',express.static('upload/images'));
app.post("/upload",upload.single('product'),(req,res)=>{
    res.json({
        success:1,
        image_url:`http://localhost:${port}/images/${req.file.filename}`
    });
});

//Schema
const Product = mongoose.model('Product',{
    id:{
        type:Number,
        required: true,
    },
    name:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
    category:{
        type : String,
        required:true,
    },
    new_price:{
        type:Number,
        required:true,
    },
    old_price:{
        type:Number,
        requied:true,
    },
    date:{
        type:Date,
        default:Date.now(),
    },
    available:{
        type:Boolean,
        default:true,
    }
})

app.post("/addproduct",async(req,res)=>{
    let products = await Product.find({});
    let id
    if (products.length > 0){
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0]
        id = last_product.id + 1;

    }else{
        id = 1;
    }
    const product = new Product({
        id:id,
        name:req.body.name,
        image:req.body.image,
        new_price:req.body.new_price,
        category:req.body.category,
        old_price:req.body.old_price,
    })
    console.log(product);
    await product.save();
    console.log('SAVE');
    res.json({
        success: true,
        name:req.body.name,
    })
});

///Creating API for deleting product
app.post("/removeproduct",async (req,res)=>{
    await Product.findOneAndDelete({id:req.body.id})
    console.log("removed");
    res.json({
        success:true,
        name:req.body.name
    })
})

app.get("/allproduct",async(req,res)=>{
    let products = await Product.find({});
    console.log("ALL PRODUCTS FETCHED");
    res.send(products)
})

// Create Schema for User
 const Users = mongoose.model('Users',{
    name:{type:String},
    email:{type:String,unique:true} ,
    password:{type:String},
    cartData:{type:Object},
    date:{type:Date,default:Date.now},
 })
//END POINT FOR REGSITERING USER
app.post("/signup",async(req,res)=>{
    let check = await Users.findOne({email:req.body.email});
    if (check){
        res.status(400).json({success:false,error:"this email is already used"});
    }
    let cart = {};
    for (let i = 0; i < 300; i++) {
        cart[i]=0;
    }
    const user = new Users({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
        cartData:cart,
    })
    await user.save()
    const data = {
        user:{
            id:user.id
        }
    }
    const token = jwt.sign(data,"secret_ecom")
    res.json({success:true,token})
    
})
//End point for user login
app.post('/login',async(req,res)=>{
    let user = await Users.findOne({email:req.body.email});
    if (user){
        const checkPass = req.body.password === user.password;
        if (checkPass){
            const data = {
                user:{
                    id:user.id
                }
            }
            const token = jwt.sign(data,"secret_ecom")
            res.json({success:true,token})
        }else{
            res.json({success:false,error:"worng password"});
        }

    }else{
        res.json({success:false,error:"worng email"})
    }
})
//creating middleware to fetch user
const fetchUser = async(req,res,next)=>{
    const token = req.header('auth-token')
    if(!token){
        console.log("ERROR");
        res.status(401).send({error:"pls authenticate"})
    }else{
        try {

            const data =jwt.verify(token,'secret_ecom');
            req.user = data.user;
            next();

        } catch (error) {
            res.status(401).send({error:"pls auth"})
        }
    }
}
//End point for cartData
app.post('/addtocart', fetchUser,async (req,res)=>{
    console.log(req.body,req.user);
    let userData = await Users.findOne({_id:req.user.id});
    userData.cartData[req.body.itemId]+=1
    await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
    res.send("ADDED")
})
app.post('/removefromcart', fetchUser,async (req,res)=>{
    console.log(req.body,req.user);
    let userData = await Users.findOne({_id:req.user.id});
    if (userData.cartData[req.body.itemId]>0){userData.cartData[req.body.itemId]-=1
    await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
    res.send("REMOVED")}
    
})
// CAREATING AN ENDDPOINT TO GET CART DATA
app.post('/getcart',fetchUser,async(req,res)=>{
        let userData = await Users.findOne({_id:req.user.id})
        res.json(userData.cartData)
})
app.listen(port,(err)=>{
    if (!err){
        console.log(`server running on port ${port}`);
    }else{
        console.log(`Error: ${err}`);
    }
})
