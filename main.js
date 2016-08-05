/*
** Config variable to pass to qlik.openApp() method
*/
var prefix = window.location.pathname.substr( 0, window.location.pathname.toLowerCase().lastIndexOf( "/extensions" ) + 1 );
var config = {
	'host': window.location.hostname,
	'prefix': prefix,
	'port': window.location.port,
	'isSecure': window.location.protocol === "https:"
};

/*
** Qlik Sense App ID to pass to qlik.openApp() method
*/
var appId = 'Helpdesk Management.qvf';


require.config({
	'baseUrl': (config.isSecure ? "https://" : "http://" ) + config.host + (config.port ? ":" + config.port : "" ) + config.prefix + "resources"
});

var requireApp = require.config({
	'context': 'requireApp',
	'baseUrl': './'
});

require( ["js/qlik"], function (qlik){
	qlik.setOnError( function (error){
		alert(error.message);
	});
	
	window.qlik = qlik;
	
	require({context: 'requireApp'}, ["app-build"]);
});
