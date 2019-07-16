export default class Word {
  constructor({ id, word, pronounce, imageUrl, categoryId }) {
    this.id = id;
    this.word = word;
    this.pronounce = pronounce;
    this.image = imageUrl;
    this.catId = categoryId;
  }
}
