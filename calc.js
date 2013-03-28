'use strict'

var app = app || {};

$(function () {
	'use strict';

	new app.AppView({model: new app.Calc()});
});
