var userLocation = "Detroit"
var locationUrl
var weatherURL
var lat
var lon
var lotsOfInfo
var cityName
var unixTs
var readableDate
var iconId
var iconUrl
var temp
var humid
var wind



getLocation()
function getLocation() {
  locationUrl = "http://api.openweathermap.org/geo/1.0/direct?q="+userLocation+"&limit=1&appid=a0544cd5b7dad5620c4fc9a9ec489c17"
  fetch(locationUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    lat = data[0].lat
    lon = data[0].lon
    console.log(lat, lon)
    getWeather()
  });
}

function getWeather() {
  weatherURL = "http://api.openweathermap.org/data/2.5/forecast?lat="+lat+"&lon="+lon+"&cnt=40&units=imperial&appid=a0544cd5b7dad5620c4fc9a9ec489c17"
  fetch(weatherURL)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    lotsOfInfo = data
    setAllTheData()
  })
}

function setAllTheData() {
  cityName = lotsOfInfo.city.name
  console.log(cityName)

  unixTs = lotsOfInfo.list[0].dt
  console.log(unixTs)

  readableDate = dayjs.unix(unixTs).format("MM/DD/YYYY")
  console.log(readableDate)

  iconId = lotsOfInfo.list[0].weather[0].icon
  console.log(iconId)

  iconUrl = "https://openweathermap.org/img/wn/"+iconId+"@2x.png"
  console.log(iconUrl)

  temp = lotsOfInfo.list[0].main.temp
  console.log(temp)

  humid = lotsOfInfo.list[0].main.humidity
  console.log(humid)

  wind = lotsOfInfo.list[0].wind.speed
  console.log(wind)
}



