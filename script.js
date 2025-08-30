import getData from "./ISBN.js";

fetchBooks();

const newBook = document.getElementById("new-book-container");
// const isbnInput = document.querySelector("input[name=isbn]");
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



const customAlert = (msg) => {
	const myAlert = document.createElement("div");
	myAlert.innerText = msg;
	myAlert.className = "alert";

	document.body.prepend(myAlert);

	setTimeout(() => myAlert.remove(), 5000)
}



// ------------------------------------------
// Shelf Control : newBookElement, clearBooks
// ------------------------------------------

function newBookElement(data) {
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



function clearBooks() {
  shelf.innerHTML = "";
}

// ---
// End
// ---



// ---------------------------
// New Book Container Controls
// ---------------------------

function openNewBook() {
  newBook.classList.add("active")
}



function closeNewBook() {
	newBook.classList.remove("active");
	addISBN.classList.remove("loading");
	isbnInput.value = "";
}

// ---
// End
// ---



function searchBook(isbn = "") {
  const value = isbn.trim();

  fetch(`https://openlibrary.org/isbn/${value}.json`)
	.then(res => {
      if (res.ok) {
        return res.json()
      } else {
        throw new Error(res)
      }
  })
	.then(async function (res) {
    const data = getData(res);
	
		if (data?.error) throw new Error();

		await insertBook(data.title, data.isbn, data.key);

		closeNewBook();
		customAlert("Book has been inserted!");
	}).catch(() => {
    closeNewBook();
    customAlert("Book not found");
  });

}



async function insertBook(title, isbn, key) {

	const currStorage = JSON.parse(localStorage.getItem("books"));
	if (!(currStorage instanceof Object)) localStorage.setItem("books", JSON.stringify({}));

	// Cover API
	const cover = await fetch(`https://covers.openlibrary.org/b/isbn/${isbn}-M.jpg`).then(res => res.blob());

	// ------------------------------
	// -> Get Base64 using FileReader
	// ------------------------------
	const coverBase64 = await getBase64(cover);

	// Store book in local stroage
	localStorage.setItem("books", JSON.stringify(
		Object.assign(JSON.parse(localStorage.getItem("books")), {
			[key]: {
				title: title,
				cover: cover.type ? coverBase64 : "",
        key
			}
		}
	)));

  fetchBooks();

}



// Base64 Directly from the blob => FileReader
async function getBase64(blob) {
	const reader = new FileReader();

	reader.readAsDataURL(blob);

	return await new Promise(resolve => {
		reader.onload = resolve;
	}).then(res => res.target.result.replace(/^data:image\/(jpeg|jpg|png);base64,/, ""));
}



// Restructuring data url
function getImageURL(data, type) {
	return `data:${type};base64,${data}`;
}



// Fetching Books
function fetchBooks() {
  clearBooks();
	if (!localStorage.hasOwnProperty("books")) return "";
	const books = JSON.parse(localStorage.getItem("books"));
  
  for ( let book in books ) {
		const data = books[book];
	  newBookElement(data)
  }
}
