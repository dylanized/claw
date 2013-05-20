claw
===

A very simple web scraper chassis. Claw takes a web page (or list of pages), scrapes some info from those pages, then dumps the results to a JSON or CSV file.

how to use
---

Accepts parameters

- a page url, or array of URLs
- a selection to scrape
- fields to pull out from within that section
- an output folder
- number of seconds to delay

    var claw = require('claw');
    	
    var claw_config = {
    	pages : ['http://www.bing.com/search?q=hello', 'http://www.bing.com/search?q=goodbye'],
    	selector : 'h3 a',
    	fields : {
    		"text" : "text()",
    		"href" : "attr('href')"
    	},
    	outputFolder : 'output',
    	delay : 3
    }
    
    claw(claw_config);	
		
Each page gets saved to a separate output file.

configuration file
---
	
Claw can also grab its page list from a JSON file that is a list of urls (or an object with .href properties). Instead of an array, just set "pages" to a file name and path.	

    claw_config.pages = "page_list.json";

Last but not lease, claw can take its entire configuration from a JSON file:

    claw('claw_config.json');
    
command line
---

You can also use claw from the command line. First, install it globally:

    npm install -g claw

Then run it in the same folder as your config file:

    claw config.json
    
feedback
---
    
Questions? Ideas? Hit me up on twitter - @dylanized