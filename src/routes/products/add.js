import asyncHandler from "express-async-handler";
import Product from "../../database/models/Product.js";
const addProduct = asyncHandler(async (req, res) => {
  console.log(req.user)
  res.status(400);
    const { name, description, price,purchasePrice, quantity, code, type } = req.body;
    if(!name || !description || !price || !purchasePrice || !quantity || !code || !type){
      throw new Error("All fields are required");
    }
    const product = await Product.create({user:req.user.id, name, description, price, purchasePrice, quantity, code, type });
    res.status(201).json(product);
});
export default addProduct;