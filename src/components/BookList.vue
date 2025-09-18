<template>
  <div>
    <h2>Book List (Queries)</h2>
    <div>
      <button @click="loadBooksWhere">Query: ISBN > 1000</button>
      <button @click="loadBooksOrderBy">Order By ISBN</button>
      <button @click="loadBooksLimit">Limit 2</button>
    </div>

    <ul>
      <li v-for="book in books" :key="book.id">
        {{ book.isbn }} - {{ book.name }}
        <button @click="updateBook(book.id)">Update</button>
        <button @click="deleteBook(book.id)">Delete</button>
      </li>
    </ul>
  </div>
  
</template>

<script>
import { ref, onMounted } from 'vue'
import db from '../firebase/init.js'
import { collection, query, where,  getDocs, deleteDoc, updateDoc, doc , orderBy, limit,} from 'firebase/firestore'


export default {
  setup() {
    const books = ref([])
/*
    const loadBooks = async () => {
      const q = query(collection(db, 'books'), where('isbn', '>', 1000))
      const querySnapshot = await getDocs(q)
      books.value = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
    }
*/
    const deleteBook = async (id) => {
        await deleteDoc(doc(db, "books", id))
        loadBooksWhere()
    }

    const updateBook = async (id) => {
        const newName = prompt("Enter new book name:")
        if (newName) {
            await updateDoc(doc(db, "books", id), { name: newName })
            loadBooksWhere()
        }
    }

    const runQuery = async (q) => {
      const querySnapshot = await getDocs(q)
      books.value = querySnapshot.docs.map(docSnap => ({
        id: docSnap.id,
        ...docSnap.data()
      }))
    }

    const loadBooksWhere = async () => {
      const q = query(collection(db, 'books'), where('isbn', '>', 1000))
      await runQuery(q)
    }

    const loadBooksOrderBy = async () => {
      const q = query(collection(db, 'books'), orderBy('isbn'))
      await runQuery(q)
    }

    const loadBooksLimit = async () => {
      const q = query(collection(db, 'books'), limit(2))
      await runQuery(q)
    }

    onMounted(() => {
      loadBooksWhere()
    })

    return { books,  deleteBook, updateBook , loadBooksWhere, loadBooksOrderBy, loadBooksLimit}
  }
}
</script>
