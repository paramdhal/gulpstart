'use strict';

var $ = require('jquery');
var time = require('./time');

setInterval(function(){
	$('#time').text(time());
},1000);

