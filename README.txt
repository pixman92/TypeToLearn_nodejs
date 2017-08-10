README.txt

TODO
-put code in server
-get code out
-respond to http request


LEARNED
-get params ("/something/:foo")
-request? = request.params.foo
-response.send('foo for whatever you want to reply with')


killall -9 node

callback()
function foo (param, callback){
	param stuff

	callback()
}
foo('something', function(){
	callback stuff;
});
