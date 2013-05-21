// claw app example

	var claw = require('./index.js');
		
	var claw_config = {
		pages : ['http://www.bing.com/search?q=hello', 'http://www.bing.com/search?q=goodbye'],
		selector : 'h3',
		fields : {
			"text" : "$(sel).find('a').text()",
			"href" : "$(sel).find('a').attr('href')"
		},
		delay : 3
	}
	
	// claw.init('./sample1.json');	
	
	claw.init(claw_config);		