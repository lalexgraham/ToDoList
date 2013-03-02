var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var toDoSchema = new Schema({
    title    : String,
});

mongoose.connect('mongodb://127.0.0.1:27017/todo');
mongoose.model('todo', toDoSchema);

var toDo = mongoose.model('todo');


exports.toDo = toDo;
