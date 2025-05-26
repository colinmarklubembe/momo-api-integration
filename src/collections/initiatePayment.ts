import axios from "axios";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";
dotenv.config();

import { getAccessToken } from "./generateAccessToken";

const requestToPay = async (accessToken: string) => {
  const transactionId = uuidv4();
  try {
    await axios.post(
      `${process.env.BASE_URL}/collection/v1_0/requesttopay`,
      {
        amount: "1000",
        currency: "EUR",
        externalId: "123456",
        payer: {
          partyIdType: "MSISDN",
          partyId: "256759525561",
        },
        payerMessage: "Payment for services",
        payeeNote: "Thank you",
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "X-Reference-Id": transactionId,
          "X-Target-Environment": process.env.TARGET_ENVIRONMENT,
          "Ocp-Apim-Subscription-Key": process.env.COLLECTIONS_SUBSCRIPTION_KEY,
          "Content-Type": "application/json",
        },
      }
    );
    console.log(
      `Payment request initiated with Transaction ID: ${transactionId}`
    );
  } catch (error: any) {
    console.error(
      "Error initiating payment request:",
      error.response?.data || error.message
    );
  }
};

getAccessToken().then((token: string) => {
  if (token) {
    requestToPay(token);
  }
});
