console.log("i'm here");

$l( () => {
  $l('form.city-search').on('submit', (e) => {
    e.preventDefault();
    searchCity2(e.target.elements[0].value)
      .then((forc => render(forc)), (err => console.log(err)));

  });
});

const key = '552b48a53cc3a323becf6874b845486a';

const searchCity2 = name => {
  return $l.ajax({
    method: 'GET',
    url: `http://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${key}`
  });
};

const render = forc => {
  const list = $l('ul.short-link');
  list.children().remove();

  list.append(cityForcast(forc));
  const addButton = list.find('button');
  addButton.on('click', (e) => {
    addWidget($l(e.currentTarget).parent().parent());
  });
};

const cityForcast = forc => {
  const forecastObj = JSON.parse(forc);
  let forecast = {
    name: forecastObj.name,
    temp: Math.floor(forecastObj.main.temp - 273.15),
    pressure: forecastObj.main.pressure,
    humidity: forecastObj.main.humidity,
    weather: forecastObj.weather[0].main
  };
  return (
    `<li>
    ${forecastWidget(forecast)}
    </li>`
  );
};

const forecastWidget = (data) => {
  return (
    `<div class="weather-el">
      <div class="name">${data.name}</div>
      <div class="invis">
        <div><p>Temperatur</p>e ${data.temp}</div>
        <div>Pressure ${data.pressure}</div>
        <div>Humidity ${data.humidity}%</div>
        <div>Weather ${data.weather}</div>
      </div>
      <button class="add-widget">Add widget</button>
    </div>
    `
  );
};

const addWidget = (li) => {
  const main = $l('ul.main-list');
  main.append(li);
  $l('div.invis').attr('class','vis');
  $l('ul.short-link li').remove();
  $l('button.add-widget').remove();
};
