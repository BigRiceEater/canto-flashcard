const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

class LowDatabase {
  constructor({ defaults = {}, dbLocation = './db.json' }) {
    const adapter = new FileSync(dbLocation);
    this.db = low(adapter);
    this.db.defaults(defaults).write();

    this.getAll = tablename => this.db.get(tablename).value();
    this.getById = (id, tablename) =>
      this.db
        .get(tablename)
        .filter({ id })
        .first()
        .value();
  }
}

module.exports = LowDatabase;
