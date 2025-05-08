import axios from "axios";

const URL = `http://localhost:3001/api`;

// crea user
export const createSingleUser = async (payload) => {
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
    throw error;
  }
};

// confronta alla login mail e password
export const matchLogin = async (payload) => {
  console.log(payload, "sonoPay");

  try {
    const response = await axios.post(
      `${URL}/login`,
      {
        email: payload.email,
        password: payload.password,
      },
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating data:", error);
    throw error;
  }
};

export const getUserProfile = async () => {
  try {
    const response = await axios.get(`${URL}/profile`, {
      withCredentials: true, // usa i cookie!
    });

    return response.data;
  } catch (error) {
    console.error("Errore nel recupero del profilo:", error);
    throw error;
  }
};

export const logoutUser = async () => {
  const response = await axios.post(`${URL}/logout`, {}, { withCredentials: true });
  return response.data;
};
