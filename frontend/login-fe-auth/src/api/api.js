import axios from "axios";

const URL = `http://localhost:3001/api`;

// aggiungi user
export const addedSingleUser = async (payload) => {
  try {
    const response = await axios.post(`${URL}/user`, {
      name: payload.name,
      surname: payload.surname,
      email: payload.email,
      password: payload.password,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating data:", error);
    throw error; // Lancia l'errore per gestirlo nel thunk
  }
};
