import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

import { getAccessToken } from "./generateAccessToken";

export const getTransactionStatus = async (
  accessToken: string,
  transactionId: string
) => {
  try {
    const { data } = await axios.get(
      `${process.env.BASE_URL}/collection/v1_0/requesttopay/${transactionId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "X-Target-Environment": process.env.TARGET_ENVIRONMENT,
          "Ocp-Apim-Subscription-Key": process.env.COLLECTIONS_SUBSCRIPTION_KEY,
        },
      }
    );

    console.log("Transaction status retrieved successfully:", data);
    return data;
  } catch (error: any) {
    console.error(
      "Error retrieving transaction status:",
      error.response?.data || error.message
    );
    throw new Error(
      `Failed to retrieve transaction status: ${
        error.response?.data || error.message
      }`
    );
  }
};
