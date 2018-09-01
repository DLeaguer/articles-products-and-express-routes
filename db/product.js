console.log('class Products Started in product.js');
class Products {
  constructor() {
    this._count = 1;
    this._storage = [];
    this.add({
      product: "Apples",
      price: 0.99,
      inventory: 200,
      // id: 1
    });
  }
  all() {
    console.log('class Products all()...this._storage =', this._storage);
    return [...this._storage];
  }
  getItemById(id) {
    console.log('getItemById =', id);
    return this._storage.filter(product => id == product.id)[0];
  }
  add(product) {
    console.log('add product =', product);
    product.id = this._count;
    this._storage.push(product);
    this._count++;
    return product.id;
  }
  updateItemById(id) {}
  deleteItemById(id) {}
}

module.exports = Products;

console.log('class Products Ended in product.js after module.exports')
