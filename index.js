#!/usr/bin/env node

// the claw

	// TODOS
	//  - accept a callback function?
	//  - add http user-agent override
	//  - toggle exporting of each type on/off
	//  - concat mode
	//	- console.log colors
	
	// libararies
	var request = require('request'),
		path = require('path'),
		cheerio = require('cheerio'),
		fs = require('fs'),
		__ = require('underscore'),
		jsonfile = require('jsonfile'),
		json2csv = require('json2csv');
		
	var allResults = []; 	
	var i = 0;	
	var outputFolderDefault = 'output';
	
	var settings = {};
	
	function claw(config) {
	
		var configObj;
		
		if (__.isString(config)) {
			if (config.search('.json') < 0) {
				config += '.json';
			}		
			var config_path;
			if (config.search('/') == 1 || config.search('.') == 1) config_path = config;
			else config_path = path.join(process.cwd(), config);
			
			if (!fs.existsSync(config_path)) {
			  	console.log(config + " not found!");
			  	process.kill();
			}
			
			configObj = require(config_path);
		}	
		else configObj = config;
			
		var pageToken = configObj.pages;
		
		if (__.isString(pageToken)) {
			if (pageToken.search('.json') > -1) {
				settings.pages = importPageArr(pageToken);
			} else {
				settings.pages = [pageToken];		
			}
		} else {
			settings.pages = pageToken;		
		}
		
		settings.delay 		= configObj.delay;
		settings.fields 	= configObj.fields;		
		settings.delayMS 	= configObj.delay * 1000;
		
		if (configObj.selector) settings.selector = configObj.selector;
		else settings.selector = "body";
		
		if (configObj.outputFolder) settings.outputFolder = config.outputFolder;
		else if (__.isString(config)) settings.outputFolder = path.basename(config, '.json');
		else settings.outputFolder = outputFolderDefault;
				
		// check if output folder exists						
		if (!fs.existsSync(settings.outputFolder)) {			
		  	fs.mkdirSync(settings.outputFolder);
		}
				
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
		
			var page = settings.pages[index];
		
			console.log("\nScraping " + page);
		
			request(page, function(err, resp, body){
			
				$ = cheerio.load(body);
				var results = [];
				
				$(settings.selector).each(function(i, sel){
				
					var output = {};
					
					for (var prop in settings.fields) {					
						var fieldJS = "output['" + prop + "'] = " + settings.fields[prop];
						eval(fieldJS);					      
					}						
					
					results.push(output);
					
				});

				console.log(results);
				allResults[index] = results;
				
				var outfile;
				
				if (settings.pages.length === 1) outfile = "output";
				else outfile = index;
				
				exportJSON(results, outfile);
				exportCSV(results, outfile);
						
			});		
			
		}
	
		function exportJSON(results, filename) {
		
			if (filename === undefined) filename = "output";
			var export_file = path.join(settings.outputFolder, filename + '.json');
			
			console.log("Exporting " + export_file);
			
			jsonfile.writeFileSync(export_file, results);
					
		}
	
		function exportCSV(results, filename) {
		
			if (filename === undefined) filename = "output";
			var export_file = path.join(settings.outputFolder, filename + '.csv');
			
			var fieldArr = [];
			
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
	
	function importPageArr(page_token) {
	
		var json_path;
		
		if (page_token.search('/') == 1 || config.search('.') == 1) json_path = config;
		else json_path = path.join(process.cwd(), page_token);
	
		var inputArr = require(json_path);
		var outputArr = [];
		
		inputArr.forEach(function(page) {
			if (__.isString(page)) outputArr.push(page);
			else outputArr.push(page.href);
		});
		
		return outputArr;
	
	}
	
	exports.init = claw;
	
	// command line version
	var arg = process.argv[2];
	if (__.isString(arg)) {
		exports.init(arg);
	}