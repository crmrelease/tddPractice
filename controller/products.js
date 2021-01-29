const productModel = require("../models/Product.model");

exports.createProduct = async (req, res, next) => {
  try {
    const createdProduct = await productModel.create(req.body);
    res.status(201).json(createdProduct);
    console.log("createdProduct", createdProduct);
  } catch (error) {
    next(error);
  }
};
