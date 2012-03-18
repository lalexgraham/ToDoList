//Load modules  
var http = require('http');  
var url = require('url');
var util = require('util');   
var querystring = require('querystring'); 

var appURL = 'http://localhost:8888';
				
//Mongoose config
//(would like to put this in separate file: http://j-query.blogspot.com/2011/11/mongoose-and-mongohq.html)
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var toDoSchema = new Schema({
   title    : String,
});

mongoose.connect('mongodb://127.0.0.1:27017/data');
mongoose.model('toDo', toDoSchema);
// saves to 'todos' collection in 'data' database rather than todo
var toDo = mongoose.model('toDo');



function add(response, request) {
  console.log("Request handler 'add' was called.");
 	 post_handler(request, function(request_data) {
 	  var todo = new toDo({
 	  		  title : request_data.note
 	  });

 	  todo.save(function(err){
 	  		  console.log("saving"+ request_data.note);
 	  		  if(!err){
 	  		    	console.log('todoItem saved.');
 	  		  }
 	  });
 	 });
 	response.writeHead(301, {'Location':appURL + '/list', 'Expires': (new Date).toGMTString()});
        response.end();
}

function list(response) {

	console.log("Request handler 'list' was called.");
	toDo.find({}, function(err,todos) {
			
			response.writeHead(200, {'Content-Type': 'text/html'});        
			response.write('<html><head><html><head><meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"><title>Todo List</title></head><title>Todo List</title></head>');  
			response.write('<body>');  
			response.write('<h1>ToDo list</h1>');  
			response.write('<ul>'); 
    
    
			todos.forEach(function(todo) {
				response.write('<li>' + todo.title + '&nbsp;<a href="remove?id='+todo._id+'">remove</a></li>');  
			})
		
			var form = '<form action="/add" method="post">'+
			'<input type="text" name="note" >'+
			'<input type="submit" value="Add note" />'+
			'</form>'+
			'</body>'+
			'</html>';
			response.end(form);	
		
	});		

	
	
		
}
	
function remove(response, request) {
	console.log("Request handler 'remove' was called.");
	parsedURL = url.parse(request.url, true);
	console.log(' _id to remove ' + parsedURL.query['id']);
	toDo.findOne({_id: parsedURL.query['id']},function(err,docs){
	  console.log('deleting' + docs);  //Remove all the documents that match!
	  docs.remove();
	  docs.save();
	  
	  // 301 permanent redirect to list\
	  response.writeHead(301, {'Location':appURL + '/list', 'Expires': (new Date).toGMTString()});
	  response.end();
	});
}
 
 
function post_handler(request, callback){
    var _REQUEST = { };
    var _CONTENT = '';

    if (request.method == 'POST')
    {
        request.addListener('data', function(chunk)
	{
	    _CONTENT+= chunk;
	});

	request.addListener('end', function()
	{
            _REQUEST = querystring.parse(_CONTENT);
	    callback(_REQUEST);
	});
    };
};

exports.add = add;
exports.list = list;
exports.remove = remove;
