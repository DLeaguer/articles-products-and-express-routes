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
    // console.log('class Products all()...this._storage =', this._storage);
    return [...this._storage];
  }
  getItemById(id) {
    console.log('getItemById =', id);
    return this._storage.filter(product => id == product.id)[0];
  }
  add(product) {
    // console.log('\nadd product =\n', product, '\n');
    product.id = this._count;
    this._storage.push(product);
    this._count++;
    return product.id;
  }
  // editPById(id) {
  //   // let productToEdit = Products_Inv.getItemById(id);
  //   let productToEdit = null;
  //   if (req.body.product !== productToEdit.product) {
  //     productToEdit.product = req.body.product;
  //   }
  //   if (req.body.price !== productToEdit.price) {
  //     productToEdit.price = req.body.price;
  //   }
  //   if ( req.body.inventory !== productToEdit.inventory) {
  //     productToEdit.inventory = req.body.inventory;
  //   }
  //   res.redirect(`/products/${id}`);
  // }

  deleteProductById(id) {
    let removedProduct = null;
    console.log('deleteProductById =', id);
    // console.log('this._storage before =', this._storage);
    this._storage.forEach((element, index) => {
      if (element.id === Number(id)) {
        removedProduct = this._storage.splice(index, 1);
      }
    });
    // console.log('this._storage after =', this._storage);

    return removedProduct;
  }
}

module.exports = Products;

console.log('class Products Ended in product.js');
