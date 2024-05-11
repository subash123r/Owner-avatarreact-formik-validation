import React from "react";
import BookCard from "./BookCard";
import { useNavigate } from "react-router-dom";

function RenderBooks({ booksData, setBooksData }) {
  const navigate = useNavigate();

  return (
    <div className="w-screen bg-gray-100 pt-8 px-4 pb-8">
      <h1 className="text-2xl text-black text-center mb-8 uppercase font-bold">
        library management system
      </h1>
      <div className="w-full flex justify-center">
        <button
          className="uppercase bg-sky-800 px-4 py-1 rounded-lg text-gray-50 font-bold text-lg mb-8"
          onClick={() => navigate("/add/book")}
        >
          <span className="text-2xl">&#x2b;</span> Add Book
        </button>
      </div>
      {booksData.length == 0 && (
        <div className="text-blue-600 w-full mx-auto text-2xl mt-4 text-center">
          Please create a new book or check your Internet!
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-3 max-w-5xl mx-auto gap-4">
        {booksData.map((val, inx) => {
          return (
            <BookCard
              key={inx}
              val={val}
              index={inx}
              setBooksData={setBooksData}
              booksData={booksData}
            />
          );
        })}
      </div>
    </div>
  );
}

export default RenderBooks;