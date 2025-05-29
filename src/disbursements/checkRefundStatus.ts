import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

import { getAccessToken } from "./generateAccessToken";

export const checkRefundStatus = async (
  accessToken: string,
  refundReferenceId: string
) => {
  try {
    const { data } = await axios.get(
      `${process.env.BASE_URL}/disbursement/v1_0/refund/${refundReferenceId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "X-Target-Environment": process.env.TARGET_ENVIRONMENT,
          "Ocp-Apim-Subscription-Key":
            process.env.DISBURSEMENTS_SUBSCRIPTION_KEY,
        },
      }
    );

    console.log("Refund Status:", data);
    return data;
  } catch (error: any) {
    console.error(
      "Error checking refund status:",
      error.response?.data || error.message
    );
    throw new Error(
      `Failed to check refund status: ${
        error.response?.data?.message || error.message
      }`
    );
  }
};
