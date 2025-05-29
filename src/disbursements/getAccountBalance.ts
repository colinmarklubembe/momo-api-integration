import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

import { getAccessToken } from "./generateAccessToken";

export const getAccountBalance = async (accessToken: string) => {
  try {
    const { data } = await axios.get(
      `${process.env.BASE_URL}/disbursement/v1_0/account/balance`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "X-Target-Environment": process.env.TARGET_ENVIRONMENT,
          "Ocp-Apim-Subscription-Key":
            process.env.DISBURSEMENTS_SUBSCRIPTION_KEY,
        },
      }
    );

    console.log("Account Balance:", data);
    return data;
  } catch (error: any) {
    console.error(
      "Error retrieving account balance:",
      error.response?.data || error.message
    );
    throw new Error(
      `Failed to retrieve account balance: ${
        error.response?.data?.message || error.message
      }`
    );
  }
};
