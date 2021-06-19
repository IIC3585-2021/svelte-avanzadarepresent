<script>
  import SearchBox from "./SearchBox.svelte";
  import LocationBox from "./LocationBox.svelte";
  import WeatherBox from "./WeatherBox.svelte";
  import ForecastUnit from "./ForecastUnit.svelte";
  import Loading from "./Loading.svelte";
  import MapBox from "./MapBox.svelte";

  import { store } from "../store/index";

  // Store
  let loading;
  var unsub1 = store.isLoading.subscribe((value) => (loading = value));
  let weather;
  var unsub2 = store.weather.subscribe((value) => (weather = value));
  let backgroundImg;
  var unsub3 = store.backgroundImg.subscribe((value) => (backgroundImg = value));
</script>

<div id="app" class="maindiv" style="--bkgImage: url({backgroundImg});">
  <main>
    <SearchBox />
    {#if loading}
      <Loading />
    {/if}
    {#if !loading && weather !== undefined}
      <div class="weather-wrap">
        <LocationBox />
        <WeatherBox />
      </div>
      <div class="forecast-wrap">
        {#each [...Array(5).keys()] as dayOfWeek}
          <ForecastUnit dayOfWeek={dayOfWeek + 1} />
        {/each}
      </div>
      <div class="map-wrap">
        <MapBox />
      </div>
    {/if}
  </main>
</div>

<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  :global(body) {
    font-family: "montserrat", sans-serif;
    padding: 0;
  }

  #app {
    background-image: var(--bkgImage);
    background-size: cover;
    background-position: bottom;
    transition: 0.4s;
  }

  .forecast-wrap {
    display: flex;
    flex-flow: row;
    justify-content: space-evenly;
  }

  main {
    min-height: 100vh;
    padding: 25px;
    background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.75));
  }
</style>
