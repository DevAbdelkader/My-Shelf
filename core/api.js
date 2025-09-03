import getData from "./ISBN.js";

export async function getBookData(isbn, resolve = () => {}, reject = () => {}, finallyFunc = () => {} ) {
  
  return fetch(`https://openlibrary.org/isbn/${isbn}.json`)
	.then(res => {
      if (res.ok) {
        return res.json()
      } else {
        throw new Error(res)
      }
  })
	.then(res => {
	  const data = getData(res);
		if (data?.error) throw new Error();

  	return data;
	})
  .then(data => resolve(data))
  .catch(msg => reject(msg))
  .finally(finallyFunc)

}
