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
		pages : [
			'http://www.bing.com/search?q=hello',
			'http://www.bing.com/search?q=goodbye'
		],
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

Here's what the exported JSON looks like:

```json
[
    {
        "text": "HELLO! Online: celeb & royal news, magazine, babies, weddings",
        "href": "http://www.hellomagazine.com/"
    },
    {
        "text": "Hello - Wikipedia, the free encyclopedia",
        "href": "http://en.wikipedia.org/wiki/Hello"
    },
    {
        "text": "Hello | Define Hello at Dictionary.com",
        "href": "http://dictionary.reference.com/browse/hello"
    }
]
```

and here's the CSV:

```csv
text,href
"HELLO! Online: celeb & royal news, magazine, babies, weddings, É","http://www.hellomagazine.com/"
"Hello - Wikipedia, the free encyclopedia","http://en.wikipedia.org/wiki/Hello"
"Hello | Define Hello at Dictionary.com","http://dictionary.reference.com/browse/hello"
```
    
External Config
---

Claw can import its configuration from a JSON file:

    claw('sample1.json');
    
The file looks like this:    

```js
{
	"pages" : [
		"http://www.bing.com/search?q=hello",
		"http://www.bing.com/search?q=goodbye"
	],
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
    
Questions? Ideas? Hit me up on twitter - [@dylanized](http://twitter.com/dylanized)