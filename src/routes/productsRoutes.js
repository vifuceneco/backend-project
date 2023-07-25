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

const saveProducts = (products) => {
  fs.writeFileSync('data/products.json', JSON.stringify(products, null, 2), 'utf-8');
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

router.post('/', (req, res) => {
  const product = req.body;
  if (!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  const products = loadProducts();
  const existingProduct = products.find((p) => p.code === product.code);
  if (existingProduct) {
    return res.status(400).json({ error: 'Ya existe un producto con el mismo código' });;
  }

  const newProductId = products[products.length - 1].id + 1;
  const newProduct = {
    id: newProductId,
    ...req.body,
  }

  products.push(newProduct);
  saveProducts(products);
  res.json(newProduct);
});

module.exports = router;