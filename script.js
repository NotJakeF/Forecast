var forecast = $("#forecast")

function getWeatherForCity(city) {
    var url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=0ce50fc5b3dc444abe1be5875eb03721`;

    $.get(url, function (response) {
        console.log(response);
        drawCards(response);
    });

    addCityToSearchHistory(city);
}

getWeatherForCity('malibu');

function drawCards(data) {
    var days = data.list.filter(function (item) {
        console.log(item)
        return item.dt_txt.includes("12:00:00")
    });
    forecast.empty()
    console.log(days)
    days.map(function (item) {
        var card = `<div class="card text-white bg-primary mb-3" style="max-width: 18rem;">
        <div class="card-header">${item.dt_txt}</div>
        <div class="card-body">
          <h5 class="card-title">Primary card title</h5>
          <p class="card-text">${item.main.temp}</p>
          <p class="card-text">${item.main.humidity}</p>
        </div>
      </div>`
        forecast.append(card)
    });
}

function addCitiesToHistoryList(searchCitiesArray) {
    $('.search-history-list').html('');

    const searchedCitiesMarkup = searchCitiesArray.forEach((element) => {
        $('.search-history-list').append(`<li class='list-group-item'>${element}</li>`);
    });
}

//I can you hear you. It says you've left the WyzAnt meeting. I'm in that meeting.
function addCityToSearchHistory(searchedCity) {
    let searchedCities = localStorage.getItem('searchedCities');
    let searchCitiesArray;
    if(searchedCities === null) { // for first city searched
        searchCitiesArray = [searchedCity];
        searchedCities = JSON.stringify(cities);
    } else { // for subsequent cities searched
        searchCitiesArray = JSON.parse(searchedCities);
        const cityAlreadyInHistory = searchCitiesArray.includes(searchedCity);
        if(!cityAlreadyInHistory) {
            searchCitiesArray.push(searchedCity);
        }
        searchedCities = JSON.stringify(searchCitiesArray);
    }

    localStorage.setItem('searchedCities', searchedCities);

    addCitiesToHistoryList(searchCitiesArray);
}

$('.search-button').click(() => {
    // go get the current in the input field
    const searchedCity = $('.search-input').val();

    // perfom search using that city
    getWeatherForCity(searchedCity);

    // clear out the value in the input field
    $('.search-input').val('');
    return false;
});
