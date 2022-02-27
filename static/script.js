let week = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun", "Mon"];

async function get (val) {
    if(!val) val = document.getElementById('query').value;
    localStorage.setItem('last-lookup', val);
    await fetch(`https://api.weatherapi.com/v1/forecast.json?key=2379467b9adb453ea0525259222402&q=${val}&days=2`)
        .then(res => res.json())
        .then(json => populate(json, null))
        .catch(err => populate(null, err))
}

function populateForecast(data) {
    document.getElementById('forecast').style.display = 'initial';
    for(let i = 0; i < data.forecast.forecastday.length; i++) {
        let t = data.forecast.forecastday[i];
        let k = i + 1;
        let d = new Date(t.date);
        document.getElementById(`fc_d${k}_ico`).setAttribute('src', 'https:' + t.day.condition.icon);
        document.getElementById(`fc_d${k}_day`).innerHTML = week[d.getDay()+1]
        document.getElementById(`fc_d${k}_high`).innerHTML = t.day.maxtemp_f + '˚';
        document.getElementById(`fc_d${k}_low`).innerHTML = t.day.mintemp_f + '˚';
        document.getElementById(`fc_d${k}_rain`).innerHTML = t.day.daily_chance_of_rain + '% Precip.';
    }
}

function populate (data, err) {
    if(err != null && err != undefined) {
        document.getElementById('region').innerHTML = "We expierenced an error";
        document.getElementById('country').innerHTML = "try again!";
        document.getElementById('name').innerHTML = "Error!";
        document.getElementById('temp').innerHTML = "??";
        document.getElementById('icon').style.display = 'none';
        document.getElementById('desc').style.display = 'none';
        document.getElementById('forecast').style.display = 'none';
        console.error(err);
    } else if(data) {
        document.getElementById('icon').style.display = 'initial';
        document.getElementById('desc').style.display = 'initial';
        document.getElementById('icon').setAttribute('src', 'https:' + data.current.condition.icon);
        document.getElementById('region').innerHTML = data.location.region;
        document.getElementById('country').innerHTML = data.location.country;
        document.getElementById('name').innerHTML = data.location.name;
        document.getElementById('temp').innerHTML = data.current.temp_f;
        document.getElementById('desc').innerHTML = "(" + data.current.condition.text + ")";
        populateForecast(data);
    }
}

document.getElementById('query').addEventListener('keyup', event => {
    if(event.keyCode === 13 || event.key === 13) {
        get();
    }
});

if(localStorage.getItem('last-lookup')) {
    document.getElementById('query').value = localStorage.getItem('last-lookup');
    get(localStorage.getItem('last-lookup'));
} else {
    localStorage.setItem('last-lookup', 'New York City');
    get('New York City');
}
