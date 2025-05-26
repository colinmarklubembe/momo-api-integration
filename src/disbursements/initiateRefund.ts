import axios from "axios";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";
dotenv.config();

import { getAccessToken } from "./generateAccessToken";

const initiateRefund = async (
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
    await axios.post(
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
    console.log(`Refund initiated with Reference ID: ${refundReferenceId}`);
  } catch (error: any) {
    console.error(
      "Error initiating refund:",
      error.response?.data || error.message
    );
  }
};

getAccessToken().then((token: string) => {
  if (token) {
    const amount = "1000";
    const currency = "EUR";
    const externalId = "123456";
    const referenceIdToRefund = "885453c4-4e0b-4a90-acde-0fb52714fc58";
    const payerMessage = "Refund for transaction";
    const payeeNote = "Refund processed";
    initiateRefund(
      token,
      amount,
      currency,
      externalId,
      referenceIdToRefund,
      payerMessage,
      payeeNote
    );
  }
});
