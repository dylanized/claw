CLAW
===

A very simple web scraper chassis. Claw takes a web page (or list of pages), scrapes some info from those pages, then dumps the results to a JSON or CSV file.

How to Use
---

Accepts parameters

- a page url, or array of URLs
- a selection to scrape
- fields to pull out from within that section
- an output folder
- number of seconds to delay

```js
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
	
	claw.init(claw_config);		
```

Exported Data
---
		
Each page gets saved to a separate output file.

Here's what the JSON looks like:

```href
"http://www.hellomagazine.com/"
"http://en.wikipedia.org/wiki/Hello"
"http://dictionary.reference.com/browse/hello"

```

and here's what the CSV looks like:

```[
    {
        "href": "http://www.hellomagazine.com/"
    },
    {
        "href": "http://en.wikipedia.org/wiki/Hello"
    },
    {
        "href": "http://dictionary.reference.com/browse/hello"
    }
]

```
    
External Config
---

Claw can take its onfiguraction from a JSON file:

    claw('sample1.json');
    
The json file looks like this:    

```{
	"pages" : ["http://www.bing.com/search?q=hello", "http://www.bing.com/search?q=goodbye"],
	"selector" : "h3",
	"fields" : {
		"href" : "$(sel).find('a').attr('href')"
	},
	"delay" : 5
}
```
    
Command Line
---

You can also use claw from the command line. First, install it globally:

    npm install -g claw

Then run it in the same folder as your config file:

    claw sample1.json
    
This will create a folder called sample1, with your results.


External Page List
---
	
Claw can grab its page list from a JSON file that is a list of urls (or an object with .href properties). Instead of an array, just set "pages" to a file name and path.	

    claw_config.pages = "pages.json";

    
Feedback
---
    
Questions? Ideas? Hit me up on twitter - @dylanized