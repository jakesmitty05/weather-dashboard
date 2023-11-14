var userLocation
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

var cityList = []

localStorageLoad()
function localStorageLoad() {
  var retCityListString = localStorage.getItem("city")
  if (retCityListString !== null) {
  cityList = JSON.parse(retCityListString)
  }
}

//localStorageSave()
function localStorageSave() {
  var cityListString = JSON.stringify(cityList)
  localStorage.setItem("city", cityListString)
}

function searchButton() {
  userLocation = (document.getElementById("city-input").value)
  getLocation()
}

if (cityList.length !== 0) {
  for (var i = 0; i < cityList.length; i++) {
    cityName = cityList[i]
    addToHistory()
  }
}


function getLocation() {
  locationUrl = "http://api.openweathermap.org/geo/1.0/direct?q="+userLocation+"&limit=1&appid=a0544cd5b7dad5620c4fc9a9ec489c17"
  fetch(locationUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    lat = data[0].lat
    lon = data[0].lon
    getWeather()
  });
}

function getWeather() {
  weatherURL = "http://api.openweathermap.org/data/2.5/forecast?lat="+lat+"&lon="+lon+"&cnt=41&units=imperial&appid=a0544cd5b7dad5620c4fc9a9ec489c17"
  fetch(weatherURL)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    lotsOfInfo = data
    console.log(lotsOfInfo)
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

  addToHistory()
  cityList.push(cityName)
  console.log(cityList)
  localStorageSave()
  setTextStuff()
}

function addToHistory() {
  var newLi = document.createElement("li")
  newLi.setAttribute("class", "list-group-item")
  newLi.setAttribute("onclick", "getHistoryItem()")
  newLi.setAttribute("value", cityName)
  var newText = document.createTextNode(cityName)
  newLi.appendChild(newText)
  var element = document.getElementById("city-history")
  element.appendChild(newLi)
}

function setTextStuff() {
  document.getElementById("city-name-and-date").textContent = cityName + " " + readableDate
  document.getElementById("temp").textContent = "Temp: " + temp + "°F"
  document.getElementById("wind").textContent = "Wind: " + wind + " MPH"
  document.getElementById("humid").textContent = "Humidity: "+ humid + "%"
  forecast5Day()
}

function forecast5Day() {
  
  var j = 0
  for (var i = 0; i < 5; i++) {
    j = j+8
    console.log(i,j)
    unixTs = lotsOfInfo.list[j-1].dt
    console.log(unixTs)

    readableDate = dayjs.unix(unixTs).format("MM/DD/YYYY")
    console.log(readableDate)

    iconId = lotsOfInfo.list[j-1].weather[0].icon
    console.log(iconId)

    iconUrl = "https://openweathermap.org/img/wn/"+iconId+"@2x.png"
    console.log(iconUrl)

    temp = lotsOfInfo.list[j-1].main.temp
    console.log(temp)

    humid = lotsOfInfo.list[j-1].main.humidity
    console.log(humid)

    wind = lotsOfInfo.list[j-1].wind.speed
    console.log(wind)
    
    document.getElementById(i+"date").textContent = readableDate
    document.getElementById(i+"temp").textContent = "Temp: " + temp + "°F"
    document.getElementById(i+"wind").textContent = "Wind: " + wind + " MPH"
    document.getElementById(i+"humid").textContent = "Humidity: "+ humid + "%"
  }
}

function getHistoryItem() {
  var temploc
  $(document).click(function(event) {
    temploc = $(event.target).text()
    console.log(temploc)
    document.getElementById("city-input").value = temploc
    userLocation = temploc
    getLocation()
});
}

