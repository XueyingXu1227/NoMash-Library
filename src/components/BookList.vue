<template>
  <div>
    <h2>Book List (ISBN > 1000)</h2>
    <ul>
      <li v-for="book in books" :key="book.id">
        {{ book.isbn }} - {{ book.name }}
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import db from '../firebase/init.js'
import { collection, query, where, getDocs } from 'firebase/firestore'

export default {
  setup() {
    const books = ref([])

    const loadBooks = async () => {
      const q = query(collection(db, 'books'), where('isbn', '>', 1000))
      const querySnapshot = await getDocs(q)
      books.value = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
    }

    onMounted(() => {
      loadBooks()
    })

    return { books }
  }
}
</script>
