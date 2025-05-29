import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export const getAccessToken = async () => {
  const credentials = Buffer.from(
    `${process.env.COLLECTIONS_API_USER_ID}:${process.env.COLLECTIONS_API_KEY}`
  ).toString("base64");
  try {
    const response = await axios.post(
      `${process.env.BASE_URL}/collection/token/`,
      {},
      {
        headers: {
          Authorization: `Basic ${credentials}`,
          "Ocp-Apim-Subscription-Key": process.env.COLLECTIONS_SUBSCRIPTION_KEY,
        },
      }
    );
    return response.data.access_token;
  } catch (error: any) {
    console.error(
      "Error generating access token:",
      error.response?.data || error.message
    );
    throw new Error(
      `Failed to generate access token: ${
        error.response?.data || error.message
      }`
    );
  }
};
