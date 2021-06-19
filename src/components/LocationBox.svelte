<script>
  import { store } from "../store/index";

  let weather;
  var unsub = store.weather.subscribe((value) => (weather = value));
</script>

<div class="maindiv">
  <div class="location-box">
    {#if weather !== undefined}
      <div class="location">{weather.name} , {weather.sys.country}</div>
      <div class="date">{new Date()}</div>
    {/if}
  </div>
</div>

<style>
  .location-box .location {
    color: #fff;
    font-size: 30px;
    font-weight: 500;
    text-align: center;
    margin: 15px 0px;

    text-shadow: 3px 6px rgba(0, 0, 0, 0.25);
  }

  .location-box .date {
    color: #fff;
    font-size: 20px;
    font-weight: 300;
    text-align: center;
    font-style: italic;
  }
</style>
