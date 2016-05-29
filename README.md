# node_modules-list

Provides an array of all installed packages from a node installation.

Mostly for my own need, since `npm ls` strips custom values from the packages, I can't use that since I'm using custom values on the packages and need it preserved.

## Usage

	var nmls = require('node_modules-list');
	
	nmls(function(err, node_modules) {
		console.log(node_modules.length);
	})