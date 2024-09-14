const express = require("express");
const {
  getProducts,
  getSingleProduct,
} = require("../controllers/ProductController");

const router = express.Router();

router.route("/product").get(getProducts);

router.route("/product/:id").get(getSingleProduct);

module.exports = router;