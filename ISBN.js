export default function getData(res) {
  if (res?.error) return res.error;

  const { full_title, title, isbn_10, isbn_13, key } = res;
  return {
    title: full_title ? full_title : title,
    isbn: isbn_13 ? isbn_13[0] : isbn_10[0],
    key
  }
}
