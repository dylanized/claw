// pluck app example

	// libararies
	var pluck = require('pluck');
		
	// get settings
	var pages = ['http://www.bing.com/search?q=hello', 'http://www.bing.com/search?q=goodbye'];
	
	var selector = 'h3 a';
	
	var fields = {
		"text" : "text()",
		"href" : "attr('href')"
	};

	pluck(pages, selector, fields, 'output', 3);
	
	pluck("output/pages.json", selector, fields, 'output', 3);	