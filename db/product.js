console.log('\nclass Products Started in product.js');

class Products {
  constructor() {
    this._count = 1;
    this._storage = [];
    this.add({
      product: "Apples",
      price: 0.99,
      inventory: 200,
    });
  }
  all() {
    return [...this._storage];
  }
  getItemById(id) {
    return this._storage.filter(product => id == product.id)[0];
  }
  add(product) {
    product.id = this._count;
    this._storage.push(product);
    this._count++;
    return product.id;
  }
  deleteProductById(id) {
    let removedProduct = null;
    this._storage.forEach((element, index) => {
      if (element.id === Number(id)) {
        removedProduct = this._storage.splice(index, 1);
      }
    });
    return removedProduct;
  }
}

module.exports = Products;

console.log('class Products Ended in product.js');
