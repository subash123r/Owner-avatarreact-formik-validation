import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ShowAuthorDetailsModal from "./ShowAuthorDetailsModal";
import { formatDate } from "../utils/formatDate";
import { date } from "yup";

function BookCard({ val, index, setBooksData, booksData }) {
  const navigate = useNavigate();

  const [isDisable, setIsDisable] = useState(false);
  const [showModal, setShowModal] = useState(false);

  function deleteBook(id) {
    setIsDisable(true);
    fetch(`${import.meta.env.VITE_API_URL}/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        const filter = booksData.filter((item) => item.id != data.id);
        setBooksData([...filter]);
        navigate("/");
      });
  }
  return (
    <div className="bg-white overflow-hidden rounded-lg border shadow-lg mx-4 sm:mx-0">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          {val.title}
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">ISBN: {val.ISBN}</p>
      </div>
      <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
        <dl className="sm:divide-y sm:divide-gray-200">
          <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Author</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {(val.author.length == 0 || val.author[0]?.id == "") && (
                <Link
                  to={`/add/${val.id}/author`}
                  state={{
                    currentbooksData: val,
                    index: index,
                    editing: false,
                  }}
                >
                  <button className="font-bold items-center flex gap-1 text-gray-900 focus:ring-gray-200 hover:bg-gray-100 bg-white border-gray-300 border text-xs focus:outline-none focus:ring-4 rounded-lg py-2 px-2 uppercase disabled:bg-gray-100">
                    <svg
                      width="24px"
                      height="24px"
                      viewBox="0 0 48 48"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="#000000"
                      stroke="#ffffff"
                    >
                      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        {" "}
                        <title>add-circle-solid</title>{" "}
                        <g id="Layer_2" data-name="Layer 2">
                          {" "}
                          <g id="invisible_box" data-name="invisible box">
                            {" "}
                            <rect
                              width="48"
                              height="48"
                              fill="none"
                            ></rect>{" "}
                            <rect width="48" height="48" fill="none"></rect>{" "}
                            <rect width="48" height="48" fill="none"></rect>{" "}
                          </g>{" "}
                          <g id="icons_Q2" data-name="icons Q2">
                            {" "}
                            <path d="M24,2A22,22,0,1,0,46,24,21.9,21.9,0,0,0,24,2ZM34,26H26v8a2,2,0,0,1-4,0V26H14a2,2,0,0,1,0-4h8V14a2,2,0,0,1,4,0v8h8a2,2,0,0,1,0,4Z"></path>{" "}
                          </g>{" "}
                        </g>{" "}
                      </g>
                    </svg>
                    Add details
                  </button>
                </Link>
              )}
              {val.author.length != 0 && val.author[0]?.id != "" && (
                <button
                  className="font-bold items-center flex gap-1 text-gray-900 focus:ring-gray-200 hover:bg-gray-100 bg-white border-gray-300 border text-xs focus:outline-none focus:ring-4 rounded-lg py-2 px-2 uppercase disabled:bg-gray-100"
                  onClick={() => setShowModal(true)}
                >
                  <svg
                    width="24px"
                    height="24px"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9ZM11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12C13 12.5523 12.5523 13 12 13C11.4477 13 11 12.5523 11 12Z"
                        fill="#000000"
                      ></path>{" "}
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M21.83 11.2807C19.542 7.15186 15.8122 5 12 5C8.18777 5 4.45796 7.15186 2.17003 11.2807C1.94637 11.6844 1.94361 12.1821 2.16029 12.5876C4.41183 16.8013 8.1628 19 12 19C15.8372 19 19.5882 16.8013 21.8397 12.5876C22.0564 12.1821 22.0536 11.6844 21.83 11.2807ZM12 17C9.06097 17 6.04052 15.3724 4.09173 11.9487C6.06862 8.59614 9.07319 7 12 7C14.9268 7 17.9314 8.59614 19.9083 11.9487C17.9595 15.3724 14.939 17 12 17Z"
                        fill="#000000"
                      ></path>{" "}
                    </g>
                  </svg>
                  View details
                </button>
              )}
              {showModal && (
                <ShowAuthorDetailsModal
                  authorData={val.author}
                  key={val.id}
                  bookIndex={index}
                  setBooksData={setBooksData}
                  booksData={booksData}
                  index={index}
                  onClose={() => setShowModal(false)}
                />
              )}
            </dd>
          </div>
          <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Publication</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 break-words">
              {formatDate(val.publication)}
            </dd>
          </div>
        </dl>
        <div className="flex place-content-center items-center gap-4 my-4">
          <Link
            className="items-center flex gap-1 text-gray-900 focus:ring-gray-200 hover:bg-gray-100 bg-white border-gray-300 border text-xs focus:outline-none focus:ring-4 rounded-lg py-2 px-2 uppercase"
            to={`edit/book/${val.id}`}
            state={{ currentbooksData: val, index: index }}
          >
            <svg
              width="18px"
              height="18px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="m3.99 16.854-1.314 3.504a.75.75 0 0 0 .966.965l3.503-1.314a3 3 0 0 0 1.068-.687L18.36 9.175s-.354-1.061-1.414-2.122c-1.06-1.06-2.122-1.414-2.122-1.414L4.677 15.786a3 3 0 0 0-.687 1.068zm12.249-12.63 1.383-1.383c.248-.248.579-.406.925-.348.487.08 1.232.322 1.934 1.025.703.703.945 1.447 1.025 1.934.058.346-.1.677-.348.925L19.774 7.76s-.353-1.06-1.414-2.12c-1.06-1.062-2.121-1.415-2.121-1.415z"
                  fill="#000000"
                ></path>
              </g>
            </svg>
            <span className="font-bold">edit</span>
          </Link>

          <button
            type="button"
            className="font-bold items-center flex gap-1 text-gray-900 focus:ring-gray-200 hover:bg-gray-100 bg-white border-gray-300 border text-xs focus:outline-none focus:ring-4 rounded-lg py-2 px-2 uppercase disabled:bg-gray-100"
            onClick={() => deleteBook(val.id)}
            disabled={isDisable}
          >
            <svg
              width="20px"
              height="20px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M10.3094 2.25002H13.6908C13.9072 2.24988 14.0957 2.24976 14.2737 2.27819C14.977 2.39049 15.5856 2.82915 15.9146 3.46084C15.9978 3.62073 16.0573 3.79961 16.1256 4.00494L16.2373 4.33984C16.2562 4.39653 16.2616 4.41258 16.2661 4.42522C16.4413 4.90933 16.8953 5.23659 17.4099 5.24964C17.4235 5.24998 17.44 5.25004 17.5001 5.25004H20.5001C20.9143 5.25004 21.2501 5.58582 21.2501 6.00004C21.2501 6.41425 20.9143 6.75004 20.5001 6.75004H3.5C3.08579 6.75004 2.75 6.41425 2.75 6.00004C2.75 5.58582 3.08579 5.25004 3.5 5.25004H6.50008C6.56013 5.25004 6.5767 5.24998 6.59023 5.24964C7.10488 5.23659 7.55891 4.90936 7.73402 4.42524C7.73863 4.41251 7.74392 4.39681 7.76291 4.33984L7.87452 4.00496C7.94281 3.79964 8.00233 3.62073 8.08559 3.46084C8.41453 2.82915 9.02313 2.39049 9.72643 2.27819C9.90445 2.24976 10.093 2.24988 10.3094 2.25002ZM9.00815 5.25004C9.05966 5.14902 9.10531 5.04404 9.14458 4.93548C9.1565 4.90251 9.1682 4.86742 9.18322 4.82234L9.28302 4.52292C9.37419 4.24941 9.39519 4.19363 9.41601 4.15364C9.52566 3.94307 9.72853 3.79686 9.96296 3.75942C10.0075 3.75231 10.067 3.75004 10.3553 3.75004H13.6448C13.9331 3.75004 13.9927 3.75231 14.0372 3.75942C14.2716 3.79686 14.4745 3.94307 14.5842 4.15364C14.605 4.19363 14.626 4.2494 14.7171 4.52292L14.8169 4.82216L14.8556 4.9355C14.8949 5.04405 14.9405 5.14902 14.992 5.25004H9.00815Z"
                  fill="#000"
                ></path>{" "}
                <path
                  d="M5.91509 8.45015C5.88754 8.03685 5.53016 7.72415 5.11686 7.7517C4.70357 7.77925 4.39086 8.13663 4.41841 8.54993L4.88186 15.5017C4.96736 16.7844 5.03642 17.8205 5.19839 18.6336C5.36679 19.4789 5.65321 20.185 6.2448 20.7385C6.8364 21.2919 7.55995 21.5308 8.4146 21.6425C9.23662 21.7501 10.275 21.7501 11.5606 21.75H12.4395C13.7251 21.7501 14.7635 21.7501 15.5856 21.6425C16.4402 21.5308 17.1638 21.2919 17.7554 20.7385C18.347 20.185 18.6334 19.4789 18.8018 18.6336C18.9638 17.8206 19.0328 16.7844 19.1183 15.5017L19.5818 8.54993C19.6093 8.13663 19.2966 7.77925 18.8833 7.7517C18.47 7.72415 18.1126 8.03685 18.0851 8.45015L17.6251 15.3493C17.5353 16.6971 17.4713 17.6349 17.3307 18.3406C17.1943 19.025 17.004 19.3873 16.7306 19.6431C16.4572 19.8989 16.083 20.0647 15.391 20.1552C14.6776 20.2485 13.7376 20.25 12.3868 20.25H11.6134C10.2626 20.25 9.32255 20.2485 8.60915 20.1552C7.91715 20.0647 7.54299 19.8989 7.26958 19.6431C6.99617 19.3873 6.80583 19.025 6.66948 18.3406C6.52892 17.6349 6.46489 16.6971 6.37503 15.3493L5.91509 8.45015Z"
                  fill="#000"
                ></path>{" "}
                <path
                  d="M9.42546 10.2538C9.83762 10.2125 10.2052 10.5133 10.2464 10.9254L10.7464 15.9254C10.7876 16.3376 10.4869 16.7051 10.0747 16.7463C9.66256 16.7875 9.29503 16.4868 9.25381 16.0747L8.75381 11.0747C8.7126 10.6625 9.01331 10.295 9.42546 10.2538Z"
                  fill="#000"
                ></path>{" "}
                <path
                  d="M14.5747 10.2538C14.9869 10.295 15.2876 10.6625 15.2464 11.0747L14.7464 16.0747C14.7052 16.4868 14.3376 16.7875 13.9255 16.7463C13.5133 16.7051 13.2126 16.3376 13.2538 15.9254L13.7538 10.9254C13.795 10.5133 14.1626 10.2125 14.5747 10.2538Z"
                  fill="#000"
                ></path>{" "}
              </g>
            </svg>
            <span>delete</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookCard;