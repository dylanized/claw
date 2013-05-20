// the claw

	// TODOS
	//  - fix ../../ paths in exports folder path
	//  - text with different configs
	//  - create output folder if it doesn't exist
	//  - accept a callback function
	//  - add http user-agent override

	// libararies
	var request = require('request'),
		path = require('path'),
		cheerio = require('cheerio'),
		fs = require('fs'),
		csv = require('csv'),
		__ = require('underscore'),
		jsonfile = require('jsonfile'),
		json2csv = require('json2csv');
		
	var allResults = new Array(); 	
	var i = 0;	
	var output_default = 'output';
	
	var settings = {};
	
	//settings.fields = ['text', 'href'];
		
	function claw(page_token, selector, field_config, output_folder, delay) {
	
		if (__.isArray(page_token)) {
			settings.pages = page_token;
		} else if (page_token.substr('.json')) {
			settings.pages = getPageArr(page_token);
		} else if (__.isString(page_token)) {
			settings.pages = [page_token];
		}

		settings.selector = selector;
		settings.delay = delay;
		settings.fields = field_config;
		settings.output_folder = output_folder;
		settings.delayMS = delay * 1000;		
				
		// init	
		
		console.log("Starting scraper...");
		
		scraperLoop(settings.delayMS);		
				
		// functions
		
		function scraperLoop() {
			scrapePage(i);
			i++;
			if (i < settings.pages.length) {
				// console.log("Waiting " + settings.delay + " seconds...");
				setTimeout(scraperLoop, settings.delayMS);
			} else {
				setTimeout(endLoop, settings.delayMS);
			}
		}
		
		function endLoop() {
			console.log("\n" + i + " pages scraped!");
		}
		
		function scrapePage(index) {
		
			var page = settings.pages[i];
		
			console.log("\nScraping " + page);
		
			request(page, function(err, resp, body){
			
				$ = cheerio.load(body);
				var selection = $(settings.selector);
				var results = [];
				
				$(selection).each(function(i, sel){
				
					var output = {};
					
					for (var prop in settings.fields) {
					      fieldJS = "output[prop] = $(sel)." + settings.fields[prop];
						  eval(fieldJS);					      
					}						
					
					results.push(output);
					
				});

				allResults[index] = results;
				
				exportJSON(results, index);
				exportCSV(results, index);
						
			});		
			
		}
	
		function exportJSON(results, filename) {
		
			if (filename === undefined) filename = output_default;
			export_file = path.join(settings.output_folder, filename + '.json');
			
			console.log("Exporting " + export_file);
			
			jsonfile.writeFileSync(export_file, results);
					
		}
	
		function exportCSV(results, filename) {
		
			if (filename === undefined) filename = output_default;
			export_file = path.join(output_folder, filename + '.csv');
			
			var fieldArr = new Array();
			
			for (var prop in settings.fields) {
			      fieldArr.push(prop);
			}			
			
			json2csv({data: results, fields: fieldArr}, function(err, csv) {
			  if (err) console.log(err);
			  fs.writeFile(export_file, csv, function(err) {
			    if (err) throw err;
			    console.log("Exporting " + export_file);
			  });
			});				
			
		}		
	
	}
	
	function getPageArr(page_token) {
	
		var inputArr = require(path.join("../../", page_token));
		var outputArr = new Array();
		
		inputArr.forEach(function(page) {
			if (__.isString(page)) outputArr.push(page);
			else outputArr.push(page.href);
		});
		
		return outputArr;
	
	}	

	var exports = module.exports = claw;