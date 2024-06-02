import axios from "axios";
import { Alert } from "react-native";

export const fetchBookByName = async (bookName) => {
  try {
    const url = bookName
      ? `https://www.googleapis.com/books/v1/volumes?q=${bookName}`
      : `https://www.googleapis.com/books/v1/volumes?q=.`;
    const response = await axios.get(url);
    const data = await response.data;
    return data;
  } catch (error) {
    console.error("Error fetching books:", error);
    throw error;
  }
};

export const fetchBookById = async (bookId) => {
  try {
    const response = await axios.get(bookId);
    const data = await response.data;
    return data;
  } catch (error) {
    console.error("Error fetching books:", error);
    throw error;
  }
};
