import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [notes, setNotes] = useState([]);
  const [text, setText] = useState("");

  // Fetch notes on load
  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const res = await axios.get("https://mern-notes-app-8n4b.onrender.com/api/notes");
      setNotes(res.data);
    } catch (err) {
      alert("Error fetching notes");
    }
  };

  const addNote = async (e) => {
    e.preventDefault();
    if (!text.trim()) return alert("Please enter some text");

    try {
      const res = await axios.post("https://mern-notes-app-8n4b.onrender.com/api/notes", { text });
      setNotes([res.data, ...notes]);
      setText("");
    } catch (err) {
      alert("Error adding note");
    }
  };

  const deleteNote = async (id) => {
    try {
      await axios.delete(`https://mern-notes-app-8n4b.onrender.com/api/notes/${id}`);
      setNotes(notes.filter((note) => note._id !== id));
    } catch (err) {
      alert("Error deleting note");
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
      <h1>Simple Notes App</h1>
      <form onSubmit={addNote}>
        <input
          type="text"
          value={text}
          placeholder="Write a note..."
          onChange={(e) => setText(e.target.value)}
          style={{ width: "80%", padding: 8 }}
        />
        <button type="submit" style={{ padding: 8, marginLeft: 8 }}>
          Add
        </button>
      </form>

      <ul style={{ listStyle: "none", padding: 0, marginTop: 20 }}>
        {notes.map((note) => (
          <li
            key={note._id}
            style={{
              background: "#eee",
              marginBottom: 10,
              padding: 10,
              borderRadius: 5,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span>{note.text}</span>
            <button onClick={() => deleteNote(note._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
