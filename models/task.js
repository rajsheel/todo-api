var mongoose = require('mongoose');

var Schema = mongoose.Schema;


var TaskSchema = new Schema(
  { 
    description: {type: String, required: true},
  }
);



//Export model
module.exports = mongoose.model('Task', TaskSchema);


