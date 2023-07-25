const express = require('express');
const router = express.Router();
const fs = require('fs');

let products = [];

const loadProducts = () => {
  products = fs.readFileSync('data/products.json', 'UTF-8');
  return JSON.parse(products);
}

const getProductById = (id) => {
  const products = loadProducts();
  const productById = products.find((product) => product.id === id);
  return productById;
}

const addProduct = (product) => {
  if (!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock) {
    console.error('Todos los campos son obligatorios');
    return;
  }
  const existingProduct = products.find((p) => p.code === product.code);
  if (existingProduct) {
    console.error('Ya existe un producto con el mismo código');
    return;
  }
  const newProductId = products[products.length - 1].id + 1;
  product.id = newProductId;
  products.push(product);
};

router.get('/', (req, res) => {
  const products = loadProducts();
  const limit = req.query.limit;

  const limitedProducts = limit ? products.slice(0, limit) : products;
  res.json(limitedProducts);
});

router.get('/:pid', (req, res) => {
  const productId = parseInt(req.params.pid);
  const productById = getProductById(productId);
  res.json(productById);
});

module.exports = router;