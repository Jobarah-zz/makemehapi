var Hapi = require ('hapi');
var Inert = require ('inert');
var Vision = require ('vision');

var server = new Hapi.Server();

server.connection({
	host: 'localhost',
	port: Number(process.argv[2 || 8000])
});

server.register(Inert, function (err) {
	if(err) throw 'Inert error';
});

server.register(Vision, function (err) {
	if(err) throw 'Vision error';
});


server.route({
	path: '/?name=Handling', 
	method: 'GET',
	handler: {
		view:'index.html'
	}
});

server.views({
	engines: {
		html: require('handlebars')
	},
	paths: Path.join(__dirname, 'templates')
})

server.start(function (argument) {
	console.log('server running at: ', server.info.uri);
});

