const express = require('express');
const ProductManager = require('./ProductManager');

const app = express();
const port = 8080;

const productManager = new ProductManager('./products.json');

app.get('/products', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit);
    await productManager.loadProducts();
    const products = productManager.products;

    if (!isNaN(limit) && limit >= 1) {
      res.json(products.slice(0, limit));
    } else {
      res.json(products);
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/products/:pid', async (req, res) => {
  try {
    const productId = parseInt(req.params.pid);
    await productManager.loadProducts();
    const product = productManager.products.find((p) => p.id === productId);

    if (!product) {
      res.status(404).json({ error: 'Product not found' });
    } else {
      res.json(product);
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
