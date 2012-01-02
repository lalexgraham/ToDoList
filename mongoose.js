// file to test working with mongoose.js
var   sys       = require('util')
    , mongoose  = require('mongoose');
    
 console.log('hello from mongoose.js');
mongoose.connect('mongodb://127.0.0.1:27017/data');		

// Models

var Schema = mongoose.Schema;

var toDoSchema = new Schema({
   title    : String,
});

mongoose.model('toDo', toDoSchema);
var toDo = mongoose.model('toDo');


// create a new toDo
var todo = new toDo({
   title    : 'buy milk again'
});
todo.save(function(err){
      console.log("saving");
        if(!err){
            console.log('todoItem saved.');
        }
    });


toDo.find({}, function(err,todos) {
	todos.forEach(function(todo) {
		console.log(todo.title);
		
	})
	
		
});

toDo.remove({_id:'4ee3e47ea24efc5c0d000001'},function(){
	console.log('removed doc');
});


toDo.find({}, function(err,todos) {
	todos.forEach(function(todo) {
		console.log(todo);
		
	})
	
		
});
	mongoose.disconnect();


