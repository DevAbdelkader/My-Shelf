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

  return bookObj;
}



export function isBooksEmpty() {
  return !localStorage.hasOwnProperty("books");
}



export function initBooksStorage() {
  localStorage.setItem("books", JSON.stringify({}));
  
  return true;
}
