import * as yup from "yup";
export const booksSchema = yup.object({
  title: yup.string().required("Please fill in book title"),
  ISBN: yup
    .number()
    .min(1000000000000, "minimum thirteen numbers are required")
    .required("Please fill in ISBN number"),
  publication: yup.string().required("Please select a date"),
});
export const authorSchema = yup.object({
  name: yup.string().required("Please fill in author name"),
  biography: yup
    .string()
    .min(10, "minimum ten characters are required")
    .required("Please fill in author biography"),
  birthDate: yup.string().required("Please select a date"),
});