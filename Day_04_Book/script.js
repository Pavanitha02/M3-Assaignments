import { firebaseConfig } from "./index.html";

/* Firebase Imports */
import {
  initializeApp
} from "https://book-management-1fb45-default-rtdb.asia-southeast1.firebasedatabase.app/";

import {
  getFirestore, collection, addDoc, deleteDoc,
  updateDoc, doc, onSnapshot
} from "https://book-management-1fb45-default-rtdb.asia-southeast1.firebasedatabase.app/";

/* Initialize Firebase */
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const bookRef = collection(db, "books");

/* Add Book */
document.getElementById("bookForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  let book = {
    title: document.getElementById("title").value,
    author: document.getElementById("author").value,
    price: document.getElementById("price").value,
    coverImageURL: document.getElementById("imageUrl").value
  };

  await addDoc(bookRef, book);

  e.target.reset();
});

/* Realtime Display */
const bookContainer = document.getElementById("bookContainer");

onSnapshot(bookRef, (snapshot) => {
  bookContainer.innerHTML = "";

  snapshot.forEach((docData) => {
    const data = docData.data();

    let card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <img src="${data.coverImageURL}" alt="Cover Image">
      <h3>${data.title}</h3>
      <p>Author: ${data.author}</p>
      <p>Price: ₹${data.price}</p>

      <button class="update-btn" data-id="${docData.id}">Update Author</button>
      <button class="delete-btn" data-id="${docData.id}">Delete</button>
    `;

    bookContainer.appendChild(card);
  });

  addDeleteListeners();
  addUpdateListeners();
});

/* Delete Book */
function addDeleteListeners() {
  document.querySelectorAll(".delete-btn").forEach(btn => {
    btn.addEventListener("click", async () => {
      await deleteDoc(doc(db, "books", btn.dataset.id));
    });
  });
}

/* Update Author */
function addUpdateListeners() {
  document.querySelectorAll(".update-btn").forEach(btn => {
    btn.addEventListener("click", async () => {
      const newAuthor = prompt("Enter new author name:");

      if (newAuthor) {
        await updateDoc(doc(db, "books", btn.dataset.id), {
          author: newAuthor
        });
      }
    });
  });
}
