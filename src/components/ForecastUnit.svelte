<script>
  import { store } from "../store/index";

  // Props
  export let dayOfWeek;

  // States
  let forecast;
  var unsub = store.forecast.subscribe((value) => (forecast = value));
  const daysOfWeek = store.daysOfWeek;

  // Methods and computed
  const forecastDay = () => {
    return (store.todayIndex + dayOfWeek) % 7;
  };

  const actualTemp = () => {
    return Math.round(forecast.daily[0].temp.day);
  };

  const tempDetail = () => {
    return store.utils.capitalizeFirstLetter(forecast.daily[0].weather[0].description);
  };

  const icon = () => {
    var iconId = forecast.daily[dayOfWeek].weather[0].icon;
    return `/assets/icons/${iconId}.png`;
  };
</script>

<div class="forecast-box">
  {#if forecast !== undefined}
    <div class="temperature">
      <div>{daysOfWeek[forecastDay()]}</div>
      <div class="forecast-icon">
        <!-- svelte-ignore a11y-img-redundant-alt -->
        <img src={icon()} alt="forecast-image" />
      </div>
      <div>{actualTemp()} °C</div>
      <div class="forecast">{tempDetail()}</div>
    </div>
  {/if}
</div>

<style>
  .forecast-icon {
    margin-bottom: 0;
  }

  .forecast-box {
    text-align: center;
  }

  .forecast-box .temperature {
    display: inline-block;
    height: 35vh;
    width: 24vh;
    padding: 25px 25px;
    color: #fff;
    font-size: 35px;
    font-weight: 600;

    text-shadow: 1px 2px rgba(0, 0, 0, 0.25);

    background-color: rgba(255, 255, 255, 0.25);
    border-radius: 15px;

    margin: 30px 0px;

    box-shadow: 3px 6px rgba(0, 0, 0, 0.25);
  }

  .forecast-box .forecast {
    color: white;
    font-size: 30px;
    font-weight: 500;
    font-style: italic;
    text-shadow: 3px 6px rgba(0, 0, 0, 0.25);
  }
</style>
