const TableName = require('./tables');
const LowDatabase = require('./lowdatabase');
const path = require('path');

class AppLowDatabase extends LowDatabase {
  constructor() {
    const dbLocation = path.relative(__dirname, 'db.json');
    super({
      defaults: {
        [TableName.word]: [],
        [TableName.category]: []
      },
      dbLocation
    });

    // NB. arrow functions don't work when declared outside class
    this.getWords = () => super.getAll(TableName.word);
    this.getCategories = () => super.getAll(TableName.category);
    this.getWordById = id => super.getById(id, TableName.word);
    this.getCategoryById = id => super.getById(id, TableName.category);
  }
}

module.exports = AppLowDatabase;
