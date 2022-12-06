let weather = {
  fetchWeather: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city + "&units=metric&appid=f1976a88be51f405b3594098551071ac&lang=pt_br"
    )
      .then((response) => {
        if (!response.ok) {
          alert("Nenhum tempo encontrado.");
          throw new Error("Nenhum tempo encontrado.");
        }
        return response.json();
      })
      .then((data) => this.displayWeather(data));
  },
  displayWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    document.querySelector(".cidade").innerText = "Tempo em " + name;
    document.querySelector(".icone").src =
      "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".descricao").innerText = description;
    document.querySelector(".temp").innerText = temp + " °C";
    document.querySelector(".umidade").innerText =
      "Umidade: " + humidity + "%";
    document.querySelector(".vento").innerText =
      "Velocidade do vento: " + speed + " km/h";
  },
  pesquisar: function () {
    this.fetchWeather(document.querySelector(".campo-pesquisa").value);
  },
};

document.querySelector(".pesquisar button").addEventListener("click", function () {
  weather.pesquisar();
});

document
  .querySelector(".campo-pesquisa")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.pesquisar();
    }
  });

weather.fetchWeather("Taquara");