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
	'baseUrl': './',
	'paths': {
		'uirouter': 'https://cdnjs.cloudflare.com/ajax/libs/angular-ui-router/0.3.1/angular-ui-router.min',
		'uibootstrap': 'https://cdnjs.cloudflare.com/ajax/libs/angular-ui-bootstrap/1.3.3/ui-bootstrap-tpls.min'
	},
	'shim': {
		'app-build': {
			'deps': ['uirouter', 'uibootstrap']
		}
	}
});

require( ["js/qlik"], function (qlik){
	qlik.setOnError( function (error){
		alert(error.message);
	});
	
	window.qlik = qlik;
	
	require({context: 'requireApp'}, ["app-build"]);
});
