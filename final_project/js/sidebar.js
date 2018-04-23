
//grabbing Photo of the Day from Nasa's website

$.ajax({
	type: 'get',
	url: 'https://api.nasa.gov/planetary/apod?api_key=MWG6E6oLdQy3BABULsPajjOOc1lTunMofW0gvurW',
	success: formatNasaResponse
})


function formatNasaResponse (response) {
	console.log(response.media_type)

	var URL = response.url
	//console.log(response)
	if (response.media_type === 'image') {
		$('#photoOfTheDay').append('<img src="' + URL + '" width="200">' )
	}

	else {
		$('#photoOfTheDay').append('<iframe src="' + URL + '" width="200"></iframe>')
	}
}


