// claw app example

	// libararies
	var claw = require('./index.js');
		
	/*var claw_config = {
		pages : ['http://www.bing.com/search?q=hello', 'http://www.bing.com/search?q=goodbye'],
		selector : 'h3 a',
		fields : {
			"text" : "text()",
			"href" : "attr('href')"
		},
		outputFolder : 'output',
		delay : 3
	}*/
	
	claw.init('config.json');	