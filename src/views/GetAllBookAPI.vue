<template>
  <div class="container mt-4">
    <h2 class="mb-3">All Books (JSON)</h2>
    <pre v-if="jsonString">{{ jsonString }}</pre>
    <p v-else class="text-muted">Loading all books...</p>
  </div>
</template>

<script>
import { collection, getDocs } from "firebase/firestore";
import db from "@/Firebase/init"; 

export default {
  name: "GetAllBookAPI",
  data() {
    return {
      books: [],
    };
  },
  computed: {
    jsonString() {
      return this.books.length ? JSON.stringify(this.books, null, 2) : "";
    },
  },
  async mounted() {
    try {
      const querySnapshot = await getDocs(collection(db, "books"));
      this.books = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (error) {
      console.error("Error fetching books:", error);
      this.books = [{ error: "Unable to load books" }];
    }
  },
};
</script>

<style scoped>
.container {
  max-width: 700px;
}
pre {
  background: #f8f9fa;
  padding: 15px;
  border-radius: 10px;
}
</style>
