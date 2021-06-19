<script>
  import { store } from "../store/index";
  import axios from "axios";

  let queryHtml;

  const fetchForecast = ({ lat, lon }) => {
    fetch(`${store.url_base}onecall?lat=${lat}&lon=${lon}&units=metric&lang=es&appid=${store.api_key}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        store.forecast.set(data);
        store.isLoading.set(false);
        store.map_opts.set({ lat, lon, zoom: 6 });
      });
  };

  const fetchWeather = () => {
    store.isLoading.set(true);
    axios.get(`${store.url_base}weather?q=${queryHtml}&units=metric&lang=es&APPID=${store.api_key}`).then((data) => {
      store.weather.set(data.data);
      store.coord.set(data.data.coord);
      changeBackground(data.data);
      fetchForecast({ ...data.data.coord });
    });
  };

  const changeBackground = (weather) => {
    var backgroundStr = "cold-600.jpeg";
    if (weather.main) {
      const weatherId = weather.weather[0].id;
      if (200 <= weatherId && weatherId <= 299) backgroundStr = "thunder-200.jpg";
      else if (300 <= weatherId && weatherId <= 399) backgroundStr = "drizzle-300.jpg";
      else if (400 <= weatherId && weatherId <= 599) backgroundStr = "rain-500.jpg";
      else if (600 <= weatherId && weatherId <= 699) backgroundStr = "cold-600.jpeg";
      else if (700 <= weatherId && weatherId <= 799) backgroundStr = "mist-700.jpg";
      else if (weatherId == 800) backgroundStr = "hot-800.jpeg";
      else if (801 <= weatherId && weatherId <= 899) backgroundStr = "clouds-800.jpg";
    }
    store.backgroundImg.set(`/assets/${backgroundStr}`);
  };
</script>

<div class="maindiv">
  <div class="search-box">
    <form on:submit|preventDefault={fetchWeather}>
      <input type="text" bind:value={queryHtml} class="search-bar" placeholder="Buscar..." />
    </form>
  </div>
</div>

<style>
  .search-box {
    width: 100%;
    margin-bottom: 30px;
  }

  .search-box .search-bar {
    display: block;
    width: 100%;
    padding: 15px;
    color: #313131;
    font-size: 20px;
    appearance: none;
    border: none;
    outline: none;
    background: none;
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.25);
    background-color: rgba(255, 255, 255, 0.15);
    border-radius: 15px 15px 15px 15px;
    transition: 0.4s;
  }

  .search-box .search-bar:focus {
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.5);
    background-color: rgba(255, 255, 255, 0.75);
  }
</style>
