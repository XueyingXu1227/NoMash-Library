<template>
  <div class="container mt-4">
    <h2 class="mb-3">Count Book API (JSON)</h2>

    <!-- Displaying JSON Data -->
    <pre v-if="jsonString">{{ jsonString }}</pre>
    <p v-else class="text-muted">Loading book count...</p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "CountBookAPI",
  data() {
    return {
      jsonData: null,
    };
  },
  computed: {
    jsonString() {
      return this.jsonData ? JSON.stringify(this.jsonData, null, 2) : "";
    },
  },
  async mounted() {
    await this.getBookCountAPI();
  },
  methods: {
    async getBookCountAPI() {
      try {
        const url = "https://us-central1-week7-xueyingxu.cloudfunctions.net/countBooks";
        const response = await axios.get(url);
        this.jsonData = response.data;
      } catch (error) {
        console.error("Error fetching book count:", error);
        this.jsonData = { error: "Unable to load data" };
      }
    },
  },
};
</script>

<style scoped>
pre {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 12px;
  font-size: 0.95rem;
}
</style>
