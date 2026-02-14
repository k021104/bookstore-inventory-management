import { useState, useEffect } from "react";

export default function Books() {

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("");

  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [editId, setEditId] = useState(null);

  // Load from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("books")) || [];
    setBooks(saved);
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("books", JSON.stringify(books));
  }, [books]);

  const addBook = () => {
    if (!title || !author || !quantity || !category) return alert("Fill all fields");

    if (editId) {
      setBooks(books.map(b => b.id === editId ? { ...b, title, author, quantity: Number(quantity), category } : b));
      setEditId(null);
    } else {
      setBooks([...books, {
        id: Date.now(),
        title,
        author,
        quantity: Number(quantity),
        category
      }]);

      setTitle("");
      setAuthor("");
      setQuantity("");
      setCategory("");
    };
  };

  const deleteBook = (id) => {
    setBooks(books.filter(book => book.id !== id));
  };

  const editBook = (book) => {
    setTitle(book.title);
    setAuthor(book.author);
    setQuantity(book.quantity);
    setCategory(book.category);
    setEditId(book.id);
  };

  const filteredBooks = books
    .filter(b => b.title.toLowerCase().includes(search.toLocaleLowerCase()))
    .filter(b => filter ? b.category === filter : true);

  const categories = [...new Set(books.map(b => b.category))];

  return (
    <div>

      <h2>Books Management</h2>

      {/* Add Book Form */}
      <input
        placeholder="Book Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        placeholder="Author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />

      <input
        placeholder="Quantity"
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />

      <input
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />

      <button onClick={addBook}>{editId ? "Update Book" : "Add Book"}</button>

      <hr />

      <input placeholder="Search title..." value={search} onChange={e => setSearch(e.target.value)} />

      <select onChange={e => setFilter(e.target.value)}>
        <option value="">All Categories</option>
        {categories.map(c => <option key={c}>{c}</option>)}
      </select>

      <hr />

      {/* Book List */}
      {filteredBooks.map(book => (
        <div key={book.id} style={{ border: "1px solid gray", padding: "10px", margin: "5px" }}>
          <b>{book.title}</b> - {book.author} | Qty: {book.quantity} | {book.category}
          <button onClick={() => editBook(book)} style={{ marginLeft: 10 }}>Edit</button>
          <button onClick={() => deleteBook(book.id)} style={{ marginLeft: 5 }}>Delete</button>
        </div>
      ))}

    </div>
  );
}
