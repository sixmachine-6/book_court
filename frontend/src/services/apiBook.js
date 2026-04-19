import axios from "axios";

const API_URL = "https://book-court.onrender.com/api/v1/courts";

export async function getCourts() {
  try {
    const res = await axios.get(API_URL);
    return res.data.data; // assuming { status, data: [...] }
  } catch (err) {
    const message = err.response.data;
    throw new Error(message);
  }
}

export async function bookCourt({ game, courtNumber, date, slot }) {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.post(
      API_URL,
      {
        game,
        courtNumber,
        date,
        slot,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return res.data;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
}

export async function getBookings({ game, courtId, date }) {
  const res = await axios.get(`${API_URL}/bookings`, {
    params: { game, courtId, date },
  });

  return res.data.data;
}

export async function getMyBookings() {
  const token = localStorage.getItem("token");

  const res = await axios.get(`${API_URL}/myBookings`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data.data;
}
