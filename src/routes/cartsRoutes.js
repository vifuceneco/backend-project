const express = require('express');
const router = express.Router();
const fs = require('fs');

let carts = [];

const loadCarts = () => {
  carts = fs.readFileSync('data/carts.json', 'UTF-8');
  return JSON.parse(carts);
}

const saveCart = (cart) => {
  fs.writeFileSync('data/carts.json', JSON.stringify(cart, null, 2), 'UTF-8');
};

const getCartById = (id) => {
  const carts = loadCarts();
  const cartById = carts.find((cart) => cart.id === id);
  return cartById;
}

router.post('/', (req, res) => {
  const carts = loadCarts();
  const newCartId = carts[carts.length - 1].id + 1;
  const newCart = {
    id: newCartId,
    ...req.body,
  }

  carts.push(newCart);
  saveCart(carts);
  res.status(201).json(newCart);
});

router.get('/:cid', (req, res) => {
  const cartId = parseInt(req.params.cid);
  const cartById = getCartById(cartId);
  res.status(201).json(cartById.products);
});

router.post('/:cid/product/:pid', (req, res) => {
  const cartId = req.params.cid;
  const productId = req.params.pid
  const quantity = req.body.quantity || 1;

  const carts = loadCarts();
  const cartById = carts.find((cart) => cart.id.toString() === cartId);

  if (!cartById) {
    return res.status(404).json({ error: 'Carrito no encontrado' });
  }

  const productToAdd = {
    id: productId,
    quantity: parseInt(quantity),
  };

  const existingProduct = cartById.products.findIndex((p) => p.id === productId);
  if (existingProduct !== -1) {
    cartById.products[existingProduct].quantity += productToAdd.quantity;
  } else {
    cartById.products.push(productToAdd);
  }

  saveCart(carts);
  res.status(201).json(cartById.products);
});

module.exports = router;