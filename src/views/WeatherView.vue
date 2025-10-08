<template>
  <div class="container mt-4">
    <h2 class="mb-3">Weather Check</h2>
    <!-- Search Cities -->
    <div class="d-flex gap-2 mb-3">
      <input v-model="city" type="text" class="form-control" placeholder='e.g. "Clayton, AU"' />
      <button class="btn btn-primary" @click="searchByCity">Search</button>
      <button class="btn btn-outline-secondary" @click="fetchCurrentLocationWeather">
        Use My Location
      </button>
    </div>
    <!-- Show weather results -->
    <div v-if="weatherData" class="p-3 border rounded bg-light">
      <h4 class="mb-2">
        {{ weatherData.name }}, {{ weatherData.sys.country }}
        <small class="text-muted" v-if="isFromGeo">• current location</small>
      </h4>
      <div class="d-flex align-items-center gap-3">
        <img :src="iconUrl" alt="Weather Icon" />
        <p class="fs-3 mb-0">{{ temperature }} °C</p>
      </div>
      <p class="text-muted mb-0">{{ weatherData.weather[0].description }}</p>
    </div>

    <div v-else class="text-muted">Enter a city or click “Use My Location”.</div>
  </div>
</template>

<script>
import axios from "axios";

const apikey = "2f4bcbed895d09d42048fb5db9441d93";

export default {
  name: "WeatherView",
  data() {
    return {
      city: "",
      weatherData: null,
      isFromGeo: false, 
    };
  },
  computed: {
    temperature() {
      return this.weatherData ? Math.round(this.weatherData.main.temp) : null;
    },
    iconUrl() {
      return this.weatherData
        ? `https://openweathermap.org/img/w/${this.weatherData.weather[0].icon}.png`
        : null;
    },
  },
  mounted() {
    this.fetchCurrentLocationWeather();
  },
  methods: {
    async searchByCity() {
      if (!this.city) return alert("Please enter a city name!");
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
        this.city
      )}&units=metric&appid=${apikey}`;
      await this.fetchWeatherData(url, false);
    },
    async fetchCurrentLocationWeather() {
      if (!navigator.geolocation) {
        alert("Geolocation is not supported in this browser.");
        return;
      }
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const { latitude, longitude } = pos.coords;
          const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apikey}`;
          await this.fetchWeatherData(url, true);
        },
        async () => {
          const fallback = `https://api.openweathermap.org/data/2.5/weather?q=Clayton,AU&units=metric&appid=${apikey}`;
          await this.fetchWeatherData(fallback, true);
        }
      );
    },
    async fetchWeatherData(url, fromGeo) {
      try {
        const { data } = await axios.get(url);
        this.weatherData = data;
        this.isFromGeo = !!fromGeo;
      } catch (e) {
        console.error(e);
        alert("Unable to get weather. Please try again.");
        this.weatherData = null;
        this.isFromGeo = false;
      }
    },
  },
};
</script>

<style scoped>
.container { max-width: 700px; }
img { width: 80px; height: 80px; }
</style>
