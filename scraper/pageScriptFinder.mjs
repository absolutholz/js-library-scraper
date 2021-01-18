import $ from 'cheerio';
import puppeteer from 'puppeteer';

export async function getScriptsForPages (urls) {
	const scriptsForPages = await Promise.all(urls.map((url) => {
		return getScriptsForPage(url);
	}));
	return scriptsForPages;
}

export async function getScriptsForPage (url) {
	console.log('PAGE:', url);
	try {
		const browser = await puppeteer.launch();
		const page = await browser.newPage();
		await page.goto(url);
		const html = await page.content();
		// not entirely sure why this selector doesn't work: , script[src*=".js\?"]
		const scripts = $('script[src$=".js"]', html).get().map((elScript) => {
			return $(elScript).attr('src')
				.replace(/^(...)*\/\//, '')		// remove protocol
				.replace(/^\/\//, '')			// remove leading double slashes
				.replace(/^\//, '')				// remove leading single slash
				.replace(/^www./, '')			// remove leading www subdomain
				.replace(/((...)*\/)*/g, '')	// remove remove anything before, as well as, the last slash
				.replace(/\?(...)*/, '');		// remove and query string params
		});
		browser.close();
		return scripts;
	} catch (error) {
		console.log(error);
	}
}
