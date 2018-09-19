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
    return [...this._storage];
  }
  getItemById(id) {
    return this._storage.filter(article => id == article.id)[0];
  }
  add(article) {
    article.id = this._count;
    this._storage.push(article);
    this._count++;
    return article.id;
  }
  deleteArticleById(id) {
    let removedArticle = null;
    this._storage.forEach((element, index) => {
      if (element.id === Number(id)) {
        removedArticle = this._storage.splice(index, 1);
      }
    });
    return removedArticle;
  }
}

module.exports = Articles;

console.log('class Articles Ended in articles.js');
