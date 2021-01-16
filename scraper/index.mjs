import { getResultUrls, getPages } from './scrapeGoogleResultPage.mjs';

getResultUrls('absolutholz')
	.then((urls) => {
		console.log(urls);
		getPages(urls);
	});
