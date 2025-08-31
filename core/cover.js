export async function fetchCover(isbn) {
  return await fetch(`https://covers.openlibrary.org/b/isbn/${isbn}-M.jpg`).then(res => res.blob());
}



// Base64 Directly from the blob => FileReader
export async function getBase64(blob) {
	const reader = new FileReader();

	reader.readAsDataURL(blob);

	return await new Promise(resolve => {
		reader.onload = resolve;
	}).then(res => res.target.result.replace(/^data:image\/(jpeg|jpg|png);base64,/, ""));
}



// Restructuring data url
export function getImageURL(data, type) {
	return `data:${type};base64,${data}`;
}
