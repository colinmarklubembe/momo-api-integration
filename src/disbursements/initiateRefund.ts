import axios from "axios";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";
dotenv.config();

import { getAccessToken } from "./generateAccessToken";

export const initiateRefund = async (
  accessToken: string,
  amount: string,
  currency: string,
  externalId: string,
  referenceIdToRefund: string,
  payerMessage: string,
  payeeNote: string
) => {
  const refundReferenceId = uuidv4();
  try {
    const { data } = await axios.post(
      `${process.env.BASE_URL}/disbursement/v1_0/refund`,
      {
        amount,
        currency,
        externalId,
        referenceIdToRefund,
        payerMessage,
        payeeNote,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "X-Reference-Id": refundReferenceId,
          "X-Target-Environment": process.env.TARGET_ENVIRONMENT,
          "Ocp-Apim-Subscription-Key":
            process.env.DISBURSEMENTS_SUBSCRIPTION_KEY,
          "Content-Type": "application/json",
        },
      }
    );
    return data;
  } catch (error: any) {
    console.error(
      "Error initiating refund:",
      error.response?.data || error.message
    );
    throw new Error(
      `Failed to initiate refund: ${
        error.response?.data?.message || error.message
      }`
    );
  }
};
