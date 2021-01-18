import express from 'express';
import { getResultUrls } from './googleScraper.mjs';
import { getScriptsForPages } from './pageScriptFinder.mjs';

const app = express();
const port = 3000;
const libraries = {};

app.get('/', (req, res) => {
	getResultUrls(req.params.q)
		.then(async (urls) => {
			const pages = await getScriptsForPages(urls);
			(pages || []).forEach((page) => {
				(page || []).forEach((script) => {
					if (!libraries[script]) {
						libraries[script] = 1;
					} else {
						libraries[script] = libraries[script] + 1;
					}
				});
			});

			const rankedScripts = Object.fromEntries(Object.entries(libraries).sort(([,a],[,b]) => b-a));
			res.send(rankedScripts);
		});
});

app.listen(port, () => {
	console.log(`Listening at http://localhost:${ port }`);
});
