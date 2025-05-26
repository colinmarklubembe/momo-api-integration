import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

import { getAccessToken } from "./generateAccessToken";

const checkRefundStatus = async (
  accessToken: string,
  refundReferenceId: string
) => {
  try {
    const response = await axios.get(
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
    console.log("Refund Status:", response.data);
  } catch (error: any) {
    console.error(
      "Error checking refund status:",
      error.response?.data || error.message
    );
  }
};

getAccessToken().then((token: string) => {
  if (token) {
    const refundReferenceId = "5607489f-094f-45bf-8747-15eec8c75b69";
    checkRefundStatus(token, refundReferenceId);
  }
});
