import axios from "axios";

export async function Fetcher(path) {
  const response = await axios.get(`http://localhost:3000/${path}`, {
    headers: {
      "access-token": localStorage.getItem("accessToken") || "",
    },
  });

  return response.data;
}

export async function Mutator(path, postData) {
  const response = await axios.post(`http://localhost:3000/${path}`, postData, {
    headers: {
      "access-token": localStorage.getItem("accessToken") || "",
    },
  });

  return response.data;
}
