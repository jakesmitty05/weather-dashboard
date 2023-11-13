var weatherUrl = "http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=a0544cd5b7dad5620c4fc9a9ec489c17"



fetch(weatherUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data)
  });