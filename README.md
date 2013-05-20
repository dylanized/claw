claw
===

A very simple web scraper chassis. Claw takes a web page (or list of pages), scrapes some info from those pages, then dumps the results to a JSON or CSV file.

Accepts parameters

- a page url, or array of URLs
- a selection to scrape
- fields to pull out from within that section
- an output folder
- number of seconds to delay

	var claw = require('claw');
		
	var page = 'http://www.bing.com/search?q=hello';	
	var selector = 'h3 a';	
	var fields = {
		"text" : "text()",
		"href" : "attr('href')"
	};

	claw(page, selector, fields, 'output', 3);
		
Give claw an array of pages, and it will save the results of each page to a separate file.

    claw(['http://www.bing.com/search?q=hello', 'http://www.bing.com/search?q=goodbye'], selector, fields, 'output', 3);
	
Claw can also grab its page list from a JSON file that is a list of urls (or an object with .href properties).	

	claw("pages.json", selector, fields, 'output', 3);
    
Questions? Ideas? Hit me up on twitter - @dylanized