var db = require('../config');
var crypto = require('crypto');

var Schema = db.Schema;
var ObjectId = Schema.ObjectId;

var linkSchema = new Schema({
  id: ObjectId,
  url: { type: String, unique: true },
  baseUrl: String,
  code: String,
  title: String,
  visits: { type: Number, default: 0}
  // not using timestamps
});

linkSchema.pre('validate', function(next) {
  var shasum = crypto.createHash('sha1');
  shasum.update(this.get('url'));
  this.set('code', shasum.digest('hex').slice(0, 5));
  next();
});

var Link = db.model('Link', linkSchema);

// var Link = db.Model.extend({
//   tableName: 'urls',
//   hasTimestamps: true,
//   defaults: {
//     visits: 0
//   },
//   initialize: function() {
//     this.on('creating', function(model, attrs, options) {
//       var shasum = crypto.createHash('sha1');
//       shasum.update(model.get('url'));
//       model.set('code', shasum.digest('hex').slice(0, 5));
//     });
//   }
// });

module.exports = Link;
