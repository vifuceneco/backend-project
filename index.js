const fs = require('fs');

class ProductManager {
  constructor(path) {
    this.products = [];
    this.id = 1;
    this.path = path;
    this.loadProducts();
  }

  loadProducts() {
    try {
      const data = fs.readFileSync(this.path, 'UTF-8');
      if (data) {
        this.products = JSON.parse(data);
        this.id = this.products.length + 1;
      }
    } catch (error) {
      console.log('Error cargando productos:', error.message);
    }
  }

  saveProducts() {
    try {
      fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2), 'UTF-8');
    } catch (error) {
      console.log('Error guardando productos:', error.message);
    }
  }

  addProduct(product) {
    if (!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock) {
      console.error('Todos los campos son obligatorios');
      return;
    }
  
    const existingProduct = this.products.find((p) => p.code === product.code);
  
    if (existingProduct) {
      console.error('Ya existe un producto con el mismo código');
      return;
    }
  
    product.id = this.id;
    this.id++;
    this.products.push(product);
    this.saveProducts();
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    const product = this.products.find((product) => product.id === id);
    if (product) {
      return product;
    } else {
      console.error('Not found');
    }
  }

  updateProduct(id, updatedFields) {
    const productIndex = this.products.findIndex((product) => product.id === id);
    if (productIndex !== -1) {
      const updatedProduct = { ...this.products[productIndex], ...updatedFields };
      this.products[productIndex] = updatedProduct;
      this.saveProducts();
    } else {
      console.error('Producto no encontrado');
    }
  }

  deleteProduct(id) {
    const productIndex = this.products.findIndex((product) => product.id === id);
    if (productIndex !== -1) {
      this.products.splice(productIndex, 1);
      this.saveProducts();
    } else {
      console.error('Producto no encontrado');
    }
  }
}

module.exports = ProductManager;

const manager = new ProductManager('products.json');

console.log('Primera instancia de los productos: ', manager.getProducts());

manager.addProduct({
  title: 'Producto prueba',
  description: 'Este es un producto prueba',
  price: '$200',
  thumbnail: 'Sin imagen',
  code: 'abc123',
  stock: 25,
});

console.log('Los productos son: ', manager.getProducts());

manager.addProduct({
  title: 'Segundo producto prueba',
  description: 'Este es el segundo producto prueba',
  price: '$500',
  thumbnail: 'Sin imagen',
  code: 'abc456',
  stock: 48,
});

console.log('Los productos parte 2 son: ', manager.getProducts());

try {
  const id = 1;
  const product = manager.getProductById(id);
  console.log(`El producto de id ${id} es: `, product);
} catch (error) {
  console.error(error.message);
}

try {
  const id = 1;
  manager.updateProduct(id, { price: '$500' });
  const updatedProduct = manager.getProductById(id);
  console.log('El producto actualizado es: ', updatedProduct);
} catch (error) {
  console.error(error.message);
}

try {
  const id = 1;
  manager.deleteProduct(id);
  console.log('El listado de productos actualizado es: ', manager.getProducts());
} catch (error) {
  console.error(error.message);
}

