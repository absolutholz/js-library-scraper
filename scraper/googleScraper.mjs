import rp from 'request-promise';
import $ from 'cheerio';

export function getResultUrls (searchTerm) {
	return rp(`https://www.google.com/search?q=${ encodeURI(searchTerm) }`)
		.then((html) => {
			return $('#main a[href^="/url?q="]', html).get().map((elLinkHeadline) => {
				return new URL($(elLinkHeadline).attr('href'), 'https://google.com/').searchParams.get('q');
			});
		})
		.catch((error) => {
			console.log(error);
		});
}
