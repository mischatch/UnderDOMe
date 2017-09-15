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
    url: `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${key}`
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
    pressure: Math.floor(forecastObj.main.pressure),
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
      <div class="name"><h1>${data.name}</h1></div>
      <ul class="invis">
        <li>Temp.<br> ${data.temp}</li>
        <li>Pres.<br> ${data.pressure}</li>
        <li>Hum.<br> ${data.humidity}%</li>
        <li>Weather<br> ${data.weather}</li>
      </ul>
      <button class="add-widget"><img class="add" src="https://s3.us-east-2.amazonaws.com/clone-app-dev/noun_1076054_cc.svg" /></button>
    </div>
    `
  );
};

const addWidget = (li) => {
  const main = $l('ul.main-list');
  main.append(li);
  $l('ul.invis').attr('class','vis');
  $l('ul.short-link li').remove();
  $l('button.add-widget').remove();
  $l('div.name').attr('class','name-vis');
  $l('div.weather-el').attr('class','div.weather-el-vis');
};
