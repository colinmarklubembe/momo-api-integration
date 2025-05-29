import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

import { getAccessToken } from "./generateAccessToken";

export const checkTransferStatus = async (
  accessToken: string,
  referenceId: string
) => {
  try {
    const { data } = await axios.get(
      `${process.env.BASE_URL}/disbursement/v1_0/transfer/${referenceId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "X-Target-Environment": process.env.TARGET_ENVIRONMENT,
          "Ocp-Apim-Subscription-Key":
            process.env.DISBURSEMENTS_SUBSCRIPTION_KEY,
        },
      }
    );

    console.log("Transfer Status:", data);
    return data;
  } catch (error: any) {
    console.error(
      "Error checking transfer status:",
      error.response?.data || error.message
    );
    throw new Error(
      `Failed to check transfer status: ${
        error.response?.data?.message || error.message
      }`
    );
  }
};
