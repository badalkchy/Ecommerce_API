const express = require('express')
const mongoose = require('mongoose')
const Product = require('./models/productModels')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

//routes

app.get('/', (req,res) => {
    res.send('Welcome Node API')
})
   
   //get all products
app.get('/products',async(req,res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);

    }catch (error) {
        res.status(500).json({message: error.message})
    }
})

   //get product by id
app.get('/products/:id',async(req,res) => {
    try {
        const id = req.params.id;
        const products = await Product.findById(id);
        res.status(200).json(products);

    }catch (error) {
        res.status(500).json({message: error.message})
    }
})


 //update product
app.put('/products/:id', async(req,res) => {
    try{
        const{id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);

        if(!product){
            return res.status(404).json({message: `canot find product with Id ${id}`})
        }
        const updateProduct = await Product.findById(id);
        res.status(500).json(updateProduct); 
    }catch (error) {
        res.status(500).json({message: error.message})
    }
})

    // delete a product
app.delete('/products/:id', async(req,res) => {
    try{
        const {id} =req.params;
        const product = await Product.findByIdAndDelete(id);
        if(!product){
            return res.status(404).json({message: `cannot find any product with ID ${id}`})
        }
        res.status(200).json(product);

    }catch (error) {
        res.status(500).json({message: error.message}) 
    }
})    


    //add a product
app.post('/products', async(req, res) => {
    try{
        const product = await Product.create(req.body)
        res.status(200).json(product);
    }catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})


  //database connection
mongoose.
connect('mongodb+srv://yoyobadal111111:5chaudhary@cluste3.rcaphl6.mongodb.net/?retryWrites=true&w=majority')
.then(() => {
    console.log('connected to mongoDB   ')
    app.listen(3000, ()=> {
    console.log("Running on port 3000")
    });
}).catch((error) => {
    console.log(error)
})