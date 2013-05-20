// claw app example

	// libararies
	var claw = require('claw');
		
	// get settings
	var pages = ['http://www.bing.com/search?q=hello', 'http://www.bing.com/search?q=goodbye'];
	
	var selector = 'h3 a';
	
	var fields = {
		"text" : "text()",
		"href" : "attr('href')"
	};

	claw(pages, selector, fields, 'output', 3);
	
	claw("pages.json", selector, fields, 'output', 3);	