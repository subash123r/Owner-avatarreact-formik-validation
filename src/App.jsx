import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import AddBookAndEditForm from "./Components/AddBookAndEditForm";
import AddAuthorAndEditForm from "./Components/AddAuthorAndEditForm";
import RenderBooks from "./Components/RenderBooks";

function App() {
  const [booksData, setBooksData] = useState([]);

  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setBooksData(data);
      });
  }, []);
  return (
    <Routes>
      <Route
        path="*"
        element={
          <h1 className="text-blue-600 w-full mx-auto text-2xl mt-4 text-center">
            404 Page Not Found
          </h1>
        }
      />
      <Route
        exact
        path="/"
        element={
          <RenderBooks booksData={booksData} setBooksData={setBooksData} />
        }
      />
      <Route
        path="/edit/book/:id"
        element={
          <AddBookAndEditForm
            booksData={booksData}
            setBooksData={setBooksData}
          />
        }
      />
      <Route
        path="/add/book"
        element={
          <AddBookAndEditForm
            booksData={booksData}
            setBooksData={setBooksData}
          />
        }
      />
      <Route
        path="/edit/:id/author/:authorId"
        element={
          <AddAuthorAndEditForm
            booksData={booksData}
            setBooksData={setBooksData}
          />
        }
      />
      <Route
        path="/add/:id/author"
        element={
          <AddAuthorAndEditForm
            booksData={booksData}
            setBooksData={setBooksData}
          />
        }
      />
    </Routes>
  );
}

export default App;