class ProductManager {
  constructor() {
    this.products = [];
    this.id = 1;
  };

  addProduct(title, description, price, thumbnail, code, stock) {
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      console.error('Todos los campos son obligatorios');
      return;
    }

    const existingProduct = this.products.find((product) => product.code === code);

    if (existingProduct) {
      console.error('Ya existe un producto con el mismo código');
      return
    };

    const newProduct = {
      id: this.id,
      title,
      description,
      price,
      thumbnail,
      code,
      stock
    };

    this.id++;
    this.products.push(newProduct);
  };

  getProducts() {
   return this.products;
  };

  getProductById(id) {
    const product = this.products.find((product) => product.id === id);
    if (product) {
      return product;
    } else {
      console.error('Not found');
    }
  };
}

const manager = new ProductManager();

manager.addProduct(
  'Producto 0',
  'Descripción',
  '$1500',
  'imagen.jpg',
  'P000',
  200,
);

manager.addProduct(
  'Producto 1',
  'Descripción',
  '$2700',
  'imagen.jpg',
  'P001',
  48,
);

console.log(manager.getProducts());
console.log(manager.getProductById(1));
