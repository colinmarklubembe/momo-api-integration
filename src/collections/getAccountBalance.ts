import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

import { getAccessToken } from "./generateAccessToken";

const getAccountBalance = async (accessToken: string) => {
  try {
    const response = await axios.get(
      `${process.env.BASE_URL}/collection/v1_0/account/balance`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "X-Target-Environment": process.env.TARGET_ENVIRONMENT,
          "Ocp-Apim-Subscription-Key": process.env.COLLECTIONS_SUBSCRIPTION_KEY,
        },
      }
    );
    console.log(
      `Account Balance: ${response.data.availableBalance} ${response.data.currency}`
    );
  } catch (error: any) {
    console.error(
      "Error retrieving account balance:",
      error.response?.data || error.message
    );
  }
};

getAccessToken().then((token: string) => {
  if (token) {
    getAccountBalance(token);
  }
});
