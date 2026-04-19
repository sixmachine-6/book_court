import axios from "axios";

const API_URL = "https://book-court.onrender.com/api/v1/users"; // change if needed

// SIGNUP
export async function signup(email) {
  try {
    const res = await axios.post(`${API_URL}/signup`, { email });
    return res.data;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
}

// LOGIN
export async function login(email) {
  try {
    const res = await axios.post(`${API_URL}/login`, { email });
    return res.data;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
}
