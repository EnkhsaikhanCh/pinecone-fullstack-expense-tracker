import axios from "axios";

export async function Fetcher(path: string) {
  try {
    const response = await axios.get(`http://localhost:3000/${path}`, {
      headers: {
        "access-token": localStorage.getItem("accessToken"),
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch data:", error);
    throw error; // Rethrowing the error allows the calling function to handle it further if needed
  }
}

export async function Mutator(path: string, postData: any) {
  try {
    const response = await axios.post(
      `http://localhost:3000/${path}`,
      postData,
      {
        headers: {
          "access-token": localStorage.getItem("accessToken"),
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error("Failed to post data:", error);
    throw error;
  }
}
