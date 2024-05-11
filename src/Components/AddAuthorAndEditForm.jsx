import { useFormik } from "formik";
import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { authorSchema } from "../Schema/schema";

function AddAuthorAndEditForm({ booksData, setBooksData }) {
  const { id, authorId } = useParams();
  const navigate = useNavigate();

  let initialBookFormState = {
    id: authorId,
    bookId: id,
    name: "",
    birthDate: "",
    biography: "",
  };
  let index;
  let editing = false;
  let { state } = useLocation();
  if (state && state.currentbooksData) {
    editing = true;
    initialBookFormState = state.currentbooksData;
    index = state.index;
    editing = state.editing;
  }
  const [bookAuthorData, setBookAuthorData] = useState(initialBookFormState);

  const [isDisable, setIsDisable] = useState(false);
  const [alert, setAlert] = useState(false);

  const { values, handleChange, handleSubmit, handleBlur, errors, touched } =
    useFormik({
      initialValues: {
        id: authorId,
        bookId: id,
        name: bookAuthorData.name,
        birthDate: bookAuthorData.birthDate,
        biography: bookAuthorData.biography,
      },
      validationSchema: authorSchema,
      onSubmit: (newAuthorData) => {
        updateAuthor(newAuthorData);
        setIsDisable(true);
        navigate("/");
      },
    });

  function updateAuthor(newAuthorData) {
    if (editing) {
      newAuthorData.id = id;
      fetch(`${import.meta.env.VITE_API_URL}/${id}/author/${authorId}`, {
        method: "PUT",
        body: JSON.stringify(newAuthorData),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          booksData[index].author[0] = data;
          setBooksData([...booksData]);
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      fetch(`${import.meta.env.VITE_API_URL}/${id}/author`, {
        method: "POST",
        body: JSON.stringify(newAuthorData),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          booksData[index].author[0] = data;
          setBooksData([...booksData]);
          navigate("/");
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }

  return (
    <div className="w-screen md:h-screen bg-gray-100 grid place-content-center p-4">
      <h1 className="my-6 text-2xl">
        {editing ? "Edit " : "Add "}Author Details
      </h1>
      <form
        className="sm:w-[400px] md:w-[670px] border-2 border-gray-400 p-4 bg-gray-100 shadow-lg"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-first-name"
            >
              full name
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
              id="grid-first-name"
              type="text"
              placeholder="Stephen Hawking"
              value={values.name}
              name="name"
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />
          </div>
        </div>
        {touched.name && errors.name && (
          <p className="text-center text-red-600 mb-3">{errors.name}</p>
        )}
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="birthDate"
            >
              birthDate
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="birthDate"
              type="date"
              placeholder="1234567890123"
              value={values.birthDate}
              name="birthDate"
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />
          </div>
        </div>
        {touched.birthDate && errors.birthDate && (
          <p className="text-center text-red-600 mb-3">{errors.birthDate}</p>
        )}
        <div className="flex flex-wrap -mx-3 mb-2">
          <div className="w-full px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="biography"
            >
              biography
            </label>
            <textarea
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="biography"
              type="text"
              rows={5}
              cols="50"
              placeholder="Write a short biography here..."
              value={values.biography}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        {touched.biography && errors.biography && (
          <p className="text-center text-red-600 mb-3">{errors.biography}</p>
        )}

        <button
          type="submit"
          className="uppercase px-4 py-2 w-full bg-sky-700 text-white font-bold mt-4 disabled:bg-sky-300"
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

export default AddAuthorAndEditForm;