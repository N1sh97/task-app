import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8000",
});

// Create a reusable Axios instance with the base URL for our backend API.
// This means we don't have to repeat "http://localhost:8000" in every request.
// If the API URL changes in the future, we only need to update it here.
