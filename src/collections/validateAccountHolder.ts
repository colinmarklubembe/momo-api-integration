import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

import { getAccessToken } from "./generateAccessToken";

export const validateAccountHolder = async (
  accessToken: string,
  msisdn: string
): Promise<Boolean> => {
  try {
    const { data } = await axios.get(
      `${process.env.BASE_URL}/collection/v1_0/accountholder/msisdn/${msisdn}/active`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "X-Target-Environment": process.env.TARGET_ENVIRONMENT,
          "Ocp-Apim-Subscription-Key": process.env.COLLECTIONS_SUBSCRIPTION_KEY,
        },
      }
    );

    console.log(`Account Holder:`, data);
    return data.result;
  } catch (error: any) {
    if (error.response?.status === 404) {
      console.log("Account holder is not active.");
      throw new Error("Account holder is not active.");
    } else {
      console.error(
        "Error validating account holder:",
        error.response?.data || error.message
      );
      throw new Error(
        `Failed to validate account holder: ${
          error.response?.data || error.message
        }`
      );
    }
  }
};
