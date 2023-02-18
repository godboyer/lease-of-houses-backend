const { model } = require("./connect");

class BaseModel {
  constructor(collectionName, schemaName) {
    this.model = model(collectionName, schemaName);
  }
}

module.exports = BaseModel;
