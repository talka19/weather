const form = document.querySelector("form");
const renderAdd = document.querySelector(".js-list");

form.addEventListener("submit", getWeather);

function getWeather(e) {
    e.preventDefault();
    const input = e.currentTarget.elements.city.value;
    const select = e.currentTarget.elements.days.value;

    getFetch(input, select).then((value) => {
    //   console.log(value);
      render(value.forecast.forecastday);
    });
}

function getFetch(city, days) {
    return fetch(`https://api.weatherapi.com/v1/forecast.json?key=19dbfba44fb5467f9d6211128231002&q=${city}&days=${days}`)
    .then((res) => {
        if(!res.ok){
            throw new Error(res.statusText);
        }
        return res.json();
    })
    .catch(console.log)
}

function render(array) {
  const markup = array.map(({date, 
    day: {avgtemp_c, 
    condition: {icon},
    },
  }) => {
    return `
    <li>
    <p>${date}</p>
    <p>${avgtemp_c}</p>
    <img src="${icon}"</img>
    </li>`;
  }).join("");
  renderAdd.innerHTML = markup;
}