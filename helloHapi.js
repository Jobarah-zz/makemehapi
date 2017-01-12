var Hapi = require ('hapi');
var Inert = require ('inert');
var Vision = require ('vision');
var Path = require('path');
var H2o2 = require('h2o2');

var server = new Hapi.Server();

server.connection({
	host: 'localhost',
	port: Number(process.argv[2]) || 8000
});

server.register(Inert, function (err) {
	if(err) throw 'Inert error';
});

server.register(Vision, function (err) {
	if(err) throw 'Vision error';
});

server.register(H2o2, function (err) {
    if (err) throw err;
});

server.route({
	path: '/proxy', 
	method: 'GET',
	handler: {
		proxy: {
			host: '127.0.0.1',
			port: 65535
		}
	}
});

server.views({
	engines: {
		html: require('handlebars')
	},
	path: Path.join(__dirname, 'templates')
});

server.start(function (argument) {
	console.log('server running at: ', server.info.uri);
});

