import { clearBooks, bookElement } from "./shelf.js"

let cacheBooks = {};

export function getAllBooks(parsed = true) {
  const books = localStorage.getItem("books")
  return parsed ? JSON.parse(books) : books;
}



export function storeBook(key, title, cover) {
  const bookObj = {
    [key]: {
      title: title,
      cover: cover,
      key
    }
  }

	localStorage.setItem("books", JSON.stringify(
		Object.assign(getAllBooks(), bookObj)
  ));

  updateIndex();

  return bookObj;
}



export function removeBook(key) {
  let books = getAllBooks();
  delete books[key];
  
  localStorage.setItem("books", JSON.stringify(books));

  updateIndex();

  return books;
}



export function isBooksEmpty() {
  return !localStorage.hasOwnProperty("books");
}



export function initBooksStorage() {
  localStorage.setItem("books", JSON.stringify({}));
  
  return true;
}



export function searchStoredBook(delay) {
  updateIndex();

  let timer;

  return function (e) {
    clearTimeout(timer);
    timer = setTimeout(() => searchHandler(e), delay);
  }
}



function searchHandler(e) {
  const results = [];
  const search = e.target.value.toLowerCase().trim();
  
  cacheBooks.titles.forEach((title, i) => {
    if (title.includes(search)) {
      results.push(cacheBooks.keys[i])
    }
  });

  clearBooks();

  results.forEach(key => bookElement(cacheBooks.books[key]));
}



function updateIndex() {
  const books = getAllBooks();

  const keys = Object.keys(books);
  const titles = Object.values(books).map(book => book.title);

  cacheBooks.books = books;
  cacheBooks.keys = keys;
  cacheBooks.titles = titles.map(v => v.toLowerCase().trim());
}
