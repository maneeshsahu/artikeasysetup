'use strict'
const artik = require('artik-sdk');

const settings = {
	button: getButton(),
	led: getLED()
}

function getButton() {
	switch (artik.get_platform_name().toLowerCase()) {
		case 'artik 710':
			// SW403
			return 30;
		case 'artik 530':
			return 30;	
		case 'artik 520':
			return 121;
		case 'artik 1020':
			return 8;
		default:
			console.log("Invalid Platform name: " + artik.get_platform_name().toLowerCase());
	    	process.exit(-1);
	}	
}

function getLED() {
	switch (artik.get_platform_name().toLowerCase()) {
		case 'artik 710':
			return 28;
		case 'artik 530':
			//
			return 28;
		case 'artik 520':
			return 135;
		case 'artik 1020':
			return 22;
		default: 
			console.log("Invalid Platform name: " + artik.get_platform_name().toLowerCase());
	    	process.exit(-1);
	}
}

module.exports = settings