// razorblade app example

	// libararies
	var razor = require('razorblade');
		
	// get settings
	var pages = ['http://www.bing.com/search?q=hello', 'http://www.bing.com/search?q=goodbye'];
	
	var selector = 'h3 a';
	
	var fields = {
		"text" : "text()",
		"href" : "attr('href')"
	};

	razor(pages, selector, fields, 'output', 3);
	
	razor("output/pages.json", selector, fields, 'output', 3);	