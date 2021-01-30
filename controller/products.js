const Product = require("../models/Product.model");
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

exports.getProducts = async (req, res, next) => {
  try {
    const gotProducts = await productModel.find({});
    res.status(201).json(gotProducts);
  } catch (error) {
    next(error);
  }
};

exports.getProductsById = async (req, res, next) => {
  try {
    console.log(req.params.productId);
    const gotProductsById = await productModel.findById(req.params.productId);
    if (gotProductsById) {
      res.status(201).json(gotProductsById);
    } else {
      res.status(404).send();
    }
  } catch (error) {
    next(error);
  }
};

exports.getProductsByIdAndUpdate = async (req, res, next) => {
  try {
    let updatedProduct = await Product.findByIdAndUpdate(
      req.params.productId,
      req.body,
      {
        new: true,
      }
    );
    if (updatedProduct) {
      res.status(200).json({ updatedProduct });
    } else {
      res.status(404);
    }
  } catch (error) {
    next(error);
  }
};
