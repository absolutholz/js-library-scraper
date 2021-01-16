import rp from 'request-promise';
import $ from 'cheerio';
import puppeteer from 'puppeteer';

export function getResultUrls (searchTerm) {
	return rp(`https://www.google.com/search?q=${ searchTerm }`)
		.then((html) => {
			//success!
			// console.log($('#main h3', html).closest('a').length);
			return $('#main h3', html).closest('a').get().map((elLinkHeadline) => {
				return new URL($(elLinkHeadline).attr('href'), 'https://google.com/').searchParams.get('q');
			});
			// console.log(html);
		})
		.catch((error) => {
			//handle error
			// console.log(error);
		});
}

export function getPages (urls) {
	urls.forEach((url) => {
		console.log('PAGE:', url);

		// puppeteer
		// 	.launch()
		// 	.then(function(browser) {
		// 		return browser.newPage();
		// 	})
		// 	.then(function(page) {
		// 		return page.goto(url).then(function() {
		// 			return page.content();
		// 		});
		// 	})
		// 	.then(function(html) {
		// 		console.log(html);
		// 	})
		// 	.catch(function(error) {
		// 		//handle error
		// 		console.log(error);
		// 	});

		return rp(url)
			.then((html) => {
				//success!
				$('script[src*=".js"]', html).get().forEach((elScript) => {
					console.log($(elScript).attr('src'));
				});
			})
			.catch((error) => {
				//handle error
				// console.log(error);
		});
	});
}
