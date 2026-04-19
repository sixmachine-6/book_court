import axios from "axios";

const API_URL = "http://localhost:4000/api/v1/users"; // change if needed

// SIGNUP
export async function signup(email) {
  try {
    console.log("Sending email:", email);

    const res = await axios.post(`${API_URL}/signup`, { email });
    return res.data;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
}

// LOGIN
export async function login(email) {
  const res = await axios.post(`${API_URL}/login`, { email });
  return res.data;
}
