const customAlert = (msg) => {
	const myAlert = document.createElement("div");
	myAlert.innerText = msg;
	myAlert.className = "alert";

	document.body.prepend(myAlert);

	setTimeout(() => myAlert.remove(), 5000)
}



// Insert Book

const newBook = document.getElementById("new-book-container");

const isbnInput = document.querySelector("input[name=isbn]");
const addISBN = document.getElementById("add-isbn");

const closeBtn = document.getElementById("new-book-close");

const addBook = document.querySelectorAll(".add-btn");

addBook.forEach(addBook => addBook.addEventListener("click", () => {
	newBook.classList.add("active");
}));


isbnInput.addEventListener("input", ({target}) => target.classList.remove("empty"))


closeBtn.addEventListener("click", closeNewBook);



function closeNewBook() {
	newBook.classList.remove("active");
	addISBN.classList.remove("loading");
	isbnInput.value = "";
}




addISBN.addEventListener("click", () => {
	
	if (addISBN.classList.contains("loading")) return;

	if (isbnInput.value.trim() == "") {
		isbnInput.classList.add("empty");
		return;
	} else {
		isbnInput.classList.remove("empty");
	}


	addISBN.classList.add("loading");

	fetch(`https://openlibrary.org/isbn/${isbnInput.value}.json`)
	.then(res => res.json())
	.then(async function (res) {
	
		if (res?.error == "notfound") {
			closeNewBook();
			customAlert("Book not found");
			return;
		}


		await insertBook(res.title, res.authors, res.key);
		
		closeNewBook();

		customAlert("Book has been inserted!");

	});

})

async function insertBook(title, authors, key) {
	
	const currStorage = JSON.parse(localStorage.getItem("books"));
	
	if (!(currStorage instanceof Object)) localStorage.setItem("books", JSON.stringify({}));
	
	// Cover API
	const cover = await fetch("https://covers.openlibrary.org/b/isbn/0451526538-M.jpg").then(res => res.blob());
	


	// ------------------------------
	// -> Get Base64 using FileReader
	// ------------------------------
	const coverBase64 = await getBase64(cover);


	// --------------------------
	// -> Get Base64 using Canvas
	// --------------------------
	// const img = await getImage(cover);
	// const coverBase64 = await getBase64Canvas(img);*/


	// Store data in local stroage
	
	localStorage.setItem("books", JSON.stringify(
		Object.assign(JSON.parse(localStorage.getItem("books")), {
			[key]: {
				title: title,
				authors: authors,
				cover: coverBase64
			}
		}
	)));

}


// Create Image
async function getImage(blob) {
	const image = new Image();
	image.src = URL.createObjectURL(blob);

	return await new Promise(resolve => {
		image.onload = resolve;
	}).then(image => image.target);
}


// Get the data url from the image
function getBase64Canvas(image) {
	const canvas = document.createElement("canvas");
	canvas.width = image.width;
	canvas.height = image.height;

	const ctx = canvas.getContext('2d');
	ctx.drawImage(image, 0, 0);

	const dataURL = canvas.toDataURL("image/jpeg");

	return dataURL.replace(/^data:image\/jpeg;base64,/, "");
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
	if (!localStorage.hasOwnProperty("books")) return "";
	const books = JSON.parse(localStorage.getItem("books"));
	for (book in books) {

		const data = books[book];
		const bookView = document.createElement("div");
		bookView.setAttribute("key", book);
		bookView.className = "book-view";

		const cover = document.createElement("img");
		cover.src = getImageURL(data.cover, "image/jpeg");

		const info = document.createElement("div");
		info.className = "book-info";

		const title = document.createElement("div");
		title.className = "book-title";
		title.innerText = data.title;

		const author = document.createElement("div");
		author.className = "book-author";
		author.innerText = data.authors[0];

		// Remove Book
		const removeBtn = document.createElement("i");
		removeBtn.className = "fa-solid fa-circle-xmark close";

		removeBtn.onclick = () => {
			if (confirm("Do you want to delete this book?")) {
				delete books[book];
				localStorage.setItem("books", JSON.stringify(books));
				bookView.remove();
			}
		}

		
		
		info.append(removeBtn);
		info.append(title);
		info.append(author);


		bookView.append(cover);
		bookView.append(info);

		shelf.appendChild(bookView);
	
	}
}

fetchBooks();