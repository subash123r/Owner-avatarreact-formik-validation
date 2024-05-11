import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import { booksSchema } from "../Schema/schema";

function AddBookAndEditForm({ booksData, setBooksData }) {
  const { id } = useParams();
  const navigate = useNavigate();

  let initialBookFormState = {
    id: id,
    title: "",
    ISBN: 0,
    author: [],
    publication: "",
  };
  let index;
  let editing = false;
  let { state } = useLocation();
  if (state && state.currentbooksData) {
    editing = true;
    initialBookFormState = state.currentbooksData;
    index = state.index;
  }
  const [bookFormData, setBookFormData] = useState(initialBookFormState);

  const [isDisable, setIsDisable] = useState(false);
  const [alert, setAlert] = useState(false);

  const { values, handleChange, handleSubmit, handleBlur, errors, touched } =
    useFormik({
      initialValues: {
        id,
        title: bookFormData.title,
        ISBN: bookFormData.ISBN,
        publication: bookFormData.publication,
        author: [...bookFormData.author],
      },
      validationSchema: booksSchema,
      onSubmit: (newBookData) => {
        updateBookNotes(newBookData);
        setIsDisable(true);
        navigate("/");
      },
    });

  function updateBookNotes(newBookData) {
    if (editing) {
      newBookData.id = id;
      fetch(`${import.meta.env.VITE_API_URL}/${id}`, {
        method: "PUT",
        body: JSON.stringify(newBookData),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          booksData[index] = data;
          setBooksData([...booksData]);
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      fetch(`${import.meta.env.VITE_API_URL}`, {
        method: "POST",
        body: JSON.stringify(newBookData),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setBooksData([...booksData, data]);
          navigate("/");
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }

  return (
    <div className="w-screen md:h-screen bg-gray-100 grid place-content-center p-4">
      <h1 className="my-6 text-2xl">{editing ? "Edit " : "Add "}Book</h1>
      <form
        className="sm:w-[400px] md:w-[670px] border-2 border-gray-400 p-4 bg-gray-100 shadow-lg rounded-lg"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-first-name"
            >
              Title
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
              id="grid-first-name"
              type="text"
              placeholder="A Brief History of Time"
              value={values.title}
              name="title"
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />
          </div>
        </div>
        {touched.title && errors.title && (
          <p className="text-center text-red-600 mb-3">{errors.title}</p>
        )}
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="ISBN"
            >
              ISBN
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="ISBN"
              type="number"
              placeholder="1234567890123"
              value={values.ISBN}
              name="ISBN"
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />
          </div>
        </div>
        {touched.ISBN && errors.ISBN && (
          <p className="text-center text-red-600 mb-3">{errors.ISBN}</p>
        )}
        <div className="flex flex-wrap -mx-3 mb-2">
          <div className="w-full px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="publication"
            >
              Publication Date
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="publication"
              type="date"
              placeholder="company name"
              value={values.publication}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        {touched.publication && errors.publication && (
          <p className="text-center text-red-600 mb-3">{errors.publication}</p>
        )}

        <button
          type="submit"
          className="uppercase px-4 py-2 w-full bg-sky-700 text-white font-bold mt-4 disabled:bg-sky-300 rounded-lg"
          disabled={isDisable}
        >
          Submit
        </button>
        {alert && (
          <div className="flex justify-center mx-auto text-red-600 text-lg font-bold mt-2">
            Please fill out all the fields
          </div>
        )}
      </form>
    </div>
  );
}

export default AddBookAndEditForm;