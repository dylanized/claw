razorblade
===

A very simple web scraper.

Takes:

- a page url
- a selection to scrape
- fields to pull out from within that section
- an output folder

and it creates CSV and JSON files with the results. Razorblade creates a separate file for each page it scrapes.

	// libararies
	var razor = require('razorblade');
		
	// get settings
	var page = 'http://www.bing.com/search?q=hello';
	
	var selector = 'h3 a';
	
	var fields = {
		"text" : "text()",
		"href" : "attr('href')"
	};

	razor(page, selector, fields, 'output', 3);
		
Give it an array of pages, and it will save the results of each page to a separate file.

    razor(['http://www.bing.com/search?q=hello', 'http://www.bing.com/search?q=goodbye'], selector, fields, 'output', 3);
	
Pluck can also grab its page list from JSON file that is a list of urls (or an object with .href properties).	

	razor("pages.json", selector, fields, 'output', 3);
    
Questions? Ideas? Hit me up on twitter - @dylanized