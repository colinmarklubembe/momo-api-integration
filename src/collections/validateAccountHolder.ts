import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

import { getAccessToken } from "./generateAccessToken";

const validateAccountHolder = async (accessToken: string, msisdn: string) => {
  try {
    const response = await axios.get(
      `${process.env.BASE_URL}/collection/v1_0/accountholder/msisdn/${msisdn}/active`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "X-Target-Environment": process.env.TARGET_ENVIRONMENT,
          "Ocp-Apim-Subscription-Key": process.env.COLLECTIONS_SUBSCRIPTION_KEY,
        },
      }
    );
    console.log(`Account Holder Active: ${response.data.result}`);
  } catch (error: any) {
    if (error.response?.status === 404) {
      console.log("Account holder is not active.");
    } else {
      console.error(
        "Error validating account holder:",
        error.response?.data || error.message
      );
    }
  }
};

getAccessToken().then((token: string) => {
  if (token) {
    validateAccountHolder(token, "256759525561");
  }
});
