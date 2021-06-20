import { writable } from "svelte/store";
// import { dotenv } from 'dotenv'
// const dotenv = require('dotenv');

export const store = {
  query: writable(),
  weather: writable(),
  forecast: writable(),
  todayIndex: (new Date()).getDay(),
  daysOfWeek: {
    0: "Domingo",
    1: "Lunes",
    2: "Martes",
    3: "Miércoles",
    4: "Jueves",
    5: "Viernes",
    6: "Sábado"
  },
  isLoading: writable(false),
  backgroundImg: writable('../assets/cold-600.jpeg'),
  api_key: '6b91d1f910dd1bf836e3b78709d4a229',
  url_base: "https://api.openweathermap.org/data/2.5/",
  coord: writable(),
  map_opts: writable(),
  utils: {
    capitalizeFirstLetter(string) {
      return string
        .trim()
        .toLowerCase()
        .replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c.toUpperCase()));
    },
  }
};