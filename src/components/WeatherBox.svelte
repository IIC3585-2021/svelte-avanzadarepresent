<script>
  import { store } from "../store/index";

  // Store
  let weather;
  var unsub = store.weather.subscribe((value) => (weather = value));

  // Methods and Computed values
  const icon = () => {
    var iconId = weather.weather[0].icon;
    return `./assets/icons/${iconId}.png`;
  };
</script>

<div class="weather-box">
  <div class="temperature">
    <div class="weather-icon">
      <img src={icon()} alt="forecast-icon" />
    </div>
    {#if weather !== undefined}
      <div>{Math.round(weather.main.temp)} °C</div>
      <div class="weather">
        {store.utils.capitalizeFirstLetter(weather.weather[0].description)}
      </div>
    {/if}
  </div>
</div>

<style>
  .weather-icon {
    margin-bottom: 0;
  }

  .weather-box {
    text-align: center;
  }

  .weather-box .temperature {
    display: inline-block;
    padding: 25px 25px;
    color: #fff;
    font-size: 100px;
    font-weight: 900;

    text-shadow: 3px 6px rgba(0, 0, 0, 0.25);

    background-color: rgba(255, 255, 255, 0.25);
    border-radius: 15px;

    margin: 30px 0px;

    box-shadow: 3px 6px rgba(0, 0, 0, 0.25);
  }

  .weather-box .weather {
    color: white;
    font-size: 50px;
    font-weight: 500;
    font-style: italic;
    text-shadow: 3px 6px rgba(0, 0, 0, 0.25);
  }
</style>
