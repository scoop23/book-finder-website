export default function getBookById(bookData, id) {
  const book = bookData.find(book => bookData.id === id);

  return book;
}
