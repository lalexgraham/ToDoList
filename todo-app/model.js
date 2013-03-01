//model to abstract away from requestHanlder.js mongoose config - does not work
var  mongoose  = require('mongoose');
var Schema = mongoose.Schema;

var toDoSchema = new Schema({
   title    : String,
});

mongoose.connect('mongodb://127.0.0.1:27017/data');
mongoose.model('toDo', toDoSchema);

exports.model = model;
