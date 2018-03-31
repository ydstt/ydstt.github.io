// API's:
// New York Times
// https://developer.nytimes.com/

// Guardian:
// http://open-platform.theguardian.com/explore/

// NewsApi.org
// https://newsapi.org/

// Handlebars templating:
var source = $('#article-template').html();
var template = Handlebars.compile(source);

// 1. Setup AJAX requests to fetch data from each news source
$.ajax({
	type: 'Get',
	url: 'https://api.nytimes.com/svc/topstories/v2/home.json?api-key=79abe18e146d4911b2267c5e240fc636',
	success: formatNytResponse
})


function formatNytResponse(response) {
	//console.log(response.results)
	var articles = response.results.map(function(article) {
		// date and image logic here		
		var image

		if (article.multimedia[0]) {
			image = article.multimedia[0].url
		} else {
			image = 'http://pbs.twimg.com/profile_images/942784892882112513/qV4xB0I3_reasonably_small.jpg'
		}

		var date = new Date(article.created_date)

		return {
			title: article.title,
			date: date.toLocaleDateString(),
			image: image,
			type: article.section,
			link: article.url,
		}
	})

	var articleTemplates = template(articles)
	$('#main').append(articleTemplates)
}

// 2. Set up functions to handle each of the above AJAX requests:
// - Use Array's .map method to transform the response into an array of objects that you will pass to the Handlebars template
// - Check out the id=article-template in index.html to see what properties the template expects
// - To properly format article dates, use new Date() and the .toLocaleDateString() method
// Note: not all articles will have all the expected properties :D



//pulling articles from The Guardian

$.ajax({
	type: 'Get',
	url: 'https://content.guardianapis.com/search?api-key=b320796c-81de-48e9-8cdc-c20806524ad1',
	success: formatGuardianResponse
})

function formatGuardianResponse(response) {
	//console.log(response.response)
	var articles = response.response.results.map(function(article) {
		
		var image = 'https://www.burdekin.qld.gov.au/wp/media/2013/02/rubber-duck2.jpg'

		var date = new Date(article.webPublicationDate)

			return {
			title: article.webTitle,
			date: date.toLocaleDateString(),
			image: image,
			type: article.type,
			link: article.apiUrl,
		}

	} // end function article

		) // end map function call


	var articleTemplates = template(articles)
	$('#main').append(articleTemplates)

} // end formatGuadianResponse function



//newsapi.org

$.ajax({
	type: 'Get',
	url: 'https://newsapi.org/v2/top-headlines?country=us&apiKey=aaa2418b7ae8429ea7db8c24ae259817',
	success: formatNewsapiResponse
})

function formatNewsapiResponse(response) {
	console.log(response)
	var articles = response.articles.map(function(article) {

		var date = new Date(article.publishedAt)
		var image

		if (article.urlToImage[0]) {
			image = article.urlToImage
		}

		else {
			image = 'https://static.pexels.com/photos/658687/pexels-photo-658687.jpeg'
		}

			return {
			title: article.title,
			date: date.toLocaleDateString(),
			//image: article.urlToImage,
			image: image,
			type: 'top headlines',
			link: article.url,
		}

	} // end function article

		) // end map function call  


	var articleTemplates = template(articles)
	$('#main').append(articleTemplates)

} // end formatGuadianResponse function

