const productModel = require("../models/productModel");

//Get products API - api/v1/product
exports.getProducts = async (req, res, next) => {

  const query = req.query.keyword?{
    name:{
      $regex:req.query.keyword,
      $options:"i"
    }
  }:{}
  const products = await productModel.find(query);
  res.json({
    success: true,
    products,
    message: "Get products working",
  });
};

//Get single product API - api/v1/product/id
exports.getSingleProduct = async (req, res, next) => {
  try {
    //const id = req.params.id;
    const product = await productModel.findById(req.params.id);
    res.json({
      success: true,
      product,
      message: "Get single products working",
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};
