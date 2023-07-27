const express = require('express');
const app = express();
const port = 8080;

const productsRoutes = require('./routes/productsRoutes');
const cartsRoutes = require('./routes/cartsRoutes');

app.use(express.json());
app.use('/api/products', productsRoutes);
app.use('/api/carts', cartsRoutes);

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${port}`);
});
