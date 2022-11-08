import axios from "axios";
export const getToken = async () => {
  try {
    const { data } = await axios.get("/api/auth/token", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return data;
  } catch (error) {
    return error;
  }
};

export const storeToken = async (token: any) => {
  try {
    const { data } = await axios.post("/api/auth/session", token, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return data;
  } catch (error) {
    return error;
  }
};
