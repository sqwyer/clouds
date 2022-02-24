async function get (val) {
    if(!val) val = document.getElementById('query').value;
    localStorage.setItem('last-lookup', val);
    await fetch(`https://api.weatherapi.com/v1/current.json?key=2379467b9adb453ea0525259222402&q=${val}`)
        .then(res => res.json())
        .then(json => populate(json, null))
        .catch(err => populate(null, err))
}

function populate (data, err) {
    if(err) {
        alert('Error: ' + err);
    } else if(data) {
        document.getElementById('region').innerHTML = data.location.region;
        document.getElementById('country').innerHTML = data.location.country;
        document.getElementById('name').innerHTML = data.location.name;
        document.getElementById('temp').innerHTML = data.current.temp_f;
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