console.log('\nclass Articles Started in articles.js');
class Articles {
  constructor() {
    this._count = 1;
    this._storage = [];
    this.add({
      title: "Hydrogen",
      body: "H atomic # 1.",
      author: 'Rogers, H. C.',
    });
  }
  all() {
    // console.log('class Articles all() ...this._storage =\n', this._storage);
    return [...this._storage];
  }
  getItemById(id) {
    console.log('getItemById =', id);
    return this._storage.filter(article => id == article.id)[0];
  }
  add(article) {
    // console.log('\nadd article =\n', article,'\n');
    article.id = this._count;
    this._storage.push(article);
    this._count++;
    return article.id;
  }
  // updateItemById(id) {}
  deleteArticleById(id) {
    let removedArticle = null;
    console.log('deleteArticleById =', id);
    // console.log('this._storage before =', this._storage);
    this._storage.forEach((element, index) => {
      if (element.id === Number(id)) {
        removedArticle = this._storage.splice(index, 1);
      }
    });
    // console.log('this._storage after =', this._storage);

    return removedArticle;
  }
}

module.exports = Articles;

console.log('class Articles Ended in articles.js');
