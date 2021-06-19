<script>
  import Map from "ol/Map";
  import View from "ol/View";
  import TileLayer from "ol/layer/Tile";
  import XYZ from "ol/source/XYZ";
  import OSM from "ol/source/OSM";
  import { fromLonLat } from "ol/proj";
  import { store } from "../store/index";
  import { onDestroy, onMount } from "svelte";

  let mapOpts = null;

  const mapOptsUnsubscribe = store.map_opts.subscribe((value) => {
    console.log(value);
    mapOpts = value;
  });

  onDestroy(mapOptsUnsubscribe);

  const renderMap = () => {
    let map = new Map({
      target: "map-box",
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: fromLonLat([mapOpts.lon, mapOpts.lat]),
        zoom: 7,
      }),
    });

    var tempLayer = new TileLayer({
      source: new XYZ({
        url: `https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${store.api_key}`,
      }),
    });

    var precipitationLayer = new TileLayer({
      source: new XYZ({
        url: `https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${store.api_key}`,
      }),
    });
    map.addLayer(precipitationLayer);
    map.addLayer(tempLayer);
  };

  onMount(renderMap);
</script>

<div class="maindiv">
  <div class="map" id="map-box" />
</div>

<style>
  .map {
    height: 600px;
    width: 80%;
    margin-left: auto;
    margin-right: auto;
    margin-top: auto;
  }
</style>
