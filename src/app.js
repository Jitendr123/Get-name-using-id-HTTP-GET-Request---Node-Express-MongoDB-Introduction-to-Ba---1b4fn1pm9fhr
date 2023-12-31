const fs = require('fs');
const express = require('express');
const app = express();

// Importing productNames from names.json file
const productNames = JSON.parse(
    fs.readFileSync(`${__dirname}/data/names.json`)
);
app.get('/api/v1/names/:id',async(req,res)=>{
    const productId=req.params.id;
    const product=await productNames.find(product=>product.id==productId)
    if(product){
        res.statusCode=200
        res.json({    
            status: "success", 
            message: "Product name fetched successfully",
            data: { 
                    id: product.id,
                    name:product.name
             } 
        })
    }else{
        res.statusCode=404
        res.json({ 
            status: "failed", 
            message: "Not found!" 
        })
    }
    res.end();
})

//Middlewares
app.use(express.json())

// GET endpoint for sending the products to client by id
//Endpoint - /api/v1/names/:id


module.exports = app;
