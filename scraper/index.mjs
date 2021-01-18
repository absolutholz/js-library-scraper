import { getResultUrls } from './googleScraper.mjs';
import { getScriptsForPages } from './pageScriptFinder.mjs';

const libraries = {};

getResultUrls('car rental münchen')
	.then(async (urls) => {
		console.log(urls);
		const pages = await getScriptsForPages(urls);
		console.log(pages);
		(pages || []).forEach((page) => {
			(page || []).forEach((script) => {
				if (!libraries[script]) {
					libraries[script] = 1;
				} else {
					libraries[script] = libraries[script] + 1;
				}
			});
		});
		console.log(Object.fromEntries(Object.entries(libraries).sort(([,a],[,b]) => b-a)));
	});
