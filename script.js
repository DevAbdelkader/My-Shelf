import { fetchCover, getBase64 } from "./core/cover.js";
import { storeBook, isBooksEmpty, getAllBooks, initBooksStorage } from "./core/storage.js";
import { bookElement, clearBooks } from "./core/shelf.js";
import { getBookData } from "./core/api.js";
import customAlert from "./components/customAlert.js";



// Render All Books from Local Storage
renderBooks();



const newBook = document.getElementById("new-book-container");
const isbnInput = document.querySelector("input[name=isbn]");
const addISBN = document.getElementById("add-isbn");
const closeBtn = document.getElementById("new-book-close");

const newBookBtn = document.getElementById("new-book-btn");
newBookBtn.onclick = openNewBook;

isbnInput.oninput = ({target}) => target.classList.remove("empty")
addISBN.addEventListener("click", () => {
	if (addISBN.classList.contains("loading")) return;
addISBN.classList.add("loading");

  const isbn = isbnInput.value.trim();

  if (isbn == "") {
		isbnInput.classList.add("empty");
    addISBN.classList.remove("loading");
    return;
} else {
    isbnInput.classList.remove("empty");
  }

  searchBook(isbn);
})

closeBtn.onclick = closeNewBook;



function openNewBook() {
  newBook.classList.add("active")
}



function closeNewBook() {
	newBook.classList.remove("active");
	addISBN.classList.remove("loading");
	isbnInput.value = "";
}



function searchBook(isbn = "") {
  const value = isbn.trim();

  getBookData(
    value,
    async (data) => {
      await insertBook(data.title, data.isbn, data.key);
      customAlert("Book has been added");
    },
    () => customAlert("Book not found"),
    closeNewBook
  );
}



async function insertBook(title, isbn, key) {

	const books = getAllBooks();
	if (!(books instanceof Object)) initBooksStorage();

	// Cover API
	const cover = await fetchCover(isbn);

	// ------------------------------
	// -> Get Base64 using FileReader
	// ------------------------------
	const coverBase64 = await getBase64(cover);

	// Store book in local stroage
  storeBook(key, title, cover.type ? coverBase64 : "")

  renderBooks();

}



// Render Books
function renderBooks() {
  clearBooks();
	if (isBooksEmpty()) return "";

	const books = getAllBooks();
  
  for ( let book in books ) {
		const data = books[book];
	  bookElement(data)
  }
}
