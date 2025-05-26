import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

import { getAccessToken } from "./generateAccessToken";

const getTransactionStatus = async (
  accessToken: string,
  transactionId: string
) => {
  try {
    const response = await axios.get(
      `${process.env.BASE_URL}/collection/v1_0/requesttopay/${transactionId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "X-Target-Environment": process.env.TARGET_ENVIRONMENT,
          "Ocp-Apim-Subscription-Key": process.env.COLLECTIONS_SUBSCRIPTION_KEY,
        },
      }
    );
    console.log(`Transaction Status: ${response.data.status}`);
  } catch (error: any) {
    console.error(
      "Error retrieving transaction status:",
      error.response?.data || error.message
    );
  }
};

getAccessToken().then((token) => {
  if (token) {
    getTransactionStatus(token, "c61aea94-53f5-4081-8aab-cd761f0aa416");
  }
});
