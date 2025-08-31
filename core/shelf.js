import { getImageURL } from "./cover.js";

// ------------------------------------------
// Shelf Control : bookElement, clearBooks
// ------------------------------------------

export function bookElement(data) {
  const bookView = document.createElement("div");
  bookView.setAttribute("key", data.key);
  bookView.className = "book-view";

  const cover = document.createElement("img");
  cover.src = data.cover ? getImageURL(data.cover, "image/jpeg") : "nocover.jpg";

  const info = document.createElement("div");
  info.className = "book-info";

  const title = document.createElement("div");
  title.className = "book-title";
  title.innerText = data.title;

  // Remove Book
  const removeBtn = document.createElement("i");
  removeBtn.className = "fa-solid fa-circle-xmark close";

  removeBtn.onclick = () => {
    if (confirm("Do you want to delete this book?")) {
      let books = JSON.parse(localStorage.getItem("books"));
      delete books[data.key];
      localStorage.setItem("books", JSON.stringify(books));
      bookView.remove();
    }
  }

  info.append(removeBtn);
  info.append(title);

  bookView.append(cover);
  bookView.append(info);

  shelf.appendChild(bookView);
}



export function clearBooks() {
  shelf.innerHTML = "";
}
